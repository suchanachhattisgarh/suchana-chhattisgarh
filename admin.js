/* ============================================================
   SUCHANA CHHATTISGARH — admin.js
   Administrative JavaScript Panel (Firebase Database connected)
   ============================================================ */

'use strict';

// 1. Firebase Configuration & Initialization
const firebaseConfig = {
  databaseURL: "https://suchana-chhattisgarh-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  // Enable debug logging for Firebase database connections
  firebase.database.enableLogging(true);
} else {
  console.error("Firebase SDK not loaded.");
  alert("डेटाबेस कनेक्शन एरर: Firebase SDK लोड नहीं हुआ। कृपया इंटरनेट चेक करें या एड-ब्लॉकर बंद करें।");
}
const db = typeof firebase !== 'undefined' ? firebase.database() : null;

// UI Connection status update
function updateConnectionStatusUI(status) {
  const badge = el('db-status-badge');
  if (!badge) return;
  const dot = badge.querySelector('.dot');
  const text = badge.querySelector('.status-text');
  if (!dot || !text) return;

  if (status === 'online') {
    dot.className = 'dot dot-online';
    text.textContent = 'डेटाबेस: सक्रिय';
    badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
  } else if (status === 'offline') {
    dot.className = 'dot dot-offline';
    text.textContent = 'डेटाबेस: ऑफलाइन';
    badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
  } else {
    dot.className = 'dot dot-connecting';
    text.textContent = 'डेटाबेस: कनेक्ट हो रहा है...';
    badge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
  }
}

// 2. State Management
const State = {
  adminLoggedIn: localStorage.getItem('suchana_admin_logged_in') === 'true',
  dbConnected: false,
  news: [],
  reports: [],
  poll: {}
};

// Start connection monitoring immediately
if (db) {
  db.ref(".info/connected").on("value", (snap) => {
    if (snap.val() === true) {
      State.dbConnected = true;
      updateConnectionStatusUI('online');
    } else {
      State.dbConnected = false;
      updateConnectionStatusUI('offline');
    }
  });
}

const IMGBB_API_KEY = '5368bd0e8283baec2685b3029510756e';

// Category Labels mapping
const CAT_LABELS = {
  Chhattisgarh: "छत्तीसगढ़",
  JanjgirChampa: "जांजगीर-चांपा",
  Politics: "राजनीति",
  Crime: "अपराध",
  Business: "व्यापार",
  Sports: "खेल-कूद",
  Entertainment: "मनोरंजन",
  National: "देश-विदेश"
};

function defaultImg(cat) {
  const imgs = {
    Chhattisgarh: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop",
    Politics: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&auto=format&fit=crop",
    Crime: "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=600&auto=format&fit=crop",
    Business: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop",
    Sports: "https://images.unsplash.com/photo-1540747913346-19212a4b423f?w=600&auto=format&fit=crop",
    Entertainment: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop",
    National: "https://images.unsplash.com/photo-1518544866330-95a2ab4a1b5e?w=600&auto=format&fit=crop"
  };
  return imgs[cat] || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop";
}

// 3. UI Helpers
function el(id) { return document.getElementById(id); }

function showToast(msg, type = 'success') {
  const wrap = el('toast-wrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(30px)';
    t.style.transition = '0.3s ease';
    setTimeout(() => t.remove(), 350);
  }, 4000);
}

function generateId() { return Date.now() + Math.floor(Math.random() * 1000); }

// Toggle login and dashboard displays
function updatePanelVisibility() {
  const loginPanel = el('admin-login-panel');
  const dashPanel = el('admin-dash-panel');
  
  if (State.adminLoggedIn) {
    if (loginPanel) loginPanel.style.display = 'none';
    if (dashPanel) dashPanel.style.display = 'block';
    setupDatabaseSync();
  } else {
    if (loginPanel) loginPanel.style.display = 'block';
    if (dashPanel) dashPanel.style.display = 'none';
  }
}

// 4. Setup Authentication Events
function setupAuth() {
  const loginBtn = el('admin-login-btn');
  const logoutBtn = el('admin-logout-btn');
  const passInput = el('admin-pass-input');
  const togglePassBtn = el('toggle-password-btn');

  if (loginBtn) {
    loginBtn.onclick = () => {
      const pass = passInput?.value;
      if (pass === 'admin123') {
        State.adminLoggedIn = true;
        localStorage.setItem('suchana_admin_logged_in', 'true');
        updatePanelVisibility();
        showToast('एडमिन लॉगिन सफल! आपका स्वागत है।');
      } else {
        showToast('गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।', 'error');
      }
    };
  }

  if (passInput) {
    passInput.onkeydown = (e) => {
      if (e.key === 'Enter') loginBtn?.click();
    };
  }

  if (togglePassBtn && passInput) {
    togglePassBtn.onclick = () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      State.adminLoggedIn = false;
      localStorage.setItem('suchana_admin_logged_in', 'false');
      updatePanelVisibility();
      if (passInput) passInput.value = '';
      showToast('लॉगआउट सफल। सुरक्षा के लिए ब्राउज़र बंद करें।');
    };
  }
}

// 5. Setup Tab Switching Events
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetContent = el('tab-' + tab.dataset.tab);
      if (targetContent) targetContent.classList.add('active');
      
      // Refresh Lists when entering their respective tab
      if (tab.dataset.tab === 'manage-news') renderNewsList();
      if (tab.dataset.tab === 'citizen-reports') renderReportsList();
    };
  });
}

// 6. Firebase Realtime Sync (Data Load)
let dbListenersSetUp = false;
function setupDatabaseSync() {
  if (!db || dbListenersSetUp) return;
  dbListenersSetUp = true;

  // News listener
  db.ref('news').on('value', (snapshot) => {
    const data = snapshot.val();
    let newsArray = [];
    if (data) {
      if (Array.isArray(data)) {
        newsArray = data.filter(item => item !== null);
      } else if (typeof data === 'object') {
        newsArray = Object.values(data);
      }
      newsArray.sort((a, b) => b.id - a.id);
    }
    State.news = newsArray;
    renderNewsList();
  }, (error) => {
    console.error("Firebase News read failed:", error);
    showToast("डेटाबेस एरर: समाचार लोड नहीं हो सके।", "error");
  });

  // Poll listener (for seeding values inside forms)
  db.ref('poll').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      State.poll = data;
      // Populate inputs
      if (el('apf-question')) el('apf-question').value = data.question;
      if (data.options) {
        if (el('apf-opt1')) el('apf-opt1').value = data.options[0] || '';
        if (el('apf-opt2')) el('apf-opt2').value = data.options[1] || '';
        if (el('apf-opt3')) el('apf-opt3').value = data.options[2] || '';
        if (el('apf-opt4')) el('apf-opt4').value = data.options[3] || '';
      }
    }
  });

  // Citizen Reports Listener [NEW]
  db.ref('reports').on('value', (snapshot) => {
    const data = snapshot.val();
    let reportsArray = [];
    if (data) {
      reportsArray = Object.keys(data).map(key => ({
        key: key,
        ...data[key]
      }));
      // Sort reports by date (Newest first)
      reportsArray.reverse();
    }
    State.reports = reportsArray;
    
    // Update badge count
    const badge = el('report-badge');
    if (badge) {
      badge.textContent = reportsArray.length;
      badge.style.display = reportsArray.length > 0 ? 'inline-block' : 'none';
    }
    
    renderReportsList();
  }, (error) => {
    console.error("Firebase Reports read failed:", error);
  });
}

// 7. News Adding Form (with Image uploads)
let uploadedImgUrl = null;

function setupImageUpload() {
  const fileInput = el('anf-imgfile');
  const imgUrlInput = el('anf-imgurl');
  const previewWrap = el('img-preview-wrap');
  const previewImg = el('img-preview');
  const removeBtn = el('img-remove-btn');
  const uploadLabel = el('img-upload-label');

  if (fileInput) {
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showToast('फाइल 5MB से छोटी होनी चाहिए!', 'error');
        fileInput.value = '';
        return;
      }

      if (uploadLabel) {
        uploadLabel.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> अपलोड हो रही है...';
        uploadLabel.style.pointerEvents = 'none';
      }

      try {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result.split(',')[1]);
          reader.readAsDataURL(file);
        });

        // Show immediate preview (optional local display)
        if (previewImg) previewImg.src = 'data:image/jpeg;base64,' + base64;
        if (previewWrap) previewWrap.style.display = 'block';

        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64);

        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          uploadedImgUrl = result.data.url;
          if (previewImg) previewImg.src = uploadedImgUrl;
          if (imgUrlInput) { imgUrlInput.value = uploadedImgUrl; imgUrlInput.disabled = true; }
          if (uploadLabel) uploadLabel.style.display = 'none';
          showToast('इमेज ImgBB सर्वर पर अपलोड हो गई! ✅');
        } else {
          throw new Error('Upload failed');
        }
      } catch (err) {
        console.error("Upload error:", err);
        showToast('इमेज अपलोड नहीं हुई! कृपया मैन्युअल लिंक पेस्ट करें।', 'error');
        if (uploadLabel) {
          uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> <span>चित्र अपलोड करें (JPG, PNG, WEBP — Max 5MB)</span>';
          uploadLabel.style.pointerEvents = 'auto';
        }
        if (previewWrap) previewWrap.style.display = 'none';
        if (imgUrlInput) imgUrlInput.disabled = false;
        uploadedImgUrl = null;
      }
    };
  }

  if (removeBtn) {
    removeBtn.onclick = () => {
      uploadedImgUrl = null;
      if (fileInput) fileInput.value = '';
      if (previewWrap) previewWrap.style.display = 'none';
      if (uploadLabel) {
        uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> <span>चित्र अपलोड करें (JPG, PNG, WEBP — Max 5MB)</span>';
        uploadLabel.style.display = 'flex';
        uploadLabel.style.pointerEvents = 'auto';
      }
      if (imgUrlInput) { imgUrlInput.value = ''; imgUrlInput.disabled = false; }
    };
  }
}

function setupNewsForm() {
  const form = el('admin-add-news-form');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!db) { showToast("डेटाबेस कनेक्शन सक्रिय नहीं है!", "error"); return; }
    if (!State.dbConnected) {
      showToast("डेटाबेस ऑफ़लाइन है! कृपया इंटरनेट कनेक्शन चेक करें और डेटाबेस सक्रिय होने की प्रतीक्षा करें।", "error");
      return;
    }

    const title = el('anf-title')?.value?.trim();
    const category = el('anf-category')?.value;
    const readtime = el('anf-readtime')?.value?.trim() || '3 मिनट';
    const imgurl = uploadedImgUrl || el('anf-imgurl')?.value?.trim() || '';
    const summary = el('anf-summary')?.value?.trim();
    const content = el('anf-content')?.value?.trim();
    const featured = el('anf-featured')?.checked || false;
    const breaking = el('anf-breaking')?.checked || false;

    if (!title || !summary || !content) {
      showToast('कृपया आवश्यक फ़ील्ड भरें।', 'error');
      return;
    }

    // Disable publish button to prevent double submit
    const pubBtn = el('btn-publish-news');
    if (pubBtn) {
      pubBtn.disabled = true;
      pubBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> प्रकाशित किया जा रहा है...';
    }

    const now = new Date();
    const months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newArticle = {
      id: generateId(),
      title, summary, content, category, readtime,
      image: imgurl || defaultImg(category),
      date: dateStr,
      views: 0,
      featured, breaking
    };

    // If featured, mark all other articles as unfeatured in DB
    if (featured) {
      State.news.forEach(n => {
        if (n.featured) {
          db.ref('news/' + n.id + '/featured').set(false);
        }
      });
    }

    db.ref('news/' + newArticle.id).set(newArticle)
      .then(() => {
        form.reset();
        
        // Reset image uploader
        uploadedImgUrl = null;
        if (el('img-preview-wrap')) el('img-preview-wrap').style.display = 'none';
        const uploadLabel = el('img-upload-label');
        if (uploadLabel) {
          uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> <span>चित्र अपलोड करें (JPG, PNG, WEBP — Max 5MB)</span>';
          uploadLabel.style.display = 'flex';
          uploadLabel.style.pointerEvents = 'auto';
        }
        if (el('anf-imgurl')) el('anf-imgurl').disabled = false;
        if (el('anf-imgfile')) el('anf-imgfile').value = '';

        showToast('समाचार सफलतापूर्वक लाइव प्रकाशित हुआ! 🚀');
      })
      .catch((err) => {
        console.error("Publish error:", err);
        showToast('प्रकाशन असफल: ' + err.message, 'error');
      })
      .finally(() => {
        if (pubBtn) {
          pubBtn.disabled = false;
          pubBtn.innerHTML = 'समाचार प्रकाशित करें <i class="fa-solid fa-paper-plane"></i>';
        }
      });
  };
}

// 8. Manage News List Rendering
function renderNewsList() {
  const container = el('admin-news-list');
  if (!container) return;

  const searchQuery = el('news-search-input')?.value?.toLowerCase().trim() || '';
  
  // Filter news locally based on search box
  const filteredNews = State.news.filter(art => {
    return art.title.toLowerCase().includes(searchQuery) || 
           CAT_LABELS[art.category]?.toLowerCase().includes(searchQuery) ||
           art.category.toLowerCase().includes(searchQuery);
  });

  if (filteredNews.length === 0) {
    container.innerHTML = `<div class="empty-state">कोई समाचार नहीं मिला।</div>`;
    return;
  }

  container.innerHTML = filteredNews.map(art => `
    <div class="admin-news-item">
      <div class="ani-info">
        <div class="ani-title">${art.title}</div>
        <div class="ani-meta">
          <strong>श्रेणी:</strong> ${CAT_LABELS[art.category] || art.category} | 
          <strong>तारीख:</strong> ${art.date} | 
          <strong>व्यूज़:</strong> ${art.views} | 
          ${art.featured ? '<span style="color:var(--c-primary);font-weight:700;">★ Featured</span> |' : ''}
          ${art.breaking ? '<span style="color:#e6a817;font-weight:700;">⚡ Breaking</span>' : ''}
        </div>
      </div>
      <button class="btn-delete-item btn-del-news" data-id="${art.id}" title="हटाएं">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  // Handle news item delete button
  container.querySelectorAll('.btn-del-news').forEach(btn => {
    btn.onclick = () => {
      if (!State.dbConnected) {
        showToast("डेटाबेस ऑफ़लाइन है! कृपया इंटरनेट कनेक्शन चेक करें।", "error");
        return;
      }
      const id = btn.dataset.id;
      if (!confirm("क्या आप सचमुच इस समाचार को स्थायी रूप से डिलीट करना चाहते हैं?")) return;

      if (db) {
        db.ref('news/' + id).remove()
          .then(() => {
            showToast("समाचार सफलतापूर्वक हटा दिया गया।");
          })
          .catch((err) => {
            showToast("डेटा डिलीट असफल: " + err.message, "error");
          });
      }
    };
  });
}

function setupNewsSearch() {
  const searchInput = el('news-search-input');
  if (searchInput) {
    searchInput.oninput = () => renderNewsList();
  }
}

// 9. Poll Editing Form
function setupPollForm() {
  const form = el('admin-poll-form');
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    if (!db) { showToast("डेटाबेस कनेक्शन सक्रिय नहीं है!", "error"); return; }
    if (!State.dbConnected) {
      showToast("डेटाबेस ऑफ़लाइन है! कृपया इंटरनेट कनेक्शन चेक करें और डेटाबेस सक्रिय होने की प्रतीक्षा करें।", "error");
      return;
    }

    const question = el('apf-question')?.value?.trim();
    const opts = [
      el('apf-opt1')?.value?.trim(),
      el('apf-opt2')?.value?.trim(),
      el('apf-opt3')?.value?.trim(),
      el('apf-opt4')?.value?.trim()
    ].filter(o => o);

    if (!question || opts.length < 2) {
      showToast('कृपया प्रश्न और कम से कम 2 विकल्प लिखें।', 'error');
      return;
    }

    const newPoll = {
      question,
      options: opts,
      votes: opts.map(() => 0)
    };

    db.ref('poll').set(newPoll)
      .then(() => {
        // Clear local storage vote history to let users vote on the new poll
        localStorage.removeItem('suchana_poll_voted_question');
        showToast('नया जनमत सर्वेक्षण (Poll) सफलतापूर्वक लाइव कर दिया गया! 📊');
      })
      .catch((err) => {
        showToast('पोल लाइव असफल: ' + err.message, 'error');
      });
  };
}

// 10. Citizen Reports Rendering [NEW]
function renderReportsList() {
  const container = el('admin-reports-list');
  if (!container) return;

  if (State.reports.length === 0) {
    container.innerHTML = `<div class="empty-state">अभी तक किसी पाठक ने कोई खबर नहीं भेजी है।</div>`;
    return;
  }

  container.innerHTML = State.reports.map(rep => `
    <div class="report-card">
      <div class="rc-header">
        <div class="rc-sender">
          <h3><i class="fa-solid fa-circle-user"></i> ${rep.name}</h3>
          <p><i class="fa-solid fa-map-pin"></i> स्थान: ${rep.location}</p>
        </div>
        <span class="rc-date"><i class="fa-solid fa-calendar-day"></i> ${rep.date}</span>
      </div>
      <div class="rc-body">
        <h4>शीर्षक: ${rep.headline}</h4>
        <p>${rep.detail ? rep.detail.replace(/\n/g, '<br>') : '— विवरण नहीं है —'}</p>
      </div>
      <button class="btn-delete-item btn-del-report" data-key="${rep.key}" style="position: absolute; right: 18px; bottom: 18px;" title="हटाएं">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  // Delete citizen reports
  container.querySelectorAll('.btn-del-report').forEach(btn => {
    btn.onclick = () => {
      if (!State.dbConnected) {
        showToast("डेटाबेस ऑफ़लाइन है! कृपया इंटरनेट कनेक्शन चेक करें।", "error");
        return;
      }
      const key = btn.dataset.key;
      if (!confirm("क्या आप इस रिपोर्ट को डिलीट करना चाहते हैं?")) return;

      if (db) {
        db.ref('reports/' + key).remove()
          .then(() => {
            showToast("रिपोर्ट सफलतापूर्वक हटा दी गई।");
          })
          .catch((err) => {
            showToast("डिलीट असफल: " + err.message, "error");
          });
      }
    };
  });
}

// 11. Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupAuth();
  updatePanelVisibility();
  setupTabs();
  setupImageUpload();
  setupNewsForm();
  setupNewsSearch();
  setupPollForm();
});
