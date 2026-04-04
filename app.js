/* ============================================================
   ANITA'S BAKERS — SHARED APPLICATION LOGIC
   Auth, Storage, Navigation, Utilities
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyA1bUNzmx7LWN1slI2ZblV_eqh2DdxZ2gw",
  authDomain: "anitas-bakers.firebaseapp.com",
  projectId: "anitas-bakers",
  storageBucket: "anitas-bakers.firebasestorage.app",
  messagingSenderId: "852088197591",
  appId: "1:852088197591:web:a81af0e85f95d3eeba7b92",
};
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;
const auth = typeof firebase !== 'undefined' && firebase.auth ? firebase.auth() : null;

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js').catch(err => console.log('SW setup failed: ', err));
  });
}

const APP = {
  // Config
  ADMIN_PASS: 'anita2024',
  WHATSAPP_NUM: '919595997500',
  SHOP_NAME: "Anita's Bakers",
  SHOP_TAGLINE: '100% Pure Vegetarian',

  // Storage keys
  KEYS: {
    adminAuth: 'ab_admin_logged_in',
    userInfo: 'ab_user_info',
    production: 'ab_daily_production',
    sales: 'ab_sales_log',
    orders: 'ab_custom_orders',
    reviews: 'ab_reviews',
    reminders: 'ab_reminders',
    offers: 'ab_offers',
    products: 'ab_products_list',
  },

  // Default Product catalog
  DEFAULT_PRODUCTS: [
    { id: 'bread30', name: '🍞 Bread (30)', price: '₹30', cat: 'bread', img: '../img/bread_lux.png' },
    { id: 'bread40', name: '🍞 Bread (40)', price: '₹40', cat: 'bread', img: '../img/bread_lux.png' },
    { id: 'biscuit', name: '🫓 Biscuit', price: '₹50', cat: 'snacks', img: '../img/biscuit_lux.png' },
    { id: 'khari', name: '🥐 Khari', price: '₹60', cat: 'snacks', img: '../img/khari_lux.png' },
    { id: 'toast20', name: '🍞 Toast (20)', price: '₹20', cat: 'bread', img: '../img/toast_lux.png' },
    { id: 'toast40', name: '🍞 Toast (40)', price: '₹40', cat: 'bread', img: '../img/toast_lux.png' },
    { id: 'pav30', name: '🍞 Pav Ladi (30)', price: '₹30', cat: 'bread', img: '../img/pav_lux.png' },
    { id: 'pav40', name: '🍞 Pav Ladi (40)', price: '₹40', cat: 'bread', img: '../img/pav_lux.png' },
    { id: 'pastry', name: '🧁 Pastry', price: '₹30', cat: 'cakes', img: '../img/pastry_lux.png' },
    { id: 'mava', name: '🍰 Mava Cake', price: '₹125', cat: 'cakes', img: '../img/mava_lux.png' },
    { id: 'chocolate', name: '🎂 Chocolate Cake', price: '₹250', cat: 'cakes', img: '../img/chocolate_lux.png' },
    { id: 'strawberry', name: '🎂 Strawberry Cake', price: '₹200', cat: 'cakes', img: '../img/strawberry_lux.png' },
    { id: 'blueberry', name: '🎂 Blueberry Cake', price: '₹200', cat: 'cakes', img: '../img/blueberry_lux.png' },
    { id: 'pineapple', name: '🎂 Pineapple Cake', price: '₹200', cat: 'cakes', img: '../img/pineapple_lux.png' },
    { id: 'blackforest', name: '🎂 Black Forest', price: '₹200', cat: 'cakes', img: '../img/blackforest_lux.png' },
    { id: 'mixfruit', name: '🎂 Mix Fruit Cake', price: '₹250', cat: 'cakes', img: '../img/mixfruit_lux.png' },
    { id: 'redvelvet', name: '🎂 Red Velvet', price: '₹300', cat: 'cakes', img: '../img/redvelvet_lux.png' },
    { id: 'rasmalai', name: '🎂 Rasmalai Cake', price: '₹300', cat: 'cakes', img: '../img/rasmalai_lux.png' },
  ],

  // ── Storage Helpers ──
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  load(key, fallback = null) {
    try {
      const d = localStorage.getItem(key);
      return d ? JSON.parse(d) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  // ── Auth ──
  // Check auth synchronously via localStorage flag (fast UI updates), 
  // actual secure checks happen on Firestore automatically based on rules.
  isAdminLoggedIn() {
    return this.load(this.KEYS.adminAuth) === true;
  },

  async adminLogin(email, pass) {
    if(!auth) return false;
    try {
      await auth.signInWithEmailAndPassword(email, pass);
      this.save(this.KEYS.adminAuth, true);
      return true;
    } catch(e) {
      console.error("Login failed:", e);
      return false;
    }
  },

  async adminLogout() {
    if(auth) await auth.signOut();
    localStorage.removeItem(this.KEYS.adminAuth);
    window.location.href = 'login.html';
  },

  getUserInfo() {
    return this.load(this.KEYS.userInfo, null);
  },

  userLogin(name, phone) {
    this.save(this.KEYS.userInfo, { name, phone, loginAt: new Date().toISOString() });
    return true;
  },

  userLogout() {
    localStorage.removeItem(this.KEYS.userInfo);
    window.location.href = 'login.html';
  },

  // ── Date Helpers ──
  today() {
    return new Date().toISOString().split('T')[0];
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },

  // ── Production ──
  getProduction(date) {
    const all = this.load(this.KEYS.production, []);
    return all.find(p => p.date === date) || null;
  },

  saveProduction(date, items) {
    const all = this.load(this.KEYS.production, []);
    const idx = all.findIndex(p => p.date === date);
    const entry = { date, items, updatedAt: new Date().toISOString() };
    if (idx >= 0) all[idx] = entry;
    else all.push(entry);
    this.save(this.KEYS.production, all);
  },

  // ── Sales ──
  async getSales(date) {
    if(!db) return [];
    try {
      const snap = await db.collection('sales').where('date', '==', date).get();
      return snap.docs.map(d => ({ dbId: d.id, ...d.data() }));
    } catch(e) { console.error(e); return []; }
  },

  async getAllSales() {
    if(!db) return [];
    try {
      const snap = await db.collection('sales').get();
      return snap.docs.map(d => d.data());
    } catch(e) { return []; }
  },

  async addSale(item, qty, amount, date) {
    if(!db) return;
    await db.collection('sales').add({
      id: Date.now(), item, qty: Number(qty), amount: Number(amount), date: date || this.today(), createdAt: new Date().toISOString()
    });
  },

  async deleteSale(dbId) {
    if(!db) return;
    await db.collection('sales').doc(String(dbId)).delete();
  },

  // ── Products ──
  async getProducts() {
    if(!db) return this.DEFAULT_PRODUCTS;
    try {
      const snap = await db.collection('products').get();
      if (snap.empty) {
        const batch = db.batch();
        this.DEFAULT_PRODUCTS.forEach(p => {
          batch.set(db.collection('products').doc(p.id), p);
        });
        await batch.commit();
        return this.DEFAULT_PRODUCTS;
      }
      return snap.docs.map(doc => doc.data());
    } catch(e) { console.error(e); return this.DEFAULT_PRODUCTS; }
  },

  async addProduct(name, price, cat) {
    if(!db) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '') + Date.now();
    await db.collection('products').doc(id).set({
      id, name, cat,
      price: price.includes('₹') ? price : '₹' + price,
      img: 'https://images.unsplash.com/photo-1551404973-7bb6af23ff60?auto=format&fit=crop&w=400&q=80'
    });
  },

  async deleteProduct(id) {
    if(!db) return;
    await db.collection('products').doc(String(id)).delete();
  },

  // ── Orders ──
  async getOrders() {
    if(!db) return [];
    try {
      const snap = await db.collection('orders').get();
      return snap.docs.map(d => ({ dbId: d.id, ...d.data() }));
    } catch(e) { return []; }
  },

  async addOrder(order) {
    if(!db) return;
    order.id = Date.now();
    order.status = 'pending';
    order.createdAt = new Date().toISOString();
    await db.collection('orders').add(order);
  },

  async updateOrderStatus(dbId, status) {
    if(!db) return;
    await db.collection('orders').doc(String(dbId)).update({ status });
  },

  async deleteOrder(dbId) {
    if(!db) return;
    await db.collection('orders').doc(String(dbId)).delete();
  },

  // ── Reviews ──
  async getReviews() {
    if(!db) return [];
    try {
      const snap = await db.collection('reviews').orderBy('createdAt', 'desc').get();
      return snap.docs.map(d => ({ dbId: d.id, ...d.data() }));
    } catch(e) { console.error('Error fetching reviews:', e); return []; }
  },

  async addReview(name, text, rating) {
    if(!db) return;
    await db.collection('reviews').add({
      id: Date.now(), name, text, rating: Number(rating), date: this.today(), createdAt: new Date().toISOString()
    });
  },

  // ── Reminders ──
  getReminders() {
    return this.load(this.KEYS.reminders, []);
  },

  addReminder(text, date) {
    const all = this.load(this.KEYS.reminders, []);
    all.push({ id: Date.now(), text, date: date || this.today(), done: false });
    this.save(this.KEYS.reminders, all);
  },

  toggleReminder(id) {
    const all = this.load(this.KEYS.reminders, []);
    const r = all.find(x => x.id === id);
    if (r) r.done = !r.done;
    this.save(this.KEYS.reminders, all);
  },

  deleteReminder(id) {
    let all = this.load(this.KEYS.reminders, []);
    all = all.filter(r => r.id !== id);
    this.save(this.KEYS.reminders, all);
  },

  // ── Offers ──
  getOffers() {
    return this.load(this.KEYS.offers, [
      { id: 1, title: '🎉 Weekend Special!', desc: 'Buy 2 cakes, get 15% off on the third!', active: true },
      { id: 2, title: '🌿 Festival Offer', desc: 'Special discounts on bulk orders for festivals and celebrations.', active: true },
    ]);
  },

  // ── WhatsApp Helpers ──
  whatsappLink(message) {
    return `https://wa.me/${this.WHATSAPP_NUM}?text=${encodeURIComponent(message)}`;
  },

  async shareMenuViaWhatsApp() {
    let msg = `🌿 *${this.SHOP_NAME}* - ${this.SHOP_TAGLINE}\n\n📋 *Our Menu:*\n\n`;
    const prods = await this.getProducts();
    prods.forEach(p => {
      msg += `${p.name} — ${p.price}\n`;
    });
    msg += `\n📞 Order: +91 9595997500\n📍 दत्त मंदिर जवळ नरसिंहपुर, Islampur`;
    window.open(this.whatsappLink(msg), '_blank');
  },

  orderViaWhatsApp(itemName, details) {
    const msg = `🛒 *New Order - ${this.SHOP_NAME}*\n\n📦 Item: ${itemName}\n${details}\n\nPlease confirm availability! 🙏`;
    window.open(this.whatsappLink(msg), '_blank');
  },

  // ── Bill Generator ──
  generateBill(items) {
    // items = [{name, qty, price, total}]
    let bill = `╔══════════════════════════════╗\n`;
    bill += `║     🌿 ${this.SHOP_NAME}        ║\n`;
    bill += `║   ${this.SHOP_TAGLINE}   ║\n`;
    bill += `╠══════════════════════════════╣\n`;
    bill += `║ Date: ${this.formatDate(this.today())}       ║\n`;
    bill += `╠══════════════════════════════╣\n`;

    let grandTotal = 0;
    items.forEach(item => {
      bill += `║ ${item.name}\n`;
      bill += `║   ${item.qty} × ₹${item.price} = ₹${item.total}\n`;
      grandTotal += item.total;
    });

    bill += `╠══════════════════════════════╣\n`;
    bill += `║ TOTAL: ₹${grandTotal}               ║\n`;
    bill += `╚══════════════════════════════╝\n`;
    bill += `\n📞 +91 9595997500\n📍 Narsinghpur, Islampur\n🌿 Thank you! Visit again!`;

    return { bill, grandTotal };
  },

  // ── Weekly Sales Summary ──
  getWeeklySales() {
    const all = this.getAllSales();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const daySales = all.filter(s => s.date === dateStr);
      const total = daySales.reduce((sum, s) => sum + s.amount, 0);
      days.push({
        date: dateStr,
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        total,
        count: daySales.length,
      });
    }
    return days;
  },

  // ── Toast Notification ──
  toast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || '✅'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
};

/* ============================================================
   SHARED UI FUNCTIONS
   ============================================================ */

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Hamburger menu
function initHamburger() {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close on nav item click
  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
}

// Tabs
function initTabs(container) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;

  const btns = el.querySelectorAll('.tab-btn');
  const contents = el.querySelectorAll('.tab-content');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const panel = el.querySelector(`#${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Build shared header HTML
function buildHeader(activePage) {
  const pages = [
    { href: 'home.html', icon: '', label: 'HOME', id: 'home' },
    { href: 'menu.html', icon: '', label: 'MENU', id: 'menu' },
    { href: 'about.html', icon: '', label: 'ABOUT', id: 'about' },
    { href: 'contact.html', icon: '', label: 'CONTACT', id: 'contact' },
  ];

  const user = APP.getUserInfo();
  const isAdmin = APP.isAdminLoggedIn();

  let navExtra = '';
  if (isAdmin) {
    navExtra = `<a href="admin.html" class="nav-item ${activePage === 'admin' ? 'active' : ''}"><span>DASHBOARD</span></a>`;
  } else if (user) {
    navExtra = `<a href="user-dashboard.html" class="nav-item ${activePage === 'user-dashboard' ? 'active' : ''}"><span>MY PORTAL</span></a>`;
  } else {
    navExtra = `<a href="login.html" class="nav-item"><span>LOGIN</span></a>`;
  }

  const navItems = pages.map(p =>
    `<a href="${p.href}" class="nav-item ${activePage === p.id ? 'active' : ''}"><span>${p.label}</span></a>`
  ).join('') + navExtra;

  return `
  <header class="site-header">
    <a href="home.html" class="logo-wrap" aria-label="Anita's Bakers home" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
      <div style="font-family: var(--font-display); font-size: 2.4rem; line-height: 0.8; background: linear-gradient(135deg, #FFDF73, #B8860B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); padding-bottom: 5px;">
        A
      </div>
      <div class="brand-info" style="display: flex; flex-direction: column; justify-content: center;">
        <div style="font-family: var(--font-primary); font-size: 1.15rem; font-weight: 700; letter-spacing: 2px; color: var(--gold-light); text-transform: uppercase; line-height: 1;">
          Anita's <span style="font-weight: 300; color: #fff;">Bakers</span>
        </div>
        <div style="font-size: 0.65rem; color: #4ade80; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; margin-top: 3px; display: flex; align-items: center; gap: 4px;">
          <span style="font-size:0.5rem">✦</span> Pure Vegetarian
        </div>
      </div>
    </a>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      ☰
    </button>
    <nav class="main-nav" aria-label="Main navigation">
      ${navItems}
    </nav>
  </header>`;
}

// Build shared footer HTML
function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-brand">Anita's Bakers</div>
    <div class="footer-veg">🌿 100% Pure Vegetarian Excellence • Since 2024</div>
    <div class="footer-links">
      <a href="home.html">Home</a>
      <a href="menu.html">Menu</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="login.html">Login</a>
    </div>
    <div class="footer-copy">
      © ${new Date().getFullYear()} Anita's Bakers. All rights reserved. | दत्त मंदिर जवळ, नरसिंहपुर, Ishwarpur<br>
      <span style="font-size: 0.75rem; color: rgba(255,255,255,0.3); letter-spacing: 1px; display: inline-block; margin-top: 8px;">Designed & Developed by Pranav</span>
    </div>
  </footer>
  <a href="https://wa.me/${APP.WHATSAPP_NUM}" class="fab-whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="WhatsApp us!">
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
    </svg>
  </a>`;
}

// Init shared components
function initShared(activePage) {
  // Inject header if placeholder exists
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    headerSlot.outerHTML = buildHeader(activePage);
  }

  // Inject footer if placeholder exists
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.outerHTML = buildFooter();
  }

  initHeaderScroll();
  initHamburger();
  initScrollAnimations();
}

// DOM ready helper
function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
