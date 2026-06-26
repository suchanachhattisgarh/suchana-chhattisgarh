/**
 * SUCHANA CHHATTISGARH — app.js
 * Static News Portal Application (GitHub + Netlify ready)
 * No backend required — uses localStorage for persistence
 */

'use strict';

/* ============================================================
   SAMPLE NEWS DATABASE (Static - editable via Admin Panel)
   ============================================================ */
const DEFAULT_NEWS = [
  {
    id: 1,
    title: "रायपुर में नई मेट्रो परियोजना: 2028 तक पूरा होने का लक्ष्य",
    summary: "छत्तीसगढ़ सरकार ने रायपुर मेट्रो रेल परियोजना का शुभारंभ किया। ₹12,000 करोड़ की इस परियोजना से शहर की यातायात समस्या दूर होगी।",
    content: `छत्तीसगढ़ की राजधानी रायपुर में बहुप्रतीक्षित मेट्रो रेल परियोजना का काम तेजी से शुरू हो गया है। मुख्यमंत्री विष्णु देव साय ने बताया कि यह परियोजना 2028 तक पूरी की जाएगी।

    परियोजना की कुल लागत ₹12,000 करोड़ से अधिक है और इससे रायपुर शहर के प्रमुख इलाकों को जोड़ा जाएगा। पहले चरण में बूढ़ापारा से एयरपोर्ट तक का रूट बनाया जाएगा।

    यातायात विशेषज्ञों का मानना है कि मेट्रो परियोजना से प्रतिदिन 2 लाख से अधिक यात्रियों को राहत मिलेगी और शहर में प्रदूषण में भी कमी आएगी।`,
    category: "Chhattisgarh",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop",
    date: "26 जून 2026",
    views: 8420,
    readtime: "4 मिनट",
    featured: true,
    breaking: false
  },
  {
    id: 2,
    title: "बस्तर में नक्सल विरोधी अभियान में बड़ी सफलता, 12 हथियार जब्त",
    summary: "बस्तर जिले में सुरक्षाबलों ने बड़े अभियान में भारी मात्रा में हथियार और विस्फोटक सामग्री जब्त की।",
    content: `बस्तर जिले में सुरक्षाबलों द्वारा चलाए जा रहे विशेष अभियान में बड़ी सफलता मिली है। IG बस्तर ने प्रेस कांफ्रेंस में बताया कि इस ऑपरेशन में 12 अत्याधुनिक हथियार सहित भारी मात्रा में विस्फोटक सामग्री बरामद की गई।

    अभियान के दौरान सुरक्षाबलों ने जंगल में कई नक्सली कैंप ध्वस्त किए। इस कार्रवाई में किसी जवान को कोई नुकसान नहीं हुआ।`,
    category: "Crime",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop",
    date: "25 जून 2026",
    views: 12700,
    readtime: "3 मिनट",
    featured: false,
    breaking: true
  },
  {
    id: 3,
    title: "छत्तीसगढ़ में धान खरीदी 2026-27: ₹3,100 प्रति क्विंटल MSP की घोषणा",
    summary: "राज्य सरकार ने इस खरीफ सीजन के लिए धान का न्यूनतम समर्थन मूल्य ₹3,100 प्रति क्विंटल निर्धारित किया है।",
    content: `छत्तीसगढ़ सरकार ने किसानों को बड़ी राहत देते हुए धान का न्यूनतम समर्थन मूल्य (MSP) ₹3,100 प्रति क्विंटल घोषित किया है। यह पिछले वर्ष से ₹200 अधिक है।

    मुख्यमंत्री साय ने कहा कि इस निर्णय से प्रदेश के करोड़ों किसानों को फायदा होगा। धान खरीदी 1 नवंबर 2026 से शुरू होगी।`,
    category: "Politics",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop",
    date: "25 जून 2026",
    views: 9880,
    readtime: "3 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 4,
    title: "IPL 2026: दिल्ली कैपिटल्स को हराकर मुंबई सेमीफाइनल में",
    summary: "मुंबई इंडियंस ने रोमांचक मैच में दिल्ली को 6 रन से हराकर आईपीएल 2026 के सेमीफाइनल में जगह बनाई।",
    content: `IPL 2026 के एक रोमांचक क्वार्टरफाइनल मुकाबले में मुंबई इंडियंस ने दिल्ली कैपिटल्स को 6 रन से हराकर सेमीफाइनल में प्रवेश किया।

    मुंबई ने 20 ओवर में 189 रन बनाए। रोहित शर्मा ने 68 रन की तूफानी पारी खेली। दिल्ली की टीम 183 रन बना सकी।`,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1540747913346-19212a4b423f?w=800&auto=format&fit=crop",
    date: "24 जून 2026",
    views: 22400,
    readtime: "2 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 5,
    title: "रायपुर में बड़ी कंपनी का निवेश: 5,000 नौकरियां आएंगी",
    summary: "टाटा ग्रुप ने छत्तीसगढ़ में ₹4,500 करोड़ के निवेश की घोषणा की, जिससे हज़ारों युवाओं को रोजगार मिलेगा।",
    content: `टाटा ग्रुप ने छत्तीसगढ़ में एक बड़े निवेश की घोषणा की है। रायपुर के उरला इंडस्ट्रियल एरिया में ₹4,500 करोड़ की लागत से एक आधुनिक मैन्युफैक्चरिंग प्लांट लगाया जाएगा।

    उद्योग मंत्री लखनलाल देवांगन ने कहा कि इस प्लांट से 5,000 से अधिक स्थानीय युवाओं को प्रत्यक्ष रोजगार मिलेगा।`,
    category: "Business",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    date: "24 जून 2026",
    views: 7650,
    readtime: "3 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 6,
    title: "बॉलीवुड फिल्म 'रंग दे बसंती 2' का ट्रेलर रिलीज़, छत्तीसगढ़ में भारी उत्साह",
    summary: "आमिर खान की बहुप्रतीक्षित फिल्म 'रंग दे बसंती 2' का ट्रेलर रिलीज़ होते ही सोशल मीडिया पर वायरल हो गया।",
    content: `बॉलीवुड के मेगास्टार आमिर खान की नई फिल्म 'रंग दे बसंती 2' का ट्रेलर मंगलवार को जारी हुआ और देखते ही देखते यह सोशल मीडिया पर छा गया।

    ट्रेलर में युवाओं के जोश और देशभक्ति की झलक साफ दिखती है। फिल्म 15 अगस्त 2026 को रिलीज होगी।`,
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
    date: "23 जून 2026",
    views: 18900,
    readtime: "2 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 7,
    title: "भारत-चीन सीमा पर तनाव कम, दोनों देश शांति के लिए तैयार",
    summary: "भारत-चीन के बीच हुई वार्ता में दोनों देशों ने वास्तविक नियंत्रण रेखा पर शांति बनाए रखने पर सहमति जताई।",
    content: `भारत और चीन के बीच हालिया वार्ता सफल रही है। विदेश मंत्री एस जयशंकर ने बताया कि दोनों देश सीमा पर यथास्थिति बनाए रखेंगे और तनाव कम करने के उपाय करेंगे।

    यह वार्ता जेनेवा में हुई जिसमें दोनों पक्षों के वरिष्ठ अधिकारी शामिल थे।`,
    category: "National",
    image: "https://images.unsplash.com/photo-1518544866330-95a2ab4a1b5e?w=800&auto=format&fit=crop",
    date: "23 जून 2026",
    views: 14300,
    readtime: "4 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 8,
    title: "दुर्ग में पुलिस ने 2 करोड़ की ड्रग्स जब्त की, 3 गिरफ्तार",
    summary: "दुर्ग पुलिस ने एक बड़े ड्रग तस्करी नेटवर्क का भंडाफोड़ करते हुए 2 करोड़ की मादक सामग्री जब्त की।",
    content: `दुर्ग जिला पुलिस ने एक बड़ी कार्रवाई में ड्रग तस्करी नेटवर्क का पर्दाफाश किया है। SP दुर्ग ने बताया कि इस कार्रवाई में तीन तस्करों को गिरफ्तार किया गया है और ₹2 करोड़ मूल्य की मादक सामग्री बरामद की गई।

    पुलिस के अनुसार यह नेटवर्क उड़ीसा और महाराष्ट्र से भी जुड़ा था।`,
    category: "Crime",
    image: "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=800&auto=format&fit=crop",
    date: "22 जून 2026",
    views: 9200,
    readtime: "3 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 9,
    title: "छत्तीसगढ़ विधानसभा का मानसून सत्र 15 जुलाई से, 20 बड़े विधेयक पेश होंगे",
    summary: "छत्तीसगढ़ विधानसभा का मानसून सत्र 15 जुलाई से शुरू होगा। सत्र में 20 महत्वपूर्ण विधेयकों पर चर्चा होगी।",
    content: `छत्तीसगढ़ विधानसभा सचिवालय ने घोषणा की है कि राज्य विधानसभा का मानसून सत्र 15 जुलाई 2026 से शुरू होगा।

    विधानसभा अध्यक्ष डॉ. रमन सिंह ने बताया कि इस सत्र में कुल 20 महत्वपूर्ण विधेयक पेश किए जाएंगे। इनमें शिक्षा, स्वास्थ्य और रोजगार से जुड़े विधेयक प्रमुख हैं।`,
    category: "Politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    date: "22 जून 2026",
    views: 6780,
    readtime: "3 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 10,
    title: "बिलासपुर में अंतर्राष्ट्रीय व्यापार मेला शुरू, 500 से अधिक स्टॉल",
    summary: "बिलासपुर में 5 दिवसीय अंतर्राष्ट्रीय व्यापार मेले का आयोजन। देश-विदेश के 500 से अधिक व्यापारी भाग ले रहे हैं।",
    content: `बिलासपुर में पांच दिवसीय अंतर्राष्ट्रीय व्यापार मेले का भव्य उद्घाटन हुआ। इस मेले में देश के विभिन्न राज्यों के साथ-साथ जापान, चीन और दक्षिण कोरिया के व्यापारी भी भाग ले रहे हैं।

    मेले में 500 से अधिक स्टॉल लगाए गए हैं। स्थानीय हस्तशिल्प और बस्तर के उत्पादों ने विशेष आकर्षण का केंद्र बनाए हुए हैं।`,
    category: "Business",
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&auto=format&fit=crop",
    date: "21 जून 2026",
    views: 5490,
    readtime: "2 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 11,
    title: "पेरिस ओलंपिक 2028 के लिए छत्तीसगढ़ की बेटी आकांक्षा का चयन",
    summary: "रायपुर की खिलाड़ी आकांक्षा साहू का पेरिस ओलंपिक 2028 के ट्रायल में भारतीय शूटिंग टीम में चयन हुआ।",
    content: `छत्तीसगढ़ की बेटी आकांक्षा साहू ने राज्य का नाम रोशन करते हुए पेरिस ओलंपिक 2028 के लिए भारतीय शूटिंग टीम में अपना स्थान पक्का किया है।

    आकांक्षा रायपुर के एक सरकारी स्कूल की छात्रा हैं और उन्होंने कठिन परिश्रम से यह मुकाम हासिल किया है।`,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&auto=format&fit=crop",
    date: "21 जून 2026",
    views: 11200,
    readtime: "2 मिनट",
    featured: false,
    breaking: false
  },
  {
    id: 12,
    title: "छत्तीसगढ़ का सांस्कृतिक उत्सव 'हरेली': परंपरा और आधुनिकता का संगम",
    summary: "छत्तीसगढ़ का प्रमुख पर्व हरेली इस वर्ष विशेष धूमधाम से मनाया जाएगा। सरकार ने राज्य स्तरीय आयोजन की घोषणा की।",
    content: `छत्तीसगढ़ का प्रमुख आदिवासी पर्व हरेली इस वर्ष 28 जुलाई को मनाया जाएगा। राज्य सरकार ने इसे राज्य स्तरीय उत्सव के रूप में मनाने का निर्णय लिया है।

    सांस्कृतिक मंत्री ने बताया कि इस बार हरेली उत्सव में छत्तीसगढ़ के पारंपरिक लोक कलाओं का प्रदर्शन होगा और साथ ही आधुनिक तकनीक का भी उपयोग किया जाएगा।`,
    category: "Chhattisgarh",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop",
    date: "20 जून 2026",
    views: 4890,
    readtime: "3 मिनट",
    featured: false,
    breaking: false
  }
];

const DEFAULT_POLL = {
  question: "क्या रायपुर में मेट्रो परियोजना से शहर का विकास होगा?",
  options: ["हाँ, बिल्कुल सहमत हूँ", "नहीं, असहमत हूँ", "कुछ हद तक सहमत", "कोई राय नहीं"],
  votes: [0, 0, 0, 0],
  voted: false
};

const WEATHER_DATA = {
  Raipur:    { temp: "32°C", desc: "आंशिक रूप से बादल", hum: "64%", wind: "14 km/h", icon: "fa-cloud-sun" },
  Bilaspur:  { temp: "30°C", desc: "बारिश की संभावना", hum: "71%", wind: "18 km/h", icon: "fa-cloud-showers-heavy" },
  Durg:      { temp: "31°C", desc: "धुंधला मौसम", hum: "68%", wind: "10 km/h", icon: "fa-smog" },
  Bastar:    { temp: "27°C", desc: "तेज़ बारिश", hum: "85%", wind: "22 km/h", icon: "fa-cloud-showers-heavy" },
  Surguja:   { temp: "29°C", desc: "आंशिक बादल", hum: "76%", wind: "12 km/h", icon: "fa-cloud" }
};

/* ============================================================
   STATE MANAGEMENT
   ============================================================ */
const State = {
  news: [],
  poll: {},
  currentCat: "All",
  loadedCount: 6,
  adminLoggedIn: false,

  load() {
    const stored = localStorage.getItem('suchana_news');
    this.news = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_NEWS));
    const storedPoll = localStorage.getItem('suchana_poll');
    this.poll = storedPoll ? JSON.parse(storedPoll) : JSON.parse(JSON.stringify(DEFAULT_POLL));
  },
  save() {
    localStorage.setItem('suchana_news', JSON.stringify(this.news));
    localStorage.setItem('suchana_poll', JSON.stringify(this.poll));
  },
  getFiltered() {
    if (this.currentCat === "All") return this.news;
    return this.news.filter(n => n.category === this.currentCat);
  },
  getFeatured() {
    return this.news.find(n => n.featured) || this.news[0];
  },
  getBreaking() {
    return this.news.filter(n => n.breaking).map(n => n.title);
  },
  getTrending() {
    return [...this.news].sort((a, b) => b.views - a.views).slice(0, 5);
  }
};

/* ============================================================
   CATEGORY LABELS (Hindi)
   ============================================================ */
const CAT_LABELS = {
  All: "सभी समाचार",
  Chhattisgarh: "छत्तीसगढ़",
  JanjgirChampa: "जांजगीर-चांपा",
  Politics: "राजनीति",
  Crime: "अपराध",
  Business: "व्यापार",
  Sports: "खेल-कूद",
  Entertainment: "मनोरंजन",
  National: "देश-विदेश"
};

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function formatDate() {
  const now = new Date();
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
function formatDateShort() {
  const now = new Date();
  const days = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  const months = ['जन', 'फर', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'];
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
}
function formatViews(n) {
  if (n >= 100000) return (n / 100000).toFixed(1) + ' लाख';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
function el(id) { return document.getElementById(id); }
function showToast(msg, type = 'success') {
  const wrap = el('toast-wrap');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i> ${msg}`;
  wrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(30px)'; t.style.transition = '0.3s ease'; setTimeout(() => t.remove(), 350); }, 3000);
}
function generateId() { return Date.now() + Math.floor(Math.random() * 1000); }
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

/* ============================================================
   RENDER: BREAKING TICKER
   ============================================================ */
function renderTicker() {
  const breaking = State.getBreaking();
  const all = State.news.slice(0, 5).map(n => n.title);
  const items = breaking.length ? breaking : all;
  const ticker = el('breaking-ticker-inner');
  if (!ticker) return;
  ticker.innerHTML = items.map(t => `<span style="margin-right: 60px;">• ${t}</span>`).join('');
}

/* ============================================================
   RENDER: DATE
   ============================================================ */
function renderDates() {
  const full = formatDate();
  const short = formatDateShort();
  if (el('top-date-display')) el('top-date-display').textContent = full;
  if (el('header-date-inline')) el('header-date-inline').textContent = short;
}

/* ============================================================
   RENDER: HERO FEATURED
   ============================================================ */
function renderHeroFeatured() {
  const container = el('hero-featured');
  if (!container) return;
  const art = State.getFeatured();
  if (!art) { container.innerHTML = '<div class="loading-shimmer" style="height:460px;"></div>'; return; }
  container.innerHTML = `
    <div class="hf-img-wrap">
      <img src="${art.image || defaultImg(art.category)}" alt="${art.title}" loading="eager" onerror="this.src='${defaultImg(art.category)}'">
      <span class="hf-cat">${CAT_LABELS[art.category] || art.category}</span>
    </div>
    <div class="hf-body">
      <h2 class="hf-title">${art.title}</h2>
      <p class="hf-summary">${art.summary}</p>
      <div class="hf-meta">
        <span><i class="fa-solid fa-calendar-day"></i> ${art.date}</span>
        <span><i class="fa-solid fa-eye"></i> ${formatViews(art.views)} व्यूज़</span>
        <span><i class="fa-solid fa-clock"></i> ${art.readtime}</span>
      </div>
    </div>
  `;
  container.onclick = () => openArticleModal(art.id);
}

/* ============================================================
   RENDER: HERO RIGHT STACK
   ============================================================ */
function renderHeroRightStack() {
  const container = el('hero-right-stack');
  if (!container) return;
  const items = State.news.filter(n => !n.featured).slice(0, 4);
  container.innerHTML = items.map(art => `
    <div class="stack-card" data-id="${art.id}">
      <img class="stack-card-img" src="${art.image || defaultImg(art.category)}" alt="${art.title}" loading="lazy" onerror="this.src='${defaultImg(art.category)}'">
      <div class="stack-card-body">
        <span class="sc-cat">${CAT_LABELS[art.category] || art.category}</span>
        <div class="sc-title">${art.title}</div>
        <div class="sc-time"><i class="fa-solid fa-clock"></i> ${art.date}</div>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.stack-card').forEach(card => {
    card.onclick = () => openArticleModal(parseInt(card.dataset.id));
  });
}

/* ============================================================
   RENDER: NEWS GRID
   ============================================================ */
function renderNewsGrid(reset = false) {
  const container = el('news-grid-loop');
  if (!container) return;
  if (reset) State.loadedCount = 6;
  const filtered = State.getFiltered();
  const toShow = filtered.slice(0, State.loadedCount);

  container.innerHTML = toShow.length ? toShow.map(art => `
    <div class="news-card" data-id="${art.id}">
      <div class="nc-img-wrap">
        <img src="${art.image || defaultImg(art.category)}" alt="${art.title}" loading="lazy" onerror="this.src='${defaultImg(art.category)}'">
        <span class="nc-cat-badge">${CAT_LABELS[art.category] || art.category}</span>
      </div>
      <div class="nc-body">
        <div class="nc-title">${art.title}</div>
        <div class="nc-excerpt">${art.summary}</div>
        <div class="nc-meta">
          <span class="nc-cat-inline">${CAT_LABELS[art.category] || art.category}</span>
          <span>${art.date}</span>
        </div>
      </div>
    </div>
  `).join('') : '<p style="color: var(--c-text-light); text-align:center; padding:40px; grid-column: 1/-1;">इस श्रेणी में कोई समाचार नहीं मिला।</p>';

  container.querySelectorAll('.news-card').forEach(card => {
    card.onclick = () => openArticleModal(parseInt(card.dataset.id));
  });

  const loadMoreBtn = el('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = (State.loadedCount < filtered.length) ? 'inline-flex' : 'none';
  }
}

/* ============================================================
   RENDER: TRENDING SIDEBAR
   ============================================================ */
function renderTrending() {
  const container = el('trending-loop');
  if (!container) return;
  const items = State.getTrending();
  container.innerHTML = items.map((art, i) => `
    <div class="trending-item" data-id="${art.id}">
      <span class="ti-num">${i + 1}</span>
      <img class="ti-img" src="${art.image || defaultImg(art.category)}" alt="${art.title}" loading="lazy" onerror="this.src='${defaultImg(art.category)}'">
      <div class="ti-body">
        <div class="ti-cat">${CAT_LABELS[art.category] || art.category}</div>
        <div class="ti-title">${art.title}</div>
        <div class="ti-date">${art.date}</div>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.trending-item').forEach(item => {
    item.onclick = () => openArticleModal(parseInt(item.dataset.id));
  });
}

/* ============================================================
   RENDER: POLL
   ============================================================ */
function renderPoll() {
  const p = State.poll;
  if (el('poll-question')) el('poll-question').textContent = p.question;
  const container = el('poll-opts');
  if (!container) return;
  const totalVotes = p.votes.reduce((a, b) => a + b, 0);

  container.innerHTML = p.options.map((opt, i) => {
    const pct = totalVotes ? Math.round((p.votes[i] / totalVotes) * 100) : 0;
    return `
      <button class="poll-opt-btn ${p.voted ? 'voted' : ''}" data-index="${i}" ${p.voted ? 'disabled' : ''}>
        <div class="poll-opt-progress" style="width:${p.voted ? pct : 0}%"></div>
        <span class="poll-opt-label">${opt}</span>
        ${p.voted ? `<span class="poll-opt-pct">${pct}%</span>` : ''}
      </button>
    `;
  }).join('');

  if (!p.voted) {
    container.querySelectorAll('.poll-opt-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index);
        p.votes[idx]++;
        p.voted = true;
        State.save();
        renderPoll();
        showToast('आपका वोट दर्ज हो गया! धन्यवाद।');
      };
    });
  }

  if (el('poll-total')) el('poll-total').textContent = `कुल वोट: ${totalVotes}`;
}

/* ============================================================
   RENDER: WEATHER SIDEBAR
   ============================================================ */
function renderWeather(city = 'Raipur') {
  const data = WEATHER_DATA[city] || WEATHER_DATA.Raipur;
  if (el('ws-temp')) el('ws-temp').textContent = data.temp;
  if (el('ws-city')) el('ws-city').textContent = city;
  if (el('ws-desc')) el('ws-desc').textContent = data.desc;
  if (el('ws-hum')) el('ws-hum').textContent = data.hum;
  if (el('ws-wind')) el('ws-wind').textContent = data.wind;
  const icon = el('ws-icon');
  if (icon) icon.className = `fa-solid ${data.icon} ws-icon`;
}

/* ============================================================
   ARTICLE MODAL
   ============================================================ */
function openArticleModal(id) {
  const art = State.news.find(n => n.id === id);
  if (!art) return;
  art.views++;
  State.save();

  if (el('modal-img')) { el('modal-img').src = art.image || defaultImg(art.category); el('modal-img').alt = art.title; }
  if (el('modal-cat-badge')) el('modal-cat-badge').textContent = CAT_LABELS[art.category] || art.category;
  if (el('modal-title')) el('modal-title').textContent = art.title;
  if (el('modal-date')) el('modal-date').textContent = art.date;
  if (el('modal-views')) el('modal-views').textContent = formatViews(art.views);
  if (el('modal-readtime')) el('modal-readtime').textContent = art.readtime;
  if (el('modal-article-text')) {
    el('modal-article-text').innerHTML = art.content.split('\n').filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('');
  }

  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(art.title);
  if (el('share-fb')) el('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (el('share-wa')) el('share-wa').href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
  if (el('share-tg')) el('share-tg').href = `https://t.me/share/url?url=${url}&text=${title}`;

  const modal = el('article-modal-backdrop');
  if (modal) { modal.style.display = 'flex'; modal.classList.add('open'); document.body.style.overflow = 'hidden'; }

  // Re-render for view count update
  renderNewsGrid();
  renderTrending();
}

function closeArticleModal() {
  const modal = el('article-modal-backdrop');
  if (modal) { modal.style.display = 'none'; modal.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ============================================================
   COPY LINK
   ============================================================ */
function setupCopyLink() {
  const btn = el('share-copy');
  if (!btn) return;
  btn.onclick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => showToast('लिंक कॉपी हो गया!')).catch(() => showToast('कॉपी नहीं हो सका', 'error'));
  };
}

/* ============================================================
   CATEGORY FILTER
   ============================================================ */
function setupCatFilters() {
  // Pill buttons
  document.querySelectorAll('.pill').forEach(pill => {
    pill.onclick = () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      State.currentCat = pill.dataset.cat;
      if (el('section-cat-label')) el('section-cat-label').textContent = CAT_LABELS[State.currentCat] || State.currentCat;
      renderNewsGrid(true);
    };
  });

  // Nav menu links
  document.querySelectorAll('[data-cat]').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      State.currentCat = link.dataset.cat;
      document.querySelectorAll('.main-menu a').forEach(a => a.classList.remove('active'));
      document.querySelectorAll('.main-menu a[data-cat="'+State.currentCat+'"]').forEach(a => a.classList.add('active'));
      document.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.cat === State.currentCat);
      });
      if (el('section-cat-label')) el('section-cat-label').textContent = CAT_LABELS[State.currentCat] || State.currentCat;
      renderNewsGrid(true);
      closeOffCanvas();
      document.querySelector('.main-col')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
}

/* ============================================================
   LOAD MORE
   ============================================================ */
function setupLoadMore() {
  const btn = el('load-more-btn');
  if (!btn) return;
  btn.onclick = () => {
    State.loadedCount += 6;
    renderNewsGrid();
    btn.innerHTML = `और खबरें लोड करें <i class="fa-solid fa-chevron-down"></i>`;
  };
}

/* ============================================================
   SEARCH
   ============================================================ */
function setupSearch() {
  const toggleBtn = el('header-search-toggle');
  const dropEl = el('header-search-drop');
  const input = el('search-input-main');
  const submitBtn = el('search-submit-btn');

  if (toggleBtn && dropEl) {
    toggleBtn.onclick = () => dropEl.classList.toggle('open');
  }

  function doSearch() {
    const q = input?.value?.trim().toLowerCase();
    if (!q) return;
    State.currentCat = 'All';
    const results = State.news.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
    const container = el('news-grid-loop');
    if (!container) return;
    container.innerHTML = results.length
      ? results.map(art => `
          <div class="news-card" data-id="${art.id}">
            <div class="nc-img-wrap">
              <img src="${art.image || defaultImg(art.category)}" alt="${art.title}" loading="lazy">
              <span class="nc-cat-badge">${CAT_LABELS[art.category] || art.category}</span>
            </div>
            <div class="nc-body">
              <div class="nc-title">${art.title}</div>
              <div class="nc-excerpt">${art.summary}</div>
              <div class="nc-meta"><span class="nc-cat-inline">${CAT_LABELS[art.category]}</span><span>${art.date}</span></div>
            </div>
          </div>`).join('')
      : `<p style="color:var(--c-text-light);text-align:center;padding:40px;grid-column:1/-1;">"${input.value}" के लिए कोई परिणाम नहीं मिला।</p>`;
    container.querySelectorAll('.news-card').forEach(card => {
      card.onclick = () => openArticleModal(parseInt(card.dataset.id));
    });
    if (el('section-cat-label')) el('section-cat-label').textContent = `"${input.value}" — खोज परिणाम`;
    if (dropEl) dropEl.classList.remove('open');
  }

  if (submitBtn) submitBtn.onclick = doSearch;
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

/* ============================================================
   MOBILE OFF-CANVAS
   ============================================================ */
function setupOffCanvas() {
  const btn = el('hamburger-btn');
  const overlay = el('off-canvas-overlay');
  const menu = el('off-canvas-menu');
  const closeBtn = el('ofc-close');

  function openOffCanvas() {
    overlay?.classList.add('open');
    menu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeOffCanvasLocal() {
    overlay?.classList.remove('open');
    menu?.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.closeOffCanvas = closeOffCanvasLocal;

  if (btn) btn.onclick = openOffCanvas;
  if (overlay) overlay.onclick = closeOffCanvasLocal;
  if (closeBtn) closeBtn.onclick = closeOffCanvasLocal;
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function setupThemeToggle() {
  const btn = el('scheme-toggle');
  const icon = el('toggle-icon');
  let dark = localStorage.getItem('suchana_theme') === 'dark';

  function applyTheme() {
    document.body.classList.toggle('s-dark', dark);
    document.body.classList.toggle('s-light', !dark);
    if (icon) { icon.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'; }
    localStorage.setItem('suchana_theme', dark ? 'dark' : 'light');
  }
  applyTheme();
  if (btn) btn.onclick = () => { dark = !dark; applyTheme(); };
}

/* ============================================================
   WEATHER CITY SELECT
   ============================================================ */
function setupWeather() {
  const sel = el('city-select');
  if (sel) sel.onchange = () => renderWeather(sel.value);
}

/* ============================================================
   CITIZEN REPORTER FORM
   ============================================================ */
function setupCitizenForm() {
  const form = el('citizen-form');
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const location = data.get('location');
    const headline = data.get('headline');
    if (!name || !location || !headline) { showToast('कृपया सभी ज़रूरी फ़ील्ड भरें।', 'error'); return; }
    showToast(`${name} जी, आपकी रिपोर्ट भेज दी गई! हम जल्द संपर्क करेंगे।`);
    form.reset();
    // Store in localStorage for admin view
    const reports = JSON.parse(localStorage.getItem('suchana_reports') || '[]');
    reports.unshift({ name, location, headline, detail: data.get('detail'), date: new Date().toLocaleDateString('hi-IN') });
    localStorage.setItem('suchana_reports', JSON.stringify(reports));
  };
}

/* ============================================================
   ADMIN PANEL
   ============================================================ */
function setupAdmin() {
  const portalLink = el('admin-portal-link');
  const backdrop = el('admin-modal-backdrop');
  const closeBtn = el('admin-modal-close');
  const loginPanel = el('admin-login-panel');
  const dashPanel = el('admin-dash-panel');

  function openAdminModal() {
    if (backdrop) { backdrop.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    if (State.adminLoggedIn) { loginPanel.style.display = 'none'; dashPanel.style.display = 'block'; renderAdminNewsList(); }
    else { loginPanel.style.display = 'block'; dashPanel.style.display = 'none'; }
  }
  function closeAdminModal() {
    if (backdrop) { backdrop.style.display = 'none'; document.body.style.overflow = ''; }
  }

  if (portalLink) portalLink.onclick = (e) => { e.preventDefault(); openAdminModal(); };
  if (closeBtn) closeBtn.onclick = closeAdminModal;
  if (backdrop) backdrop.onclick = (e) => { if (e.target === backdrop) closeAdminModal(); };

  // Login
  const loginBtn = el('admin-login-btn');
  if (loginBtn) loginBtn.onclick = () => {
    const pass = el('admin-pass-input')?.value;
    if (pass === 'admin123') {
      State.adminLoggedIn = true;
      loginPanel.style.display = 'none';
      dashPanel.style.display = 'block';
      renderAdminNewsList();
      showToast('एडमिन लॉगिन सफल!');
    } else {
      showToast('गलत पासवर्ड। पुनः प्रयास करें।', 'error');
    }
  };
  if (el('admin-pass-input')) {
    el('admin-pass-input').onkeydown = (e) => { if (e.key === 'Enter') loginBtn?.click(); };
  }

  // Logout
  const logoutBtn = el('admin-logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => {
    State.adminLoggedIn = false;
    dashPanel.style.display = 'none';
    loginPanel.style.display = 'block';
    if (el('admin-pass-input')) el('admin-pass-input').value = '';
  };

  // Tab switching
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = el('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
      if (tab.dataset.tab === 'manage-news') renderAdminNewsList();
    };
  });

  // ---- IMAGE UPLOAD HANDLER ----
  let uploadedImgData = null; // stores base64 string of uploaded image

  const imgFileInput = el('anf-imgfile');
  const imgPreviewWrap = el('img-preview-wrap');
  const imgPreview = el('img-preview');
  const imgRemoveBtn = el('img-remove-btn');
  const imgUploadLabel = document.querySelector('.img-upload-label');

  const IMGBB_API_KEY = '5368bd0e8283baec2685b3029510756e';

  if (imgFileInput) {
    imgFileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Size check: max 5MB for imgBB
      if (file.size > 5 * 1024 * 1024) {
        showToast('इमेज 5MB से छोटी होनी चाहिए!', 'error');
        imgFileInput.value = '';
        return;
      }

      // Show loading state
      if (imgUploadLabel) {
        imgUploadLabel.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> अपलोड हो रही है...';
        imgUploadLabel.style.pointerEvents = 'none';
      }

      try {
        // Convert to base64 first for preview
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result.split(',')[1]);
          reader.readAsDataURL(file);
        });

        // Show preview immediately
        if (imgPreview) imgPreview.src = 'data:image/jpeg;base64,' + base64;
        if (imgPreviewWrap) imgPreviewWrap.style.display = 'block';

        // Upload to ImgBB
        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64);

        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          uploadedImgData = result.data.url; // public URL from imgBB
          if (imgPreview) imgPreview.src = uploadedImgData;
          if (el('anf-imgurl')) { el('anf-imgurl').value = uploadedImgData; el('anf-imgurl').disabled = true; }
          if (imgUploadLabel) imgUploadLabel.style.display = 'none';
          showToast('इमेज ImgBB पर upload हो गई! ✅ सबको दिखेगी!');
        } else {
          throw new Error('Upload failed');
        }

      } catch (err) {
        showToast('इमेज upload नहीं हुई। URL field में link paste करें।', 'error');
        if (imgUploadLabel) {
          imgUploadLabel.innerHTML = '<i class="fa-solid fa-image"></i> इमेज अपलोड करें <span class="img-upload-hint">(JPG, PNG, WEBP — max 5MB)</span>';
          imgUploadLabel.style.pointerEvents = 'auto';
        }
        if (imgPreviewWrap) imgPreviewWrap.style.display = 'none';
        if (el('anf-imgurl')) el('anf-imgurl').disabled = false;
        uploadedImgData = null;
      }
    };
  }

  if (imgRemoveBtn) {
    imgRemoveBtn.onclick = () => {
      uploadedImgData = null;
      if (imgFileInput) imgFileInput.value = '';
      if (imgPreviewWrap) imgPreviewWrap.style.display = 'none';
      if (imgUploadLabel) {
        imgUploadLabel.innerHTML = '<i class="fa-solid fa-image"></i> इमेज अपलोड करें <span class="img-upload-hint">(JPG, PNG, WEBP — max 5MB)</span>';
        imgUploadLabel.style.display = 'flex';
        imgUploadLabel.style.pointerEvents = 'auto';
      }
      if (el('anf-imgurl')) { el('anf-imgurl').value = ''; el('anf-imgurl').disabled = false; }
    };
  }
  // ---- END IMAGE UPLOAD HANDLER ----

  // Add news form
  const addNewsForm = el('admin-add-news-form');
  if (addNewsForm) addNewsForm.onsubmit = (e) => {
    e.preventDefault();
    const title = el('anf-title')?.value?.trim();
    const category = el('anf-category')?.value;
    const readtime = el('anf-readtime')?.value?.trim() || '3 मिनट';
    // Use uploaded image first, then URL field, then default
    const imgurl = uploadedImgData || el('anf-imgurl')?.value?.trim() || '';
    const summary = el('anf-summary')?.value?.trim();
    const content = el('anf-content')?.value?.trim();
    const featured = el('anf-featured')?.checked || false;
    const breaking = el('anf-breaking')?.checked || false;

    if (!title || !summary || !content) { showToast('कृपया सभी ज़रूरी फ़ील्ड भरें।', 'error'); return; }

    const now = new Date();
    const months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    if (featured) State.news.forEach(n => n.featured = false);

    State.news.unshift({
      id: generateId(),
      title, summary, content, category, readtime,
      image: imgurl || defaultImg(category),
      date: dateStr,
      views: 0,
      featured, breaking
    });
    State.save();
    renderAll();
    addNewsForm.reset();
    // Reset image upload UI
    uploadedImgData = null;
    if (imgPreviewWrap) imgPreviewWrap.style.display = 'none';
    if (imgUploadLabel) imgUploadLabel.style.display = 'flex';
    if (el('anf-imgurl')) el('anf-imgurl').disabled = false;
    showToast('समाचार सफलतापूर्वक प्रकाशित हुआ! 🎉');

  };

  // Poll edit form
  const pollForm = el('admin-poll-form');
  if (pollForm) pollForm.onsubmit = (e) => {
    e.preventDefault();
    const question = el('apf-question')?.value?.trim();
    const opts = [
      el('apf-opt1')?.value?.trim(),
      el('apf-opt2')?.value?.trim(),
      el('apf-opt3')?.value?.trim(),
      el('apf-opt4')?.value?.trim()
    ].filter(o => o);
    if (!question || opts.length < 2) { showToast('कृपया प्रश्न और कम से कम 2 विकल्प डालें।', 'error'); return; }
    State.poll = { question, options: opts, votes: opts.map(() => 0), voted: false };
    State.save();
    renderPoll();
    showToast('नया पोल लाइव हो गया!');
  };
}

/* ============================================================
   ADMIN: NEWS LIST
   ============================================================ */
function renderAdminNewsList() {
  const container = el('admin-news-list');
  if (!container) return;
  if (!State.news.length) { container.innerHTML = '<p style="color:var(--c-text-light);font-size:13px;">कोई समाचार नहीं।</p>'; return; }
  container.innerHTML = State.news.map(art => `
    <div class="admin-news-item" data-id="${art.id}">
      <div>
        <div class="ani-title">${art.title}</div>
        <div class="ani-cat">${CAT_LABELS[art.category] || art.category} · ${art.date} · ${formatViews(art.views)} व्यूज़</div>
      </div>
      <button class="ani-del" data-id="${art.id}" title="हटाएं"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `).join('');
  container.querySelectorAll('.ani-del').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      State.news = State.news.filter(n => n.id !== id);
      State.save();
      renderAll();
      renderAdminNewsList();
      showToast('समाचार हटा दिया गया।');
    };
  });
}

/* ============================================================
   RENDER ALL
   ============================================================ */
function renderAll() {
  renderDates();
  renderTicker();
  renderHeroFeatured();
  renderHeroRightStack();
  renderNewsGrid(true);
  renderTrending();
  renderPoll();
  renderWeather();
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArticleModal();
      if (el('admin-modal-backdrop')) el('admin-modal-backdrop').style.display = 'none';
      document.body.style.overflow = '';
      if (el('header-search-drop')) el('header-search-drop').classList.remove('open');
      if (el('off-canvas-overlay')) el('off-canvas-overlay').classList.remove('open');
      if (el('off-canvas-menu')) el('off-canvas-menu').classList.remove('open');
    }
  });
}

/* ============================================================
   STICKY NAV SHADOW
   ============================================================ */
function setupStickyNav() {
  const nav = el('nav-main');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 60 ? '0 4px 20px rgba(0,0,0,0.4)' : '0 3px 10px rgba(0,0,0,0.3)';
  }, { passive: true });
}

/* ============================================================
   NETLIFY FORMS SUPPORT (add hidden form for Netlify)
   ============================================================ */
function injectNetlifyForm() {
  // Netlify bot field injection for citizen form
  const form = el('citizen-form');
  if (form) {
    const hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = 'form-name';
    hidden.value = 'citizen-reporter';
    form.appendChild(hidden);
    form.setAttribute('data-netlify', 'true');
    form.setAttribute('name', 'citizen-reporter');
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  State.load();

  setupThemeToggle();
  setupOffCanvas();
  setupSearch();
  setupCatFilters();
  setupLoadMore();
  setupWeather();
  setupCitizenForm();
  setupAdmin();
  setupCopyLink();
  setupKeyboard();
  setupStickyNav();
  injectNetlifyForm();

  renderAll();

  // Close modal on backdrop click
  const modalBackdrop = el('article-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.onclick = (e) => { if (e.target === modalBackdrop) closeArticleModal(); };
  }
  const modalCloseBtn = el('modal-close-btn');
  if (modalCloseBtn) modalCloseBtn.onclick = closeArticleModal;

  // Animate numbers on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sidebar-widget').forEach(w => observer.observe(w));

  console.log('%c सुचना छत्तीसगढ़ 🗞️', 'color:#ab0100;font-size:18px;font-weight:bold;');
  console.log('%c Static News Portal — GitHub + Netlify Ready', 'color:#888;font-size:12px;');
});
