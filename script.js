'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JAYA'S ORGANIC — Production JavaScript
// Architecture: Module Pattern + Event-Driven Observer + State Machine
// Engineer: Senior-level, Amazon Ecommerce Standards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── GLOBAL CONFIG ─────────────────────────────────────────────────────────────
const CONFIG = {
  WHATSAPP_NUMBER: '919600572691',
  CURRENCY: '₹',
  FREE_DELIVERY_THRESHOLD: 500,
  DELIVERY_CHARGE: 50,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  PINCODES: {
    '600001': { area: 'Chennai Parrys',    type: 'same-day',  time: '2–3 hrs' },
    '600002': { area: 'Chennai Fort',      type: 'same-day',  time: '2–3 hrs' },
    '600017': { area: 'T. Nagar',          type: 'same-day',  time: '1–2 hrs' },
    '600020': { area: 'Adyar',             type: 'same-day',  time: '1–2 hrs' },
    '600042': { area: 'Velachery',         type: 'same-day',  time: '1–2 hrs' },
    '600040': { area: 'Anna Nagar',        type: 'same-day',  time: '2–3 hrs' },
    '600004': { area: 'Mylapore',          type: 'same-day',  time: '2–3 hrs' },
    '600028': { area: 'Kodambakkam',       type: 'same-day',  time: '2–3 hrs' },
    '600045': { area: 'Tambaram',          type: 'next-day',  time: '24 hrs'  },
    '600116': { area: 'Porur',             type: 'next-day',  time: '24 hrs'  },
    '600034': { area: 'Nungambakkam',      type: 'next-day',  time: '24 hrs'  },
    '600014': { area: 'Saidapet',          type: 'next-day',  time: '24 hrs'  },
    '600086': { area: 'Pallikaranai',      type: 'next-day',  time: '24 hrs'  },
    '600100': { area: 'Perungudi',         type: 'next-day',  time: '24 hrs'  },
  }
};

// ── PRODUCT DATA ──────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'P001',
    name: 'Pirandai Thokku',
    tamilName: 'பிரண்டை தொக்கு',
    category: 'Thokku & Pickles',
    price: 180, originalPrice: 220, weight: '200g',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=350&fit=crop',
    badge: '🏆 Bestseller', badgeColor: 'red',
    description: 'Traditional Pirandai (Veldt grape) pickle with authentic Tamil spices. Known for bone-strengthening & digestive properties.',
    benefits: ['Rich in Calcium', 'Aids Digestion', 'Anti-inflammatory', 'Preservative-free'],
    ingredients: ['Pirandai (Veldt Grape)', 'Gingelly Oil', 'Mustard', 'Red Chili', 'Asafoetida', 'Salt', 'Curry Leaves'],
    shelfLife: '3 months (refrigerated)',
    rating: 4.9, reviews: 124, inStock: true, featured: true,
  },
  {
    id: 'P002',
    name: 'Idli Podi',
    tamilName: 'இட்லி பொடி',
    category: 'Podis & Powders',
    price: 120, originalPrice: 150, weight: '200g',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&h=350&fit=crop',
    badge: '🌿 Popular', badgeColor: 'green',
    description: 'Traditional gunpowder spice mix — perfect with idli, dosa and rice. Stone-ground with urad dal and aromatic spices.',
    benefits: ['High Protein', 'Rich in Iron', 'No Preservatives', 'Stone Ground'],
    ingredients: ['Urad Dal', 'Chana Dal', 'Red Chili', 'Asafoetida', 'Sesame Seeds', 'Salt', 'Curry Leaves'],
    shelfLife: '6 months',
    rating: 4.8, reviews: 98, inStock: true, featured: true,
  },
  {
    id: 'P003',
    name: 'Vallarai Podi',
    tamilName: 'வல்லாரை பொடி',
    category: 'Podis & Powders',
    price: 150, originalPrice: 180, weight: '100g',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=350&fit=crop',
    badge: '🌱 Herbal', badgeColor: 'green',
    description: 'Brahmi leaf powder — a traditional Tamil superfood known to boost memory and cognitive function.',
    benefits: ['Memory Booster', 'Brain Health', 'Anti-anxiety', 'Antioxidant Rich'],
    ingredients: ['Vallarai Keerai (Brahmi)', 'Black Pepper', 'Cumin', 'Garlic', 'Salt'],
    shelfLife: '3 months',
    rating: 4.7, reviews: 76, inStock: true, featured: true,
  },
  {
    id: 'P004',
    name: 'Karivepilai Podi',
    tamilName: 'கறிவேப்பிலை பொடி',
    category: 'Podis & Powders',
    price: 110, originalPrice: 140, weight: '100g',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=350&fit=crop',
    badge: '💚 Healthy', badgeColor: 'green',
    description: 'Fresh curry leaf powder — rich in iron and calcium. Perfect for hair health and improved digestion.',
    benefits: ['Iron Rich', 'Hair Growth', 'Improves Digestion', 'Anti-diabetic'],
    ingredients: ['Curry Leaves', 'Urad Dal', 'Red Chili', 'Asafoetida', 'Salt'],
    shelfLife: '4 months',
    rating: 4.6, reviews: 54, inStock: true, featured: false,
  },
  {
    id: 'P005',
    name: 'Manga Urugai',
    tamilName: 'மாங்காய் ஊறுகாய்',
    category: 'Thokku & Pickles',
    price: 160, originalPrice: 200, weight: '250g',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=350&fit=crop',
    badge: '🌼 Seasonal', badgeColor: 'amber',
    description: 'Traditional raw mango pickle made during peak mango season with a secret family recipe.',
    benefits: ['Vitamin C Rich', 'Probiotic', 'Appetite Stimulant', 'Traditional Recipe'],
    ingredients: ['Raw Mango', 'Gingelly Oil', 'Mustard', 'Fenugreek', 'Red Chili', 'Salt', 'Asafoetida'],
    shelfLife: '6 months',
    rating: 4.8, reviews: 88, inStock: true, featured: true,
  },
  {
    id: 'P006',
    name: 'Nellikkai Pickle',
    tamilName: 'நெல்லிக்காய் ஊறுகாய்',
    category: 'Thokku & Pickles',
    price: 140, originalPrice: 170, weight: '200g',
    image: 'https://images.unsplash.com/photo-1582726978405-e0d6fbce4ddc?w=500&h=350&fit=crop',
    badge: '🛡️ Immunity', badgeColor: 'amber',
    description: 'Amla (Indian gooseberry) pickle — a powerful immunity booster with traditional spices.',
    benefits: ['Vitamin C Powerhouse', 'Immunity Booster', 'Anti-aging', 'Liver Health'],
    ingredients: ['Amla (Gooseberry)', 'Gingelly Oil', 'Mustard', 'Red Chili', 'Turmeric', 'Salt'],
    shelfLife: '3 months (refrigerated)',
    rating: 4.7, reviews: 62, inStock: true, featured: false,
  },
  {
    id: 'P007',
    name: 'Milagu Kuzhambu Powder',
    tamilName: 'மிளகு குழம்பு பொடி',
    category: 'Masalas & Spice Mixes',
    price: 160, originalPrice: 200, weight: '200g',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&h=350&fit=crop',
    badge: '🔥 Aromatic', badgeColor: 'red',
    description: 'Ready-mix pepper curry powder. Add to tamarind water for authentic Milagu Kuzhambu in minutes.',
    benefits: ['Digestive Aid', 'Cold Relief', 'Antioxidant Rich', 'No Additives'],
    ingredients: ['Black Pepper', 'Cumin', 'Coriander', 'Red Chili', 'Turmeric', 'Curry Leaves', 'Asafoetida'],
    shelfLife: '6 months',
    rating: 4.9, reviews: 105, inStock: true, featured: true,
  },
  {
    id: 'P008',
    name: 'Mor Milagai',
    tamilName: 'மோர் மிளகாய்',
    category: 'Traditional Snacks',
    price: 90, originalPrice: 110, weight: '100g',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=350&fit=crop',
    badge: '🏺 Traditional', badgeColor: 'amber',
    description: 'Sun-dried buttermilk chili — a classic Tamil side dish and snack. Crispy golden when fried.',
    benefits: ['Probiotic', 'Low Calorie', 'Traditional', 'Sun-dried Natural'],
    ingredients: ['Green Chili', 'Buttermilk', 'Salt', 'Asafoetida'],
    shelfLife: '2 months',
    rating: 4.5, reviews: 43, inStock: true, featured: false,
  },
  {
    id: 'P009',
    name: 'Ennai Kathirikkai',
    tamilName: 'எண்ணெய் கத்திரிக்காய்',
    category: 'Thokku & Pickles',
    price: 200, originalPrice: 250, weight: '250g',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=350&fit=crop',
    badge: '👨‍🍳 Chef Special', badgeColor: 'red',
    description: 'Baby brinjal in spiced oil — authentic Chettinad-style specialty. Best with rice and curd.',
    benefits: ['Rich in Fiber', 'Antioxidant', 'Iron Rich', 'Chettinad Style'],
    ingredients: ['Baby Brinjal', 'Gingelly Oil', 'Mustard', 'Tamarind', 'Red Chili', 'Coriander', 'Cumin'],
    shelfLife: '3 months',
    rating: 4.8, reviews: 71, inStock: true, featured: true,
  },
];

// ── RECIPE DATA ───────────────────────────────────────────────────────────────
const RECIPES = [
  {
    id: 'R001', name: 'Pirandai Thokku', tamilName: 'பிரண்டை தொக்கு',
    category: 'Pickles & Preserves', cookTime: '30 mins', prepTime: '15 mins',
    servings: 20, difficulty: 'Medium', calories: 45, rating: 4.9,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=350&fit=crop',
    description: 'Traditional Pirandai pickle — a medicinal family recipe known for bone health. 3 generations old.',
    ingredients: ['250g Pirandai (cleaned)', '3 tbsp Gingelly oil', '1 tsp Mustard seeds', '1 tsp Urad dal', '8 Red chilies', '½ tsp Asafoetida', 'Salt to taste', 'Curry leaves'],
    steps: ['Clean pirandai by removing thorns and cutting into pieces', 'Grind pirandai coarsely without water', 'Heat gingelly oil, add mustard and urad dal', 'Add curry leaves, red chilies and asafoetida', 'Add ground pirandai and mix well on medium heat', 'Cook on low flame until oil separates (20–25 mins)', 'Cool completely before storing in airtight container'],
    tags: ['Medicinal', 'Traditional', 'Bone Health', 'Pickle'], productId: 'P001',
  },
  {
    id: 'R002', name: 'Traditional Sambar', tamilName: 'சாம்பார்',
    category: 'Curries & Gravies', cookTime: '40 mins', prepTime: '20 mins',
    servings: 4, difficulty: 'Easy', calories: 120, rating: 4.8,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=350&fit=crop',
    description: 'Authentic Tamil Nadu sambar with fresh vegetables. The soul of every South Indian meal.',
    ingredients: ['200g Toor dal', '200g Mixed vegetables', '2 tbsp Sambar powder', 'Lemon-sized tamarind', '1 tomato', '1 onion', 'Mustard, curry leaves', 'Salt & turmeric'],
    steps: ['Pressure cook dal with turmeric until soft', 'Extract tamarind water (1.5 cups)', 'Sauté onions, tomatoes until soft', 'Add vegetables and partially cook', 'Add tamarind water and sambar powder', 'Add cooked dal, bring to boil', 'Season with mustard, curry leaves, red chili'],
    tags: ['Classic', 'Vegan', 'Protein Rich', 'Daily Meal'],
  },
  {
    id: 'R003', name: 'Keerai Masiyal', tamilName: 'கீரை மசியல்',
    category: 'Greens & Salads', cookTime: '20 mins', prepTime: '10 mins',
    servings: 3, difficulty: 'Easy', calories: 80, rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=350&fit=crop',
    description: 'Mashed spinach curry made with traditional Tamil method. Nutritious and kids love it.',
    ingredients: ['2 bunches Spinach', '1 Small onion', '3 Garlic pods', '2 Green chilies', '½ tsp Cumin', 'Salt to taste', '1 tsp Gingelly oil'],
    steps: ['Wash and chop spinach leaves', 'Boil spinach with garlic and green chilies', 'Drain and mash coarsely', 'Sauté onions in gingelly oil', 'Add mashed spinach, mix well', 'Season with cumin and salt', 'Serve hot with rice'],
    tags: ['Iron Rich', 'Quick', 'Kids Friendly', 'Healthy'],
  },
  {
    id: 'R004', name: 'Milagu Rasam', tamilName: 'மிளகு ரசம்',
    category: 'Soups & Rasam', cookTime: '25 mins', prepTime: '10 mins',
    servings: 4, difficulty: 'Easy', calories: 60, rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=350&fit=crop',
    description: 'Traditional pepper rasam — a natural remedy for cold. Generations of Tamil families swear by this.',
    ingredients: ['2 tbsp Black pepper', '1 tsp Cumin', '4 Garlic pods', 'Tamarind (small)', '1 Tomato', 'Curry leaves', 'Salt', 'Mustard for tempering'],
    steps: ['Grind pepper, cumin, garlic coarsely', 'Extract tamarind water (2 cups)', 'Boil tamarind water with tomatoes', 'Add ground pepper-cumin paste', 'Boil 15 minutes on medium flame', 'Add salt and dilute with water if needed', 'Temper with mustard and curry leaves'],
    tags: ['Medicinal', 'Cold Remedy', 'Digestive', 'Winter Special'],
  },
  {
    id: 'R005', name: 'Paruppu Usili', tamilName: 'பருப்பு உசிலி',
    category: 'Dry Curries', cookTime: '35 mins', prepTime: '20 mins',
    servings: 4, difficulty: 'Medium', calories: 180, rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=350&fit=crop',
    description: 'Steamed lentil crumbles with vegetables — a traditional Tamil Brahmin festival dish. High in protein.',
    ingredients: ['100g Toor dal', '100g Chana dal', '4–6 Red chilies', '200g Beans', 'Curry leaves', 'Mustard, Urad dal', 'Asafoetida', 'Coconut oil'],
    steps: ['Soak dals 30 min, grind with red chilies', 'Steam dal mixture in idli plates (15 min)', 'Crumble steamed dal after cooling', 'Cook vegetables until tender', 'Heat oil, add mustard and urad dal', 'Add vegetables, then dal crumbles', 'Mix well, cook 5 min on low flame'],
    tags: ['High Protein', 'Brahmin Style', 'Traditional', 'Festival Food'],
  },
  {
    id: 'R006', name: 'Puli Kuzhambu', tamilName: 'புளி குழம்பு',
    category: 'Curries & Gravies', cookTime: '45 mins', prepTime: '15 mins',
    servings: 4, difficulty: 'Medium', calories: 140, rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=350&fit=crop',
    description: 'Classic tamarind-based curry — thick, tangy and spicy. The quintessential Tamil comfort food.',
    ingredients: ['Gooseberry-sized tamarind', '1 Onion', '2 Tomatoes', '2 tbsp Kuzhambu powder', 'Drumstick/Brinjal', 'Curry leaves', 'Sesame oil', 'Salt & turmeric'],
    steps: ['Soak tamarind and extract thick juice', 'Fry onions in sesame oil until golden', 'Add tomatoes and cook until mushy', 'Add kuzhambu powder, fry 2 min', 'Add tamarind juice and vegetables', 'Boil until thick and oil separates', 'Season with mustard and curry leaves'],
    tags: ['Tangy', 'Spicy', 'Classic', 'Rice Accompaniment'],
  },
];

// ── FEEDBACK DATA ─────────────────────────────────────────────────────────────
const FEEDBACK = [
  { name: 'Priya Sundaram',     location: 'T. Nagar, Chennai',    rating: 5, product: 'Pirandai Thokku',       review: 'The Pirandai Thokku is absolutely authentic! My mother used to make this and Jaya akka\'s version is identical. Quality of oil and freshness is unmatched!', date: '2 days ago',   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 34 },
  { name: 'Rajesh Kumar',       location: 'Adyar, Chennai',       rating: 5, product: 'Idli Podi',              review: 'Amazing Idli Podi! The spice level is perfect and it goes great with hot idlis and ghee. My whole family is hooked. Packaging is also very hygienic.', date: '5 days ago',   avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 28 },
  { name: 'Lakshmi Meenakshi', location: 'Velachery, Chennai',   rating: 5, product: 'Vallarai Podi',          review: 'The Vallarai Podi is not only tasty but very healthy. My kids started eating more rice after I started mixing this. Noticed concentration improvement too!', date: '1 week ago',  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 45 },
  { name: 'Senthil Murugan',   location: 'Anna Nagar, Chennai',  rating: 5, product: 'Milagu Kuzhambu Powder', review: 'This Milagu Kuzhambu powder is exactly like what my thatha described. Pure, no artificial taste at all. My wife makes it every Friday now.', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 22 },
  { name: 'Kavitha Rajan',     location: 'Mylapore, Chennai',    rating: 5, product: 'Manga Urugai',           review: 'The mango pickle tastes exactly like the ones from Madurai! Oil quality is exceptional and tanginess is perfect. Have already ordered twice this month.', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 38 },
  { name: 'Arun Krishnamurthy', location: 'Tambaram, Chennai',   rating: 4, product: 'Ennai Kathirikkai',      review: 'Very authentic Chettinad flavor! Rich and spicy. Packaging could be slightly better but taste is 10/10. Definitely buying the combo pack next time.', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', verified: true, helpful: 19 },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATE MANAGEMENT — Observable Store (Redux-lite)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AppState = {
  cart: [], user: null, wishlist: [],
  searchQuery: '', activeCategory: 'all', currentRating: 0,
  _listeners: {},

  on(event, cb) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(cb);
  },
  emit(event, data) { (this._listeners[event] || []).forEach(cb => cb(data)); },

  hydrate() {
    try {
      this.cart      = JSON.parse(localStorage.getItem('jaya_cart')     || '[]');
      this.user      = JSON.parse(localStorage.getItem('jaya_user')     || 'null');
      this.wishlist  = JSON.parse(localStorage.getItem('jaya_wishlist') || '[]');
    } catch(e) { console.warn('[State] Hydration failed', e); }
  },

  persist() {
    try {
      localStorage.setItem('jaya_cart',     JSON.stringify(this.cart));
      localStorage.setItem('jaya_user',     JSON.stringify(this.user));
      localStorage.setItem('jaya_wishlist', JSON.stringify(this.wishlist));
    } catch(e) { console.warn('[State] Persist failed', e); }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTIFICATION SYSTEM — Toast Queue
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Toast = {
  queue: [], active: false,

  show(message, type = 'success', duration = CONFIG.TOAST_DURATION) {
    this.queue.push({ message, type, duration });
    if (!this.active) this._next();
  },

  _next() {
    if (!this.queue.length) { this.active = false; return; }
    this.active = true;
    const { message, type, duration } = this.queue.shift();
    const palette = {
      success: 'from-green-500 to-emerald-600',
      error:   'from-red-500 to-rose-600',
      warning: 'from-amber-500 to-orange-500',
      info:    'from-blue-500 to-indigo-600',
    };
    const el = document.createElement('div');
    el.className = `fixed top-24 right-4 z-[9999] max-w-xs w-full bg-gradient-to-r ${palette[type] || palette.success} text-white px-5 py-4 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-3 translate-x-full transition-transform duration-500`;
    el.innerHTML = `<span class="text-lg flex-shrink-0">${type==='success'?'✅':type==='error'?'❌':type==='warning'?'⚠️':'ℹ️'}</span><span>${message}</span>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)';
      setTimeout(() => {
        el.style.transform = 'translateX(200%)';
        setTimeout(() => { el.remove(); this._next(); }, 500);
      }, duration);
    });
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODAL MANAGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  },
  close(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('hidden'); document.body.style.overflow = ''; }
  },
  closeAll() {
    ['recipe-modal','cart-modal','auth-modal','review-modal','profile-modal','order-confirmation-modal']
      .forEach(id => this.close(id));
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CART MANAGER — Full e-commerce cart logic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CartManager = {
  add(product, qty = 1) {
    if (!product || !product.id) return;
    const existing = AppState.cart.find(i => i.id === product.id);
    if (existing) { existing.quantity += qty; }
    else { AppState.cart.push({ ...product, quantity: qty }); }
    AppState.persist();
    this._updateCountBadges();
    Toast.show(`🛒 ${product.name} added!`, 'success');
    // Cross-tab sync
    if (window._cartChannel) window._cartChannel.postMessage({ type: 'CART_UPDATE', cart: AppState.cart });
  },

  remove(id) {
    AppState.cart = AppState.cart.filter(i => i.id !== id);
    AppState.persist();
    this._updateCountBadges();
    this._renderItems();
  },

  updateQty(id, qty) {
    if (qty <= 0) { this.remove(id); return; }
    const item = AppState.cart.find(i => i.id === id);
    if (item) { item.quantity = qty; AppState.persist(); this._updateCountBadges(); this._renderItems(); }
  },

  subtotal() { return AppState.cart.reduce((s, i) => s + i.price * i.quantity, 0); },
  delivery() { const s = this.subtotal(); return s === 0 ? 0 : s >= CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : CONFIG.DELIVERY_CHARGE; },
  grandTotal() { return this.subtotal() + this.delivery(); },
  count() { return AppState.cart.reduce((s, i) => s + i.quantity, 0); },
  clear() { AppState.cart = []; AppState.persist(); this._updateCountBadges(); this._renderItems(); },

  _updateCountBadges() {
    const n = this.count();
    ['cart-count','cart-count-mobile','sticky-cart-count'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = n;
      el.classList.toggle('hidden', n === 0);
    });
  },

  _renderItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (!AppState.cart.length) {
      container.innerHTML = `<div class="text-center py-12"><div class="text-6xl mb-4">🛒</div><p class="text-gray-500 text-lg font-semibold">Your cart is empty</p><p class="text-gray-400 text-sm mt-1">Add some delicious products!</p></div>`;
    } else {
      container.innerHTML = AppState.cart.map(item => `
        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-gray-900 text-sm truncate">${item.name}</h4>
            <p class="text-xs text-gray-400">${item.weight || ''}</p>
            <p class="text-green-600 font-bold text-sm">${CONFIG.CURRENCY}${item.price}</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button onclick="CartManager.updateQty('${item.id}',${item.quantity-1})" class="w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors flex items-center justify-center text-lg leading-none">−</button>
            <span class="w-6 text-center font-bold text-gray-900 text-sm">${item.quantity}</span>
            <button onclick="CartManager.updateQty('${item.id}',${item.quantity+1})" class="w-7 h-7 rounded-full bg-green-100 text-green-600 font-bold hover:bg-green-200 transition-colors flex items-center justify-center text-lg leading-none">+</button>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="font-black text-gray-900 text-sm">${CONFIG.CURRENCY}${item.price * item.quantity}</p>
            <button onclick="CartManager.remove('${item.id}')" class="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors">✕ Remove</button>
          </div>
        </div>`).join('');
    }

    const totalEl = document.getElementById('cart-total');
    if (totalEl) {
      const d = this.delivery();
      totalEl.innerHTML = `
        <div class="text-right space-y-1">
          <div class="text-sm text-gray-500">Subtotal: ${CONFIG.CURRENCY}${this.subtotal()}</div>
          <div class="text-sm font-medium ${d===0?'text-green-600':'text-gray-500'}">
            Delivery: ${d===0?'🎉 FREE':'${CONFIG.CURRENCY}'+d}
          </div>
          ${d===0?'':'<div class="text-xs text-green-500">Add ₹'+(CONFIG.FREE_DELIVERY_THRESHOLD-this.subtotal())+' more for FREE delivery!</div>'}
          <div class="text-2xl font-black text-gray-900">${CONFIG.CURRENCY}${this.grandTotal()}</div>
        </div>`;
    }
  },

  buildWAMessage() {
    const lines = AppState.cart.map(i => `• ${i.name} (${i.weight||''}) ×${i.quantity} = ₹${i.price*i.quantity}`).join('\n');
    const d = this.delivery();
    return encodeURIComponent(
      `🛒 *Order — Jaya's Organic*\n\n${lines}\n\n` +
      `Subtotal: ₹${this.subtotal()}\nDelivery: ${d===0?'FREE':'₹'+d}\n*Total: ₹${this.grandTotal()}*\n\n` +
      `📍 Delivery address:\n🕐 Preferred time:`
    );
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WISHLIST MANAGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Wishlist = {
  toggle(product) {
    const idx = AppState.wishlist.findIndex(i => i.id === product.id);
    if (idx > -1) { AppState.wishlist.splice(idx,1); Toast.show('💔 Removed from wishlist','info'); }
    else          { AppState.wishlist.push(product);  Toast.show('❤️ Added to wishlist!','success'); }
    AppState.persist();
    this._sync();
  },
  has(id) { return AppState.wishlist.some(i => i.id === id); },
  _sync() {
    document.querySelectorAll('[data-wl-id]').forEach(btn => {
      btn.textContent = this.has(btn.dataset.wlId) ? '❤️' : '🤍';
    });
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SEARCH ENGINE — Fuzzy search with debounce
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Search = {
  _timer: null,
  run(query, items, keys) {
    if (!query || !query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(item =>
      keys.some(k => {
        const v = item[k];
        if (typeof v === 'string') return v.toLowerCase().includes(q);
        if (Array.isArray(v))     return v.some(s => s.toLowerCase().includes(q));
        return false;
      })
    );
  },
  debounce(fn) {
    clearTimeout(this._timer);
    this._timer = setTimeout(fn, CONFIG.DEBOUNCE_DELAY);
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI RENDERER — All rendering logic
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const UI = {
  skeleton(id, n=3) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = Array(n).fill(0).map(()=>`
      <div class="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
        <div class="bg-gray-200 h-52"></div>
        <div class="p-6 space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
          <div class="h-3 bg-gray-200 rounded w-4/5"></div>
          <div class="h-10 bg-gray-200 rounded-2xl mt-4"></div>
        </div>
      </div>`).join('');
  },

  products(list = PRODUCTS) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="col-span-3 text-center py-20"><div class="text-6xl mb-4">🔍</div><p class="text-xl text-gray-500">No products found</p></div>`;
      return;
    }
    grid.innerHTML = list.map(p => this._productCard(p)).join('');
    Wishlist._sync();
  },

  _productCard(p) {
    const disc = p.originalPrice ? Math.round((1-p.price/p.originalPrice)*100) : 0;
    const bc   = { red:'bg-red-500', green:'bg-green-500', amber:'bg-amber-500' };
    const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5-Math.floor(p.rating));
    const wl   = Wishlist.has(p.id);
    // Safely encode product for onclick attribute
    const pJson = JSON.stringify(p).replace(/'/g, "\\'");
    return `
      <div class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col">
        <div class="relative overflow-hidden h-52">
          <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          ${p.badge?`<span class="absolute top-3 left-3 ${bc[p.badgeColor]||'bg-gray-500'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">${p.badge}</span>`:''}
          ${disc>0?`<span class="absolute top-3 right-14 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">${disc}% OFF</span>`:''}
          <button onclick="Wishlist.toggle(JSON.parse(this.dataset.p))" data-p='${pJson.replace(/'/g,"&#39;")}' data-wl-id="${p.id}"
            class="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-lg">
            ${wl?'❤️':'🤍'}
          </button>
          ${!p.inStock?'<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="bg-white text-gray-800 font-bold px-4 py-2 rounded-full">Out of Stock</span></div>':''}
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 group-hover:text-red-600 transition-colors truncate">${p.name}</h3>
              <p class="text-xs text-gray-400 font-tamil">${p.tamilName||''}</p>
            </div>
            <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg flex-shrink-0">${p.weight}</span>
          </div>
          <p class="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">${p.description}</p>
          <div class="flex flex-wrap gap-1 mb-3">
            ${(p.benefits||[]).slice(0,3).map(b=>`<span class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">${b}</span>`).join('')}
          </div>
          <div class="flex items-center gap-1 mb-3">
            <span class="text-amber-400 text-sm">${stars}</span>
            <span class="text-xs font-bold text-gray-700 ml-1">${p.rating}</span>
            <span class="text-xs text-gray-400">(${p.reviews})</span>
          </div>
          <div class="flex items-center justify-between mb-4 mt-auto">
            <div>
              <span class="text-xl font-black text-gray-900">${CONFIG.CURRENCY}${p.price}</span>
              ${p.originalPrice?`<span class="text-xs text-gray-400 line-through ml-1">${CONFIG.CURRENCY}${p.originalPrice}</span>`:''}
            </div>
            <span class="text-xs text-gray-400">📦 ${p.shelfLife||''}</span>
          </div>
          <div class="flex gap-2">
            <button onclick='CartManager.add(${pJson})' ${!p.inStock?'disabled':''} class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 px-3 rounded-2xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all disabled:opacity-40 disabled:pointer-events-none">
              🛒 Add to Cart
            </button>
            <button onclick='_waOrder(${pJson})' class="w-10 h-10 bg-green-100 text-green-700 rounded-2xl font-semibold text-sm hover:bg-green-200 transition-colors flex items-center justify-center flex-shrink-0" title="Order via WhatsApp">
              📱
            </button>
          </div>
        </div>
      </div>`;
  },

  recipes(list = RECIPES) {
    const grid = document.getElementById('recipe-grid');
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="col-span-3 text-center py-20"><div class="text-6xl mb-4">🍽️</div><p class="text-xl text-gray-500">No recipes found</p></div>`;
      return;
    }
    grid.innerHTML = list.map(r => this._recipeCard(r)).join('');
  },

  _recipeCard(r) {
    const diffColor = {Easy:'bg-green-100 text-green-700', Medium:'bg-amber-100 text-amber-700', Hard:'bg-red-100 text-red-700'};
    return `
      <div onclick="openRecipe('${r.id}')" class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
        <div class="relative overflow-hidden h-48">
          <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div class="absolute bottom-3 left-4 right-4">
            <span class="text-xs font-medium text-white/70 uppercase tracking-wide">${r.category}</span>
            <h3 class="text-lg font-black text-white">${r.name}</h3>
            <p class="text-sm text-white/70 font-tamil">${r.tamilName}</p>
          </div>
          <div class="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
            <span class="text-amber-300 text-xs font-bold">★ ${r.rating}</span>
          </div>
        </div>
        <div class="p-5">
          <p class="text-gray-500 text-xs mb-3 line-clamp-2">${r.description}</p>
          <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>🕐 ${r.cookTime}</span>
            <span class="px-2 py-0.5 rounded-full text-xs ${diffColor[r.difficulty]||'bg-gray-100 text-gray-600'}">${r.difficulty}</span>
            <span>👥 ${r.servings}</span>
            <span>🔥 ${r.calories} cal</span>
          </div>
          <div class="flex flex-wrap gap-1 mb-3">
            ${(r.tags||[]).map(t=>`<span class="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">${t}</span>`).join('')}
          </div>
          <button class="w-full bg-gradient-to-r from-red-500 to-amber-500 text-white py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
            📖 View Full Recipe
          </button>
        </div>
      </div>`;
  },

  feedback() {
    const grid = document.getElementById('feedback-grid');
    if (!grid) return;
    grid.innerHTML = FEEDBACK.map(f => `
      <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <img src="${f.avatar}" alt="${f.name}" class="w-11 h-11 rounded-full border-2 border-amber-200 object-cover">
            <div>
              <h4 class="font-bold text-gray-900 text-sm flex items-center gap-1">
                ${f.name}${f.verified?'<span class="text-blue-500 text-xs">✓</span>':''}
              </h4>
              <p class="text-xs text-gray-400">${f.location}</p>
            </div>
          </div>
          <span class="text-xs text-gray-300">${f.date}</span>
        </div>
        <div class="flex items-center gap-0.5 mb-2">
          ${'★'.repeat(f.rating).split('').map(()=>'<span class="text-amber-400">★</span>').join('')}
          ${'★'.repeat(5-f.rating).split('').map(()=>'<span class="text-gray-200">★</span>').join('')}
        </div>
        <span class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100 mb-3 inline-block">📦 ${f.product}</span>
        <p class="text-gray-600 text-sm leading-relaxed line-clamp-4">"${f.review}"</p>
        <div class="mt-4 flex items-center justify-between text-xs text-gray-400">
          <button onclick="this.innerHTML='👍 Helpful (${f.helpful+1})';this.disabled=true;this.classList.add('text-green-500')" class="hover:text-green-500 transition-colors">👍 Helpful (${f.helpful})</button>
          ${f.verified?'<span class="text-blue-400">✅ Verified</span>':''}
        </div>
      </div>`).join('');
  },

  categoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    const cats = ['all', ...new Set(RECIPES.map(r => r.category))];
    container.innerHTML = cats.map(cat => `
      <button class="filter-chip px-7 py-3.5 bg-white border-2 border-neutral-200 rounded-2xl font-semibold text-neutral-700 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all shadow-md hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5 ${AppState.activeCategory===cat?'border-red-500 bg-red-50 text-red-700':''}"
        data-category="${cat}" onclick="filterByCategory('${cat}')">
        ${cat==='all'?'✨ All Recipes':cat}
      </button>`).join('');
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL FUNCTIONS — HTML onclick handlers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Cart
function openCart()   { CartManager._renderItems(); Modal.open('cart-modal'); }
function closeCart()  { Modal.close('cart-modal'); }
function checkoutCart() {
  if (!AppState.cart.length) { Toast.show('🛒 Cart is empty!','warning'); return; }
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${CartManager.buildWAMessage()}`,'_blank');
}
function _waOrder(product) {
  const msg = encodeURIComponent(`🛒 Hi Jaya's Organic!\n\nI'd like to order:\n• *${product.name}* (${product.weight}) — ₹${product.price}\n\nPlease confirm & share delivery time. 🙏`);
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`,'_blank');
}

// Recipes
function applyFilters() {
  const q   = document.getElementById('recipe-search')?.value || '';
  let   res = Search.run(q, RECIPES, ['name','tamilName','description','tags','ingredients','category']);
  if (AppState.activeCategory !== 'all') res = res.filter(r => r.category === AppState.activeCategory);
  UI.recipes(res);
}
function filterByCategory(cat) {
  AppState.activeCategory = cat;
  document.querySelectorAll('.filter-chip').forEach(btn => {
    const active = btn.dataset.category === cat;
    btn.classList.toggle('border-red-500', active);
    btn.classList.toggle('bg-red-50', active);
    btn.classList.toggle('text-red-700', active);
    btn.classList.toggle('border-neutral-200', !active);
  });
  applyFilters();
}

function openRecipe(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;
  const linked = r.productId ? PRODUCTS.find(p => p.id === r.productId) : null;
  const dc     = { Easy:'bg-green-100 text-green-700', Medium:'bg-amber-100 text-amber-700', Hard:'bg-red-100 text-red-700' };
  const lp     = linked ? JSON.stringify(linked).replace(/'/g, "\\'") : null;

  document.getElementById('modal-content').innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <img src="${r.image}" alt="${r.name}" class="w-full h-64 object-cover rounded-2xl shadow-xl mb-5">
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-red-50 rounded-xl p-3 text-center"><div class="font-black text-red-600">${r.prepTime}</div><div class="text-xs text-gray-500">Prep</div></div>
          <div class="bg-green-50 rounded-xl p-3 text-center"><div class="font-black text-green-600">${r.cookTime}</div><div class="text-xs text-gray-500">Cook</div></div>
          <div class="bg-amber-50 rounded-xl p-3 text-center"><div class="font-black text-amber-600">${r.servings}</div><div class="text-xs text-gray-500">Servings</div></div>
          <div class="bg-blue-50 rounded-xl p-3 text-center"><div class="font-black text-blue-600">${r.calories}</div><div class="text-xs text-gray-500">Calories</div></div>
        </div>
        ${linked ? `<div class="p-4 bg-green-50 rounded-2xl border-2 border-green-200">
          <p class="text-xs font-bold text-green-700 mb-2">🛒 Don't want to cook? Buy ready-made!</p>
          <div class="flex items-center justify-between">
            <div><p class="font-bold text-sm text-gray-900">${linked.name}</p><p class="text-green-600 font-bold">${CONFIG.CURRENCY}${linked.price}</p></div>
            <button onclick='CartManager.add(${lp})' class="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors">Add to Cart</button>
          </div>
        </div>` : ''}
      </div>
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs uppercase tracking-wide text-amber-600 font-semibold">${r.category}</span>
          <span class="text-xs px-2 py-0.5 rounded-full ${dc[r.difficulty]||'bg-gray-100 text-gray-600'}">${r.difficulty}</span>
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-0.5">${r.name}</h2>
        <p class="text-lg text-gray-400 font-tamil mb-3">${r.tamilName}</p>
        <p class="text-gray-600 text-sm leading-relaxed mb-5">${r.description}</p>

        <h3 class="text-lg font-bold mb-2">🥘 Ingredients</h3>
        <ul class="space-y-1.5 mb-5">
          ${r.ingredients.map(i=>`<li class="flex items-center gap-2 text-sm text-gray-700"><span class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>${i}</li>`).join('')}
        </ul>

        <h3 class="text-lg font-bold mb-2">👩‍🍳 Method</h3>
        <ol class="space-y-2.5 mb-5">
          ${r.steps.map((s,i)=>`<li class="flex gap-3"><span class="w-6 h-6 bg-gradient-to-br from-red-500 to-amber-500 text-white text-xs font-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">${i+1}</span><p class="text-sm text-gray-700 leading-relaxed">${s}</p></li>`).join('')}
        </ol>

        <div class="flex gap-3">
          <button onclick="shareRecipe('${r.id}')" class="flex-1 border-2 border-gray-200 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">📤 Share</button>
          <button onclick="saveRecipe('${r.id}')" class="px-5 py-2.5 bg-amber-100 text-amber-700 rounded-xl font-semibold text-sm hover:bg-amber-200 transition-colors">🔖 Save</button>
        </div>
      </div>
    </div>`;
  Modal.open('recipe-modal');
}

function shareRecipe(id) {
  const r = RECIPES.find(x=>x.id===id);
  if (!r) return;
  if (navigator.share) {
    navigator.share({ title: r.name, text: `Try this authentic Tamil recipe: ${r.name}`, url: location.href });
  } else {
    navigator.clipboard.writeText(location.href);
    Toast.show('🔗 Link copied!','success');
  }
}
function saveRecipe(id) {
  const saved = JSON.parse(localStorage.getItem('jaya_saved_recipes')||'[]');
  if (!saved.includes(id)) { saved.push(id); localStorage.setItem('jaya_saved_recipes',JSON.stringify(saved)); Toast.show('🔖 Recipe saved!','success'); }
  else Toast.show('✅ Already saved!','info');
}

// Pincode check
function checkPincode() {
  const pin    = document.getElementById('pincode-input')?.value?.trim() || '';
  const result = document.getElementById('delivery-result');
  if (!result) return;
  if (!/^\d{6}$/.test(pin)) { result.innerHTML = '<span class="text-red-500 font-medium">❌ Please enter a valid 6-digit pincode</span>'; return; }
  const info = CONFIG.PINCODES[pin];
  if (info) {
    const color = info.type==='same-day' ? 'text-green-600' : 'text-blue-600';
    const label = info.type==='same-day' ? '🚀 Same Day' : '📅 Next Day';
    result.innerHTML = `<span class="${color} font-medium">✅ <strong>${info.area}</strong> — ${label} delivery (${info.time})</span>`;
  } else {
    result.innerHTML = `<span class="text-amber-600 font-medium">📞 Not in list. <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Can+you+deliver+to+pincode+${pin}?" target="_blank" class="underline font-bold hover:text-amber-800">WhatsApp us</a> to check availability.</span>`;
  }
}

// Special offers
function addComboToCart() {
  CartManager.add({ id:'COMBO001', name:'Any 3 Podis Combo', tamilName:'கொம்போ ஆபர்', price:500, originalPrice:600, weight:'3×200g', image:'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', category:'Combos', description:'Choose any 3 podi varieties', inStock:true });
}
function addHamperToCart() {
  CartManager.add({ id:'HAMPER001', name:'Pongal Special Hamper', tamilName:'பொங்கல் ஹேம்பர்', price:850, originalPrice:1050, weight:'5 items', image:'https://images.unsplash.com/photo-1605522324831-8ee31d31a0c6?w=400', category:'Hampers', description:'Traditional gift box with 5 premium items', inStock:true });
}
function showBulkOptions() {
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Jaya's Organic! I'd like to know about bulk order discounts (1kg+). Please share details 🙏")}`,'_blank');
}

// Auth
function handleProfileClick() {
  if (AppState.user) { _syncProfileUI(); Modal.open('profile-modal'); }
  else               { Modal.open('auth-modal'); }
}
function closeAuthModal()   { Modal.close('auth-modal'); }
function closeProfile()     { Modal.close('profile-modal'); }
function showSignupForm()   { document.getElementById('login-form').classList.add('hidden'); document.getElementById('signup-form').classList.remove('hidden'); }
function showLoginForm()    { document.getElementById('signup-form').classList.add('hidden'); document.getElementById('login-form').classList.remove('hidden'); }
function socialLogin(p)     { Toast.show(`🔄 ${p.charAt(0).toUpperCase()+p.slice(1)} login coming soon!`,'info'); }
function saveProfile()      { Toast.show('💾 Profile saved!','success'); Modal.close('profile-modal'); }
function logoutUser()       { AppState.user=null; AppState.persist(); Modal.close('profile-modal'); Toast.show('👋 Logged out. See you soon!','info'); _syncProfileUI(); }
function editProfileInfo()  { Toast.show('✏️ Profile editing coming soon!','info'); }
function changePassword()   { Toast.show('🔒 Change password coming soon!','info'); }
function manageAddresses()  { Toast.show('📍 Address manager coming soon!','info'); }
function notificationSettings() { Toast.show('🔔 Notification settings coming soon!','info'); }
function addPaymentMethod() { Toast.show('💳 Payment methods coming soon!','info'); }
function changeProfilePhoto() { Toast.show('📷 Photo upload coming soon!','info'); }
function shareReferral() {
  const code = 'JAYA2026';
  if (navigator.share) { navigator.share({ title:"Jaya's Organic", text:`Use code ${code} for your first order!`, url:location.href }); }
  else { navigator.clipboard.writeText(`Use referral code ${code} at Jaya's Organic: ${location.href}`); Toast.show('📤 Referral link copied!','success'); }
}
function selectSubscription(plan) {
  const labels = { weekly:"Weekly Box (₹1,200/mo)", biweekly:"Bi-Weekly Box (₹650/mo)", monthly:"Monthly Special (₹2,500/mo)" };
  window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'd like the *${labels[plan]}* subscription. Please share details 🙏`)}`,'_blank');
}
function manageSubscription() { Toast.show('📦 Subscription portal coming soon!','info'); }

function _syncProfileUI() {
  const u = AppState.user;
  const nameEl  = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const mtext   = document.getElementById('mobile-profile-text');
  if (nameEl)  nameEl.textContent  = u?.name  || 'Guest User';
  if (emailEl) emailEl.textContent = u?.email || 'Not logged in';
  if (mtext)   mtext.textContent   = u ? (u.name?.split(' ')[0] || 'Profile') : 'User Profile';
}

// Reviews
function openReviewModal() {
  const sel = document.getElementById('review-product-select');
  if (sel) sel.innerHTML = `<option value="">Choose a product...</option>` + PRODUCTS.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  Modal.open('review-modal');
}
function closeReviewModal() { Modal.close('review-modal'); }
function setRating(n) {
  AppState.currentRating = n;
  const labels = ['','Poor','Fair','Good','Very Good','Excellent! ⭐'];
  document.querySelectorAll('#star-rating button').forEach((btn,i) => {
    btn.textContent = i < n ? '★' : '☆';
    btn.style.color = i < n ? '#f59e0b' : '#d1d5db';
  });
  const iv = document.getElementById('rating-value');
  const rt = document.getElementById('rating-text');
  if (iv) iv.value = n;
  if (rt) rt.textContent = labels[n] || '';
}

// Order confirmation
function closeOrderConfirmation() { Modal.close('order-confirmation-modal'); CartManager.clear(); }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PWA — Install Prompt (Phone App Install)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let _deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredPrompt = e;
  // Show banner after 4s
  setTimeout(_showInstallBanner, 4000);
});

window.addEventListener('appinstalled', () => {
  Toast.show('🎉 App installed! Find it on your home screen.','success');
  _dismissInstallBanner();
  _deferredPrompt = null;
});

function _showInstallBanner() {
  if (document.getElementById('install-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.className = 'fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-slide-up-modal';
  banner.innerHTML = `
    <div class="text-3xl">📱</div>
    <div class="flex-1 min-w-0">
      <p class="font-bold text-sm">Install Jaya's Organic App</p>
      <p class="text-xs text-green-100">Use like a native app, even offline!</p>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <button onclick="installPWA()" class="bg-white text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors">Install</button>
      <button onclick="_dismissInstallBanner()" class="text-green-200 hover:text-white text-xl leading-none">×</button>
    </div>`;
  document.body.appendChild(banner);
}

function installPWA() {
  if (!_deferredPrompt) { Toast.show('📱 Already installed or not supported on this browser','info'); return; }
  _deferredPrompt.prompt();
  _deferredPrompt.userChoice.then(r => {
    if (r.outcome === 'accepted') Toast.show('🎉 Installing...','success');
    _deferredPrompt = null;
    _dismissInstallBanner();
  });
}

function _dismissInstallBanner() {
  const b = document.getElementById('install-banner');
  if (b) b.remove();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICE WORKER REGISTRATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _registerSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('[SW] Registered:', reg.scope);
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          Toast.show('🔄 App updated! Refresh for new version.','info', 6000);
        }
      });
    });
  }).catch(e => console.warn('[SW] Failed:', e));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CROSS-TAB CART SYNC via BroadcastChannel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _setupCrossTabSync() {
  if (!('BroadcastChannel' in window)) return;
  window._cartChannel = new BroadcastChannel('jaya_cart_sync');
  window._cartChannel.onmessage = e => {
    if (e.data.type === 'CART_UPDATE') {
      AppState.cart = e.data.cart;
      CartManager._updateCountBadges();
    }
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ONLINE / OFFLINE INDICATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _setupNetworkListener() {
  window.addEventListener('offline', () => Toast.show('📵 You are offline. Cached data shown.','warning'));
  window.addEventListener('online',  () => Toast.show('✅ Back online!','success'));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORMS SETUP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _setupForms() {
  // Contact
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = encodeURIComponent(`📩 *Contact Form — Jaya's Organic*\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nMessage: ${d.get('message')}`);
    window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`,'_blank');
    e.target.reset();
    Toast.show('✅ Message sent via WhatsApp!','success');
  });

  // Newsletters
  ['newsletter-form','profile-newsletter-form'].forEach(id => {
    document.getElementById(id)?.addEventListener('submit', e => {
      e.preventDefault();
      Toast.show('📬 Subscribed! Thank you!','success');
      e.target.reset();
    });
  });

  // Login
  document.getElementById('login-form-element')?.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    AppState.user = { email: d.get('email'), name: d.get('email').split('@')[0], id: 'U'+Date.now(), joinedAt: new Date().toISOString() };
    AppState.persist();
    _syncProfileUI();
    Modal.close('auth-modal');
    Toast.show(`👋 Welcome back, ${AppState.user.name}!`,'success');
  });

  // Signup
  document.getElementById('signup-form-element')?.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    AppState.user = { name: d.get('name'), email: d.get('email'), phone: d.get('phone'), id: 'U'+Date.now(), joinedAt: new Date().toISOString() };
    AppState.persist();
    _syncProfileUI();
    Modal.close('auth-modal');
    Toast.show(`🎉 Welcome to Jaya's Organic, ${AppState.user.name}!`,'success');
  });

  // Review
  document.getElementById('review-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!AppState.currentRating) { Toast.show('⭐ Please select a star rating!','warning'); return; }
    Toast.show('🎉 Review submitted! Thank you!','success');
    Modal.close('review-modal');
    e.target.reset();
    setRating(0);
  });

  // Photo preview
  document.getElementById('review-photos')?.addEventListener('change', e => {
    const preview = document.getElementById('photo-preview');
    if (!preview) return;
    preview.innerHTML = '';
    Array.from(e.target.files).slice(0,3).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.className = 'w-20 h-20 object-cover rounded-xl shadow-md';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  // Pincode on Enter
  document.getElementById('pincode-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPincode();
  });

  // Recipe search live
  document.getElementById('recipe-search')?.addEventListener('input', () => {
    Search.debounce(applyFilters);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODAL BACKDROP CLOSE + ESC
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _setupModalBehavior() {
  const ids = ['recipe-modal','cart-modal','auth-modal','review-modal','profile-modal','order-confirmation-modal'];
  ids.forEach(id => {
    document.getElementById(id)?.addEventListener('click', e => {
      if (e.target.id === id) Modal.close(id);
    });
  });

  document.getElementById('close-modal')?.addEventListener('click', () => Modal.close('recipe-modal'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') Modal.closeAll();
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCROLL ANIMATIONS via IntersectionObserver
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function _setupScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i*0.05}s, transform 0.6s ease ${i*0.05}s`;
    obs.observe(el);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOOT — Application Initialization
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.addEventListener('DOMContentLoaded', () => {
  // 1. Restore persisted state
  AppState.hydrate();

  // 2. Show skeleton loaders for perceived performance
  UI.skeleton('product-grid', 6);
  UI.skeleton('recipe-grid',  6);

  // 3. Render all sections (60ms delay simulates async fetch)
  setTimeout(() => {
    UI.products();
    UI.recipes();
    UI.feedback();
    UI.categoryFilters();
    CartManager._updateCountBadges();
    _syncProfileUI();
  }, 400);

  // 4. Wire up all interactions
  _setupForms();
  _setupModalBehavior();
  _setupCrossTabSync();
  _setupNetworkListener();
  _setupScrollAnimations();
  _registerSW();

  console.log(`%c🍲 Jaya's Organic — Production App v2.0`, 'color:#ef4444;font-weight:bold;font-size:14px;');
});
