# Suchana Chhattisgarh — News Portal
## छत्तीसगढ़ का अग्रणी डिजिटल समाचार पोर्टल

A modern, responsive Hindi news portal inspired by khabarplus1.com, built as a static site for GitHub + Netlify deployment.

---

## 🚀 Live Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com)

**Demo URL:** https://suchanachhattisgarh.netlify.app

---

## ✨ Features

### Design (khabarplus1.com Style)
- 🔴 **Top Social Bar** — Red background with social icons (Facebook, YouTube, Instagram, WhatsApp, Telegram)
- 📰 **Center Logo Header** — Logo center, hamburger left, search right
- 🖤 **Dark Sticky Navigation** — Uppercase Hindi categories with red hover underline
- ⚡ **Breaking News Ticker** — Auto-scrolling red-accent ticker bar
- 🏠 **Hero Section** — Featured big post + 4-item right stack
- 📦 **News Grid** — Responsive 3-column card grid with category badges
- 📱 **Sidebar** — Trending, Poll, Weather, Citizen Reporter
- 🌙 **Dark/Light Mode** — Toggle between schemes (persisted in localStorage)
- 📲 **Mobile Responsive** — Off-canvas hamburger menu

### Functionality
- 🗞️ **12 Sample Articles** — Hindi news content pre-loaded
- 🔍 **Search** — Full-text search across title, summary, content
- 🗳️ **Interactive Poll** — Vote and see results with progress bars
- 🌤️ **Weather Widget** — 5 Chhattisgarh cities with mock data
- 📢 **Article Modal** — Full article reader with share buttons
- 🔖 **Category Filters** — Filter news by category (pill + nav)
- 🔒 **Admin Panel** — Add/delete news, edit poll (password: `admin123`)
- 💾 **localStorage** — All data persists across page refreshes

### GitHub + Netlify Ready
- ✅ No build process required
- ✅ `netlify.toml` with security headers and caching
- ✅ Netlify Forms support for Citizen Reporter
- ✅ 100% static HTML/CSS/JS

---

## 📁 File Structure

```
suchana-chhattisgarh/
├── index.html          # Main HTML template
├── styles.css          # Complete CSS (khabarplus1 inspired)
├── app.js              # JavaScript — all logic
├── netlify.toml        # Netlify deployment config
├── README.md           # This file
└── assets/
    └── logo.jpeg       # Site logo
```

---

## 🚀 Deployment

### GitHub + Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Suchana Chhattisgarh News Portal"
   git remote add origin https://github.com/YOUR_USERNAME/suchana-chhattisgarh.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com) → "New Site from Git"
   - Connect your GitHub repo
   - Build command: *(leave empty)*
   - Publish directory: `.`
   - Click **Deploy Site**

3. **Custom Domain (Optional):**
   - Go to Site Settings → Domain Management
   - Add your custom domain

---

## 🔑 Admin Panel

Access via footer → "एडमिन" link  
**Default Password:** `admin123`

**Features:**
- ➕ Add new articles with category, image URL, featured/breaking flags
- 🗑️ Delete existing articles
- 🗳️ Update the weekly opinion poll

---

## 🎨 Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `--c-main` | `#ab0100` | Primary red (khabarplus1 match) |
| `--c-nav-bg` | `#0a0002` | Dark navigation |
| `--c-top-bar` | `#ab0100` | Top social bar |
| `--c-gold` | `#e6a817` | Accents, weather icon |

---

## 📞 Contact

- Email: contact@suchanacg.com
- Address: Press Complex, Raipur, CG - 492001
