'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JAYA'S ORGANIC — Enhanced Production JavaScript v3.0
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  WHATSAPP:               '919600572691',
  CURRENCY:               '₹',
  FREE_DELIVERY_THRESHOLD: 500,
  DELIVERY_CHARGE:         50,
  TOAST_DURATION:          3200,
  DEBOUNCE_DELAY:          280,
  PINCODES: {
    '600001': { area:'Chennai Parrys',  type:'same-day', time:'2–3 hrs' },
    '600002': { area:'Chennai Fort',    type:'same-day', time:'2–3 hrs' },
    '600017': { area:'T. Nagar',        type:'same-day', time:'1–2 hrs' },
    '600020': { area:'Adyar',           type:'same-day', time:'1–2 hrs' },
    '600042': { area:'Velachery',       type:'same-day', time:'1–2 hrs' },
    '600040': { area:'Anna Nagar',      type:'same-day', time:'2–3 hrs' },
    '600004': { area:'Mylapore',        type:'same-day', time:'2–3 hrs' },
    '600028': { area:'Kodambakkam',     type:'same-day', time:'2–3 hrs' },
    '600045': { area:'Tambaram',        type:'next-day', time:'24 hrs' },
    '600116': { area:'Porur',           type:'next-day', time:'24 hrs' },
    '600034': { area:'Nungambakkam',    type:'next-day', time:'24 hrs' },
    '600014': { area:'Saidapet',        type:'next-day', time:'24 hrs' },
    '600086': { area:'Pallikaranai',    type:'next-day', time:'24 hrs' },
    '600100': { area:'Perungudi',       type:'next-day', time:'24 hrs' },
  }
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:'P001', name:'Pirandai Thokku', tamilName:'பிரண்டை தொக்கு', category:'Thokku & Pickles', price:180, originalPrice:220, weight:'200g', image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=350&fit=crop', badge:'🏆 Bestseller', badgeColor:'red', description:'Traditional Pirandai (Veldt grape) pickle with authentic Tamil spices. Known for bone-strengthening & digestive properties.', benefits:['Rich in Calcium','Aids Digestion','Anti-inflammatory','Preservative-free'], ingredients:['Pirandai (Veldt Grape)','Gingelly Oil','Mustard','Red Chili','Asafoetida','Salt','Curry Leaves'], shelfLife:'3 months (refrigerated)', rating:4.9, reviews:124, inStock:true, featured:true },
  { id:'P002', name:'Idli Podi', tamilName:'இட்லி பொடி', category:'Podis & Powders', price:120, originalPrice:150, weight:'200g', image:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&h=350&fit=crop', badge:'🌿 Popular', badgeColor:'green', description:'Traditional gunpowder spice mix — perfect with idli, dosa and rice. Stone-ground with urad dal and aromatic spices.', benefits:['High Protein','Rich in Iron','No Preservatives','Stone Ground'], ingredients:['Urad Dal','Chana Dal','Red Chili','Asafoetida','Sesame Seeds','Salt','Curry Leaves'], shelfLife:'6 months', rating:4.8, reviews:98, inStock:true, featured:true },
  { id:'P003', name:'Vallarai Podi', tamilName:'வல்லாரை பொடி', category:'Podis & Powders', price:150, originalPrice:180, weight:'100g', image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=350&fit=crop', badge:'🌱 Herbal', badgeColor:'green', description:'Brahmi leaf powder — a traditional Tamil superfood known to boost memory and cognitive function.', benefits:['Memory Booster','Brain Health','Anti-anxiety','Antioxidant Rich'], ingredients:['Vallarai Keerai (Brahmi)','Black Pepper','Cumin','Garlic','Salt'], shelfLife:'3 months', rating:4.7, reviews:76, inStock:true, featured:true },
  { id:'P004', name:'Karivepilai Podi', tamilName:'கறிவேப்பிலை பொடி', category:'Podis & Powders', price:110, originalPrice:140, weight:'100g', image:'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=350&fit=crop', badge:'💚 Healthy', badgeColor:'green', description:'Fresh curry leaf powder — rich in iron and calcium. Perfect for hair health and improved digestion.', benefits:['Iron Rich','Hair Growth','Improves Digestion','Anti-diabetic'], ingredients:['Curry Leaves','Urad Dal','Red Chili','Asafoetida','Salt'], shelfLife:'4 months', rating:4.6, reviews:54, inStock:true, featured:false },
  { id:'P005', name:'Manga Urugai', tamilName:'மாங்காய் ஊறுகாய்', category:'Thokku & Pickles', price:160, originalPrice:200, weight:'250g', image:'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=350&fit=crop', badge:'🌼 Seasonal', badgeColor:'amber', description:'Traditional raw mango pickle made during peak mango season with a secret family recipe.', benefits:['Vitamin C Rich','Probiotic','Appetite Stimulant','Traditional Recipe'], ingredients:['Raw Mango','Gingelly Oil','Mustard','Fenugreek','Red Chili','Salt','Asafoetida'], shelfLife:'6 months', rating:4.8, reviews:88, inStock:true, featured:true },
  { id:'P006', name:'Nellikkai Pickle', tamilName:'நெல்லிக்காய் ஊறுகாய்', category:'Thokku & Pickles', price:140, originalPrice:170, weight:'200g', image:'https://images.unsplash.com/photo-1582726978405-e0d6fbce4ddc?w=500&h=350&fit=crop', badge:'🛡️ Immunity', badgeColor:'amber', description:'Amla (Indian gooseberry) pickle — a powerful immunity booster with traditional spices.', benefits:['Vitamin C Powerhouse','Immunity Booster','Anti-aging','Liver Health'], ingredients:['Amla (Gooseberry)','Gingelly Oil','Mustard','Red Chili','Turmeric','Salt'], shelfLife:'3 months (refrigerated)', rating:4.7, reviews:62, inStock:true, featured:false },
  { id:'P007', name:'Milagu Kuzhambu Powder', tamilName:'மிளகு குழம்பு பொடி', category:'Masalas & Spice Mixes', price:160, originalPrice:200, weight:'200g', image:'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&h=350&fit=crop', badge:'🔥 Aromatic', badgeColor:'red', description:'Ready-mix pepper curry powder. Add to tamarind water for authentic Milagu Kuzhambu in minutes.', benefits:['Digestive Aid','Cold Relief','Antioxidant Rich','No Additives'], ingredients:['Black Pepper','Cumin','Coriander','Red Chili','Turmeric','Curry Leaves','Asafoetida'], shelfLife:'6 months', rating:4.9, reviews:105, inStock:true, featured:true },
  { id:'P008', name:'Mor Milagai', tamilName:'மோர் மிளகாய்', category:'Traditional Snacks', price:90, originalPrice:110, weight:'100g', image:'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=350&fit=crop', badge:'🏺 Traditional', badgeColor:'amber', description:'Sun-dried buttermilk chili — a classic Tamil side dish and snack. Crispy golden when fried.', benefits:['Probiotic','Low Calorie','Traditional','Sun-dried Natural'], ingredients:['Green Chili','Buttermilk','Salt','Asafoetida'], shelfLife:'2 months', rating:4.5, reviews:43, inStock:true, featured:false },
  { id:'P009', name:'Ennai Kathirikkai', tamilName:'எண்ணெய் கத்திரிக்காய்', category:'Thokku & Pickles', price:200, originalPrice:250, weight:'250g', image:'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=350&fit=crop', badge:'👨‍🍳 Chef Special', badgeColor:'red', description:'Baby brinjal in spiced oil — authentic Chettinad-style specialty. Best with rice and curd.', benefits:['Rich in Fiber','Antioxidant','Iron Rich','Chettinad Style'], ingredients:['Baby Brinjal','Gingelly Oil','Mustard','Tamarind','Red Chili','Coriander','Cumin'], shelfLife:'3 months', rating:4.8, reviews:71, inStock:true, featured:true },
];

const RECIPES = [
  { id:'R001', name:'Pirandai Thokku', tamilName:'பிரண்டை தொக்கு', category:'Pickles & Preserves', cookTime:'30 mins', prepTime:'15 mins', servings:20, difficulty:'Medium', calories:45, rating:4.9, image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=350&fit=crop', description:'Traditional Pirandai pickle — a medicinal family recipe known for bone health. 3 generations old.', ingredients:['250g Pirandai (cleaned)','3 tbsp Gingelly oil','1 tsp Mustard seeds','1 tsp Urad dal','8 Red chilies','½ tsp Asafoetida','Salt to taste','Curry leaves'], steps:['Clean pirandai by removing thorns and cutting into pieces','Grind pirandai coarsely without water','Heat gingelly oil, add mustard and urad dal','Add curry leaves, red chilies and asafoetida','Add ground pirandai and mix well on medium heat','Cook on low flame until oil separates (20–25 mins)','Cool completely before storing in airtight container'], tags:['Medicinal','Traditional','Bone Health','Pickle'], productId:'P001' },
  { id:'R002', name:'Traditional Sambar', tamilName:'சாம்பார்', category:'Curries & Gravies', cookTime:'40 mins', prepTime:'20 mins', servings:4, difficulty:'Easy', calories:120, rating:4.8, image:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=350&fit=crop', description:'Authentic Tamil Nadu sambar with fresh vegetables. The soul of every South Indian meal.', ingredients:['200g Toor dal','200g Mixed vegetables','2 tbsp Sambar powder','Lemon-sized tamarind','1 tomato','1 onion','Mustard, curry leaves','Salt & turmeric'], steps:['Pressure cook dal with turmeric until soft','Extract tamarind water (1.5 cups)','Sauté onions, tomatoes until soft','Add vegetables and partially cook','Add tamarind water and sambar powder','Add cooked dal, bring to boil','Season with mustard, curry leaves, red chili'], tags:['Classic','Vegan','Protein Rich','Daily Meal'] },
  { id:'R003', name:'Keerai Masiyal', tamilName:'கீரை மசியல்', category:'Greens & Salads', cookTime:'20 mins', prepTime:'10 mins', servings:3, difficulty:'Easy', calories:80, rating:4.7, image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=350&fit=crop', description:'Mashed spinach curry made with traditional Tamil method. Nutritious and kids love it.', ingredients:['2 bunches Spinach','1 Small onion','3 Garlic pods','2 Green chilies','½ tsp Cumin','Salt to taste','1 tsp Gingelly oil'], steps:['Wash and chop spinach leaves','Boil spinach with garlic and green chilies','Drain and mash coarsely','Sauté onions in gingelly oil','Add mashed spinach, mix well','Season with cumin and salt','Serve hot with rice'], tags:['Iron Rich','Quick','Kids Friendly','Healthy'] },
  { id:'R004', name:'Milagu Rasam', tamilName:'மிளகு ரசம்', category:'Soups & Rasam', cookTime:'25 mins', prepTime:'10 mins', servings:4, difficulty:'Easy', calories:60, rating:4.9, image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=350&fit=crop', description:'Traditional pepper rasam — a natural remedy for cold. Generations of Tamil families swear by this.', ingredients:['2 tbsp Black pepper','1 tsp Cumin','4 Garlic pods','Tamarind (small)','1 Tomato','Curry leaves','Salt','Mustard for tempering'], steps:['Grind pepper, cumin, garlic coarsely','Extract tamarind water (2 cups)','Boil tamarind water with tomatoes','Add ground pepper-cumin paste','Boil 15 minutes on medium flame','Add salt and dilute with water if needed','Temper with mustard and curry leaves'], tags:['Medicinal','Cold Remedy','Digestive','Winter Special'] },
  { id:'R005', name:'Paruppu Usili', tamilName:'பருப்பு உசிலி', category:'Dry Curries', cookTime:'35 mins', prepTime:'20 mins', servings:4, difficulty:'Medium', calories:180, rating:4.8, image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=350&fit=crop', description:'Steamed lentil crumbles with vegetables — a traditional Tamil Brahmin festival dish. High in protein.', ingredients:['100g Toor dal','100g Chana dal','4–6 Red chilies','200g Beans','Curry leaves','Mustard, Urad dal','Asafoetida','Coconut oil'], steps:['Soak dals 30 min, grind with red chilies','Steam dal mixture in idli plates (15 min)','Crumble steamed dal after cooling','Cook vegetables until tender','Heat oil, add mustard and urad dal','Add vegetables, then dal crumbles','Mix well, cook 5 min on low flame'], tags:['High Protein','Brahmin Style','Traditional','Festival Food'] },
  { id:'R006', name:'Puli Kuzhambu', tamilName:'புளி குழம்பு', category:'Curries & Gravies', cookTime:'45 mins', prepTime:'15 mins', servings:4, difficulty:'Medium', calories:140, rating:4.7, image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=350&fit=crop', description:'Classic tamarind-based curry — thick, tangy and spicy. The quintessential Tamil comfort food.', ingredients:['Gooseberry-sized tamarind','1 Onion','2 Tomatoes','2 tbsp Kuzhambu powder','Drumstick/Brinjal','Curry leaves','Sesame oil','Salt & turmeric'], steps:['Soak tamarind and extract thick juice','Fry onions in sesame oil until golden','Add tomatoes and cook until mushy','Add kuzhambu powder, fry 2 min','Add tamarind juice and vegetables','Boil until thick and oil separates','Season with mustard and curry leaves'], tags:['Tangy','Spicy','Classic','Rice Accompaniment'] },
];

const FEEDBACK = [
  { name:'Priya Sundaram',      location:'T. Nagar, Chennai',    rating:5, product:'Pirandai Thokku',       review:'The Pirandai Thokku is absolutely authentic! My mother used to make this and Jaya akka\'s version is identical. Quality of oil and freshness is unmatched!', date:'2 days ago',   avatar:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face', verified:true, helpful:34 },
  { name:'Rajesh Kumar',        location:'Adyar, Chennai',       rating:5, product:'Idli Podi',              review:'Amazing Idli Podi! The spice level is perfect and it goes great with hot idlis and ghee. My whole family is hooked. Packaging is also very hygienic.', date:'5 days ago',   avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', verified:true, helpful:28 },
  { name:'Lakshmi Meenakshi',   location:'Velachery, Chennai',   rating:5, product:'Vallarai Podi',          review:'The Vallarai Podi is not only tasty but very healthy. My kids started eating more rice after I started mixing this. Noticed concentration improvement too!', date:'1 week ago',  avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', verified:true, helpful:45 },
  { name:'Senthil Murugan',     location:'Anna Nagar, Chennai',  rating:5, product:'Milagu Kuzhambu Powder', review:'This Milagu Kuzhambu powder is exactly like what my thatha described. Pure, no artificial taste at all. My wife makes it every Friday now.', date:'2 weeks ago', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', verified:true, helpful:22 },
  { name:'Kavitha Rajan',       location:'Mylapore, Chennai',    rating:5, product:'Manga Urugai',           review:'The mango pickle tastes exactly like the ones from Madurai! Oil quality is exceptional and tanginess is perfect. Have already ordered twice this month.', date:'3 weeks ago', avatar:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face', verified:true, helpful:38 },
  { name:'Arun Krishnamurthy',  location:'Tambaram, Chennai',    rating:4, product:'Ennai Kathirikkai',      review:'Very authentic Chettinad flavor! Rich and spicy. Packaging could be slightly better but taste is 10/10. Definitely buying the combo pack next time.', date:'1 month ago', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', verified:true, helpful:19 },
];

const BLOG_POSTS = [
  { id:'B001', cat:'Cooking Tips', catColor:'amber', title:'Essential Spices for Tamil Cooking', excerpt:'Discover the 10 must-have spices that form the backbone of authentic Tamil Nadu cuisine.', image:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', readTime:'4 min read', date:'Mar 2026' },
  { id:'B002', cat:'Health & Nutrition', catColor:'green', title:'Benefits of Vallarai (Brahmi) Herb', excerpt:'The ancient herb your brain needs. Science-backed benefits of Brahmi in everyday Tamil food.', image:'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', readTime:'6 min read', date:'Feb 2026' },
  { id:'B003', cat:'Recipe Stories', catColor:'red', title:'The History of Milagu Rasam', excerpt:'How this humble pepper soup became South India\'s go-to natural cold remedy for centuries.', image:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', readTime:'5 min read', date:'Jan 2026' },
  { id:'B004', cat:'Organic Living', catColor:'green', title:'Why Gingelly Oil is Liquid Gold', excerpt:'The unsung hero of Tamil cooking. Why this cold-pressed sesame oil deserves a permanent spot in your kitchen.', image:'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop', readTime:'3 min read', date:'Dec 2025' },
  { id:'B005', cat:'Cooking Tips', catColor:'amber', title:'How to Store Homemade Pickles', excerpt:'Maximize freshness and shelf life with these traditional and modern storage techniques.', image:'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop', readTime:'4 min read', date:'Nov 2025' },
  { id:'B006', cat:'Culture & Heritage', catColor:'purple', title:'Pongal Festival Food Traditions', excerpt:'The foods that bring Tamil families together during the harvest festival. Stories from grandmothers.', image:'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop', readTime:'7 min read', date:'Oct 2025' },
];

const FAQS = [
  { q:'Are all products truly preservative-free?', a:'Yes, absolutely! Every product is made fresh without any artificial preservatives, colors, or flavoring agents. We rely only on traditional preservation techniques like sun-drying, oil-immersion, and natural spices that have been used for centuries.' },
  { q:'How long do the products last?', a:'Shelf life varies by product: Idli Podi and Masalas last 4–6 months when stored in a cool, dry place. Pickles and Thokkus last 2–4 months in refrigerator. Mor Milagai (sun-dried) lasts 2–3 months at room temperature. Always keep sealed tightly after opening.' },
  { q:'What areas do you deliver to?', a:'We deliver across Chennai including T.Nagar, Adyar, Velachery, Mylapore, Anna Nagar, Kodambakkam, Nungambakkam, Saidapet, and suburbs like Tambaram, Porur, Pallikaranai, Perungudi. Enter your pincode to check availability.' },
  { q:'Can I place bulk orders for events or gifting?', a:'Yes! We love helping with events, festivals (Pongal, Diwali, etc.), and corporate gifting. Bulk orders of 1kg+ receive 15% discount, and we create custom gift hampers. Contact us on WhatsApp for personalized bulk order quotes.' },
  { q:'How do you ensure freshness during delivery?', a:'We prepare products fresh on the day of dispatch. Products are packed in air-tight containers. Same-day delivery is available within 2–4 hours for most Chennai areas, ensuring freshness from our kitchen to your table.' },
  { q:'Do you offer a subscription service?', a:'Yes! Our monthly subscription box includes a curated selection of seasonal products at ₹2,500/month. We also offer weekly (₹1,200/mo) and bi-weekly (₹650/mo) options. WhatsApp us to get started.' },
  { q:'Are your products suitable for diabetics or specific diets?', a:'Most of our products are made with natural ingredients and are suitable for various diets. Vallarai Podi and Karivepilai Podi have specific health benefits for blood sugar management. Please WhatsApp us with specific dietary requirements and we\'ll guide you.' },
];

const POLICIES = {
  shipping: { title:'🚚 Shipping & Delivery Policy', content:[
    '<strong>Delivery Areas:</strong> We deliver across Chennai and suburbs. Same-day delivery is available in select areas (T. Nagar, Adyar, Velachery, Mylapore, Anna Nagar, Kodambakkam).',
    '<strong>Delivery Charges:</strong> ₹50 for orders under ₹500. FREE delivery for orders ₹500 and above.',
    '<strong>Delivery Timeline:</strong> Same-day delivery (1–4 hrs) for central Chennai. Next-day delivery for suburbs like Tambaram, Porur, Pallikaranai.',
    '<strong>Order Cutoff:</strong> Orders placed before 3 PM are dispatched same day. Orders after 3 PM are dispatched next morning.',
    '<strong>Tracking:</strong> You will receive WhatsApp updates at each stage — order confirmation, preparation, and dispatch.'
  ]},
  return: { title:'↩️ Return & Refund Policy', content:[
    '<strong>Fresh Products:</strong> Due to the perishable and homemade nature of our products, we generally do not accept returns.',
    '<strong>Damaged Products:</strong> If you receive a damaged or tampered product, contact us within 24 hours with photos. We will replace or refund immediately.',
    '<strong>Wrong Item:</strong> If you receive the wrong product, we will exchange it at no additional charge.',
    '<strong>Quality Issues:</strong> We stand behind our quality. If you are unsatisfied for quality reasons, contact us within 48 hours and we will make it right — replacement, refund, or credit.',
    '<strong>Refund Timeline:</strong> Approved refunds are processed within 3–5 business days via the original payment method.'
  ]},
  privacy: { title:'🔒 Privacy Policy', content:[
    'We collect only the information necessary to process your order: name, phone number, delivery address, and email.',
    'We do not sell, share, or rent your personal information to third parties under any circumstances.',
    'Order information is used only to process and deliver your order and communicate about it.',
    'We use WhatsApp for order communication. Your number is kept confidential and only used for order-related messages.',
    'You can request deletion of your data at any time by contacting us on WhatsApp or email.'
  ]},
  terms: { title:'📄 Terms of Service', content:[
    'By placing an order, you agree to these terms and confirm you are 18+ years of age.',
    'Prices are subject to change without prior notice. Promotional discounts cannot be combined unless stated.',
    'We reserve the right to cancel orders in case of unavailability, pricing errors, or suspected fraud.',
    'All products are made fresh and variations in taste, color, or texture are natural characteristics of homemade food.',
    'For disputes, Chennai courts shall have jurisdiction. These terms are governed by the laws of India.'
  ]}
};

// ── STATE ────────────────────────────────────────────────────────────────────
const State = {
  cart: [], wishlist: [], user: null,
  currentRating: 0, activeProductCat: 'all', activeRecipeCat: 'all',

  load() {
    try {
      this.cart     = JSON.parse(localStorage.getItem('jo_cart')     || '[]');
      this.wishlist = JSON.parse(localStorage.getItem('jo_wishlist') || '[]');
      this.user     = JSON.parse(localStorage.getItem('jo_user')     || 'null');
    } catch(e) { console.warn('State load failed', e); }
  },
  save() {
    try {
      localStorage.setItem('jo_cart',     JSON.stringify(this.cart));
      localStorage.setItem('jo_wishlist', JSON.stringify(this.wishlist));
      localStorage.setItem('jo_user',     JSON.stringify(this.user));
    } catch(e) { console.warn('State save failed', e); }
  }
};

// ── TOAST ────────────────────────────────────────────────────────────────────
const Toast = {
  show(msg, type='success') {
    const el = document.createElement('div');
    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type]||'✅'}</span> <span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(el);
    requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add('show'); }); });
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 500);
    }, CONFIG.TOAST_DURATION);
  }
};

// ── MODAL ────────────────────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

// ── MOBILE MENU ──────────────────────────────────────────────────────────────
let menuOpen = false;
function toggleMobileMenu() {
  menuOpen = !menuOpen;
  const menu = document.getElementById('mobile-menu');
  if (menuOpen) {
    menu.classList.add('open');
    document.getElementById('ham-1').style.transform = 'rotate(45deg) translate(4px,4px)';
    document.getElementById('ham-2').style.opacity   = '0';
    document.getElementById('ham-3').style.transform = 'rotate(-45deg) translate(4px,-4px)';
  } else {
    menu.classList.remove('open');
    document.getElementById('ham-1').style.transform = '';
    document.getElementById('ham-2').style.opacity   = '';
    document.getElementById('ham-3').style.transform = '';
  }
}
function closeMobileMenu() {
  if (menuOpen) toggleMobileMenu();
}

// ── SEARCH ───────────────────────────────────────────────────────────────────
function toggleSearchBar() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('hidden');
  if (!bar.classList.contains('hidden')) {
    setTimeout(() => document.getElementById('global-search')?.focus(), 100);
  }
}

function handleGlobalSearch(q) {
  const container = document.getElementById('search-results');
  if (!q.trim()) { container.classList.add('hidden'); return; }
  const lq = q.toLowerCase();
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(lq) ||
    (p.description && p.description.toLowerCase().includes(lq)) ||
    (p.benefits && p.benefits.some(b => b.toLowerCase().includes(lq)))
  );
  if (!results.length) {
    container.innerHTML = '<div class="p-4 text-sm text-neutral-500 text-center">No results found</div>';
  } else {
    container.innerHTML = results.map(p => `
      <div onclick="openProductModal('${p.id}');document.getElementById('search-bar').classList.add('hidden')" class="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer transition-colors">
        <img src="${p.image}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt="">
        <div class="min-w-0"><div class="font-semibold text-sm truncate">${p.name}</div><div class="text-xs text-neutral-500">₹${p.price} · ${p.category}</div></div>
      </div>`).join('');
  }
  container.classList.remove('hidden');
}

// ── CART ─────────────────────────────────────────────────────────────────────
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || !product.inStock) return;
  const existing = State.cart.find(i => i.id === id);
  if (existing) {
    existing.quantity++;
    Toast.show(`${product.name} qty updated ✓`,'info');
  } else {
    State.cart.push({ ...product, quantity: 1 });
    Toast.show(`${product.name} added to cart! 🛒`,'success');
  }
  State.save();
  updateCartBadge();
  renderCart();
}

function updateCartQty(id, qty) {
  if (qty < 1) { removeFromCart(id); return; }
  const item = State.cart.find(i => i.id === id);
  if (item) { item.quantity = qty; State.save(); renderCart(); updateCartBadge(); }
}

function removeFromCart(id) {
  State.cart = State.cart.filter(i => i.id !== id);
  State.save();
  renderCart();
  updateCartBadge();
  Toast.show('Item removed from cart','info');
}

function clearCart() {
  State.cart = [];
  State.save();
  renderCart();
  updateCartBadge();
}

function cartSubtotal() { return State.cart.reduce((s, i) => s + i.price * i.quantity, 0); }
function cartDelivery()  { const sub = cartSubtotal(); return sub >= CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : (sub > 0 ? CONFIG.DELIVERY_CHARGE : 0); }
function cartTotal()     { return cartSubtotal() + cartDelivery(); }

function updateCartBadge() {
  const count = State.cart.reduce((s, i) => s + i.quantity, 0);
  const els = document.querySelectorAll('#cart-count, #cart-count-m');
  els.forEach(el => {
    if (count > 0) { el.textContent = count; el.classList.remove('hidden'); }
    else { el.classList.add('hidden'); }
  });
}

function renderCart() {
  const itemsEl   = document.getElementById('cart-items');
  const emptyEl   = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary');
  const totalsEl  = document.getElementById('cart-totals');
  if (!itemsEl) return;

  if (!State.cart.length) {
    itemsEl.innerHTML = '';
    emptyEl && emptyEl.classList.remove('hidden');
    summaryEl && summaryEl.classList.add('hidden');
    return;
  }

  emptyEl && emptyEl.classList.add('hidden');
  summaryEl && summaryEl.classList.remove('hidden');

  itemsEl.innerHTML = State.cart.map(item => `
    <div class="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover flex-shrink-0">
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm text-neutral-900 truncate">${item.name}</div>
        <div class="text-xs text-neutral-400">${item.weight || ''}</div>
        <div class="text-clay-600 font-bold text-sm">₹${item.price}</div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button onclick="updateCartQty('${item.id}',${item.quantity-1})" class="w-7 h-7 rounded-full bg-red-100 text-red-600 font-black hover:bg-red-200 transition-colors flex items-center justify-center">−</button>
        <span class="w-6 text-center font-bold text-sm">${item.quantity}</span>
        <button onclick="updateCartQty('${item.id}',${item.quantity+1})" class="w-7 h-7 rounded-full bg-green-100 text-green-600 font-black hover:bg-green-200 transition-colors flex items-center justify-center">+</button>
      </div>
      <div class="text-right flex-shrink-0">
        <div class="font-black text-sm">₹${item.price * item.quantity}</div>
        <button onclick="removeFromCart('${item.id}')" class="text-xs text-red-400 hover:text-red-600 transition-colors">✕</button>
      </div>
    </div>`).join('');

  const sub = cartSubtotal();
  const del = cartDelivery();
  const total = cartTotal();
  if (totalsEl) {
    totalsEl.innerHTML = `
      <div class="flex justify-between text-sm mb-1"><span class="text-neutral-500">Subtotal</span><span class="font-semibold">₹${sub}</span></div>
      <div class="flex justify-between text-sm mb-2"><span class="text-neutral-500">Delivery</span><span class="font-semibold ${del===0?'text-green-600':''}">${del===0?'🎉 FREE':'₹'+del}</span></div>
      ${del>0?`<div class="text-xs text-green-600 mb-2">Add ₹${CONFIG.FREE_DELIVERY_THRESHOLD-sub} more for free delivery!</div>`:''}
      <div class="flex justify-between text-lg font-black border-t pt-2 border-orange-100"><span>Total</span><span class="text-clay-600">₹${total}</span></div>`;
  }
}

function checkoutCart() {
  if (!State.cart.length) { Toast.show('Your cart is empty!','warning'); return; }
  const lines = State.cart.map(i => `• ${i.name} (${i.weight||''}) ×${i.quantity} = ₹${i.price*i.quantity}`).join('\n');
  const del   = cartDelivery();
  const msg   = encodeURIComponent(
    `🛒 *Order — Jaya's Organic*\n\n${lines}\n\n` +
    `Subtotal: ₹${cartSubtotal()}\nDelivery: ${del===0?'FREE':'₹'+del}\n*Total: ₹${cartTotal()}*\n\n` +
    `📍 Delivery address:\n🕐 Preferred time:\n📱 Contact number:`
  );
  window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank');
  closeModal('cart-modal');
  // Show confirmation
  const orderId = '#JO' + Date.now().toString().slice(-6);
  document.getElementById('confirm-order-id').textContent = orderId;
  openModal('order-modal');
}

// ── WISHLIST ──────────────────────────────────────────────────────────────────
function toggleWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const idx = State.wishlist.findIndex(i => i.id === id);
  if (idx > -1) {
    State.wishlist.splice(idx, 1);
    Toast.show(`${product.name} removed from wishlist`,'info');
  } else {
    State.wishlist.push(product);
    Toast.show(`${product.name} added to wishlist ❤️`,'success');
  }
  State.save();
  updateWishlistBadge();
  syncWishlistButtons();
  renderWishlist();
}

function updateWishlistBadge() {
  const count = State.wishlist.length;
  document.querySelectorAll('#wl-count, #wl-count-m').forEach(el => {
    if (count > 0) { el.textContent = count; el.classList.remove('hidden'); }
    else el.classList.add('hidden');
  });
}

function syncWishlistButtons() {
  document.querySelectorAll('[data-wl]').forEach(btn => {
    const inWl = State.wishlist.some(i => i.id === btn.dataset.wl);
    btn.textContent = inWl ? '❤️' : '🤍';
  });
}

function renderWishlist() {
  const el    = document.getElementById('wishlist-items');
  const empty = document.getElementById('wishlist-empty');
  if (!el) return;
  if (!State.wishlist.length) {
    el.innerHTML = '';
    empty && empty.classList.remove('hidden');
    return;
  }
  empty && empty.classList.add('hidden');
  el.innerHTML = State.wishlist.map(p => `
    <div class="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
      <img src="${p.image}" class="w-14 h-14 rounded-xl object-cover flex-shrink-0" alt="">
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm truncate">${p.name}</div>
        <div class="text-xs text-neutral-400">${p.weight}</div>
        <div class="text-clay-600 font-bold text-sm">₹${p.price}</div>
      </div>
      <div class="flex gap-2">
        <button onclick="addToCart('${p.id}');closeModal('wishlist-modal')" class="btn-primary py-1.5 px-3 text-xs">Add to Cart</button>
        <button onclick="toggleWishlist('${p.id}')" class="text-red-400 hover:text-red-600 text-xl">✕</button>
      </div>
    </div>`).join('');
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  if (!list || !list.length) {
    grid.innerHTML = `<div class="col-span-full text-center py-16 text-neutral-400"><div class="text-5xl mb-3">🔍</div><p class="font-semibold">No products found</p></div>`;
    return;
  }
  grid.innerHTML = list.map(p => productCard(p)).join('');
  syncWishlistButtons();
}

function productCard(p) {
  const disc  = p.originalPrice ? Math.round((1 - p.price/p.originalPrice)*100) : 0;
  const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
  const bc    = { red:'#ef4444', green:'#16a34a', amber:'#d97706' };
  const wl    = State.wishlist.some(i => i.id === p.id);
  return `
    <div class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-orange-50 flex flex-col card-lift">
      <div class="relative img-zoom h-48">
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        ${p.badge ? `<span class="absolute top-3 left-3 badge-pill text-white" style="background:${bc[p.badgeColor]||'#666'}">${p.badge}</span>` : ''}
        ${disc > 0 ? `<span class="absolute top-3 right-12 badge-pill bg-orange-500 text-white">${disc}% OFF</span>` : ''}
        <button onclick="toggleWishlist('${p.id}')" data-wl="${p.id}" class="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform text-base">
          ${wl ? '❤️' : '🤍'}
        </button>
        ${!p.inStock ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="bg-white text-neutral-800 font-bold px-4 py-2 rounded-full text-sm">Out of Stock</span></div>' : ''}
      </div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex items-start justify-between gap-2 mb-1">
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-neutral-900 group-hover:text-clay-600 transition-colors text-sm truncate">${p.name}</h3>
            <p class="text-xs text-neutral-400 font-tamil">${p.tamilName||''}</p>
          </div>
          <span class="text-xs bg-orange-50 text-clay-600 px-2 py-0.5 rounded-lg font-semibold flex-shrink-0">${p.weight}</span>
        </div>
        <p class="text-xs text-neutral-500 mb-2 line-clamp-2 leading-relaxed">${p.description}</p>
        <div class="flex flex-wrap gap-1 mb-2">
          ${(p.benefits||[]).slice(0,3).map(b => `<span class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">${b}</span>`).join('')}
        </div>
        <div class="flex items-center gap-1 text-sm mb-2">
          <span class="text-amber-400">${stars}</span>
          <span class="text-xs font-bold ml-1">${p.rating}</span>
          <span class="text-xs text-neutral-400">(${p.reviews})</span>
        </div>
        <div class="flex items-center justify-between mb-3 mt-auto">
          <div>
            <span class="text-lg font-black text-neutral-900">₹${p.price}</span>
            ${p.originalPrice ? `<span class="text-xs text-neutral-400 line-through ml-1">₹${p.originalPrice}</span>` : ''}
          </div>
          <span class="text-xs text-neutral-400">📦 ${p.shelfLife||''}</span>
        </div>
        <div class="flex gap-2">
          <button onclick="addToCart('${p.id}')" ${!p.inStock?'disabled':''} class="flex-1 btn-green py-2 px-3 text-xs justify-center rounded-xl disabled:opacity-40 disabled:cursor-not-allowed">
            🛒 Add to Cart
          </button>
          <button onclick="openProductModal('${p.id}')" class="w-9 h-9 bg-orange-100 text-clay-700 rounded-xl hover:bg-orange-200 transition-colors flex items-center justify-center text-base flex-shrink-0" title="Quick view">👁️</button>
          <button onclick="_waOrderProduct('${p.id}')" class="w-9 h-9 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center text-base flex-shrink-0" title="WhatsApp order">📱</button>
        </div>
      </div>
    </div>`;
}

function filterProductsByCategory(cat) {
  State.activeProductCat = cat;
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase().includes(cat.toLowerCase()) || (cat==='all' && btn.textContent.trim()==='All'));
  });
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.style.borderColor = btn.dataset.cat === cat ? '#d85e28' : '';
    btn.style.background  = btn.dataset.cat === cat ? '#fdf0e4' : '';
  });
  let list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(list);
}

function sortProducts(val) {
  let list = State.activeProductCat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === State.activeProductCat);
  if (val === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (val === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (val === 'rating')     list.sort((a,b) => b.rating - a.rating);
  renderProducts(list);
}

function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const disc  = p.originalPrice ? Math.round((1-p.price/p.originalPrice)*100) : 0;
  const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5-Math.floor(p.rating));
  const bc    = { red:'#ef4444', green:'#16a34a', amber:'#d97706' };
  document.getElementById('product-modal-content').innerHTML = `
    <div class="grid sm:grid-cols-2 gap-6">
      <div class="img-zoom rounded-2xl overflow-hidden">
        <img src="${p.image}" alt="${p.name}" class="w-full h-64 sm:h-80 object-cover">
      </div>
      <div>
        ${p.badge ? `<span class="badge-pill text-white mb-3 inline-flex" style="background:${bc[p.badgeColor]||'#666'}">${p.badge}</span>` : ''}
        <h2 class="text-2xl font-black text-neutral-900 mb-1">${p.name}</h2>
        <p class="text-neutral-400 font-tamil text-sm mb-3">${p.tamilName||''}</p>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-amber-400">${stars}</span>
          <span class="font-bold text-sm">${p.rating}</span>
          <span class="text-neutral-400 text-sm">(${p.reviews} reviews)</span>
        </div>
        <p class="text-neutral-600 text-sm mb-4 leading-relaxed">${p.description}</p>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${(p.benefits||[]).map(b => `<span class="badge-pill bg-green-100 text-green-700">${b}</span>`).join('')}
        </div>
        <div class="bg-orange-50 rounded-xl p-4 mb-4 text-sm">
          <div class="grid grid-cols-2 gap-2 text-neutral-600">
            <div><span class="font-semibold">Weight:</span> ${p.weight}</div>
            <div><span class="font-semibold">Category:</span> ${p.category}</div>
            <div><span class="font-semibold">Shelf Life:</span> ${p.shelfLife}</div>
            <div><span class="font-semibold">In Stock:</span> ${p.inStock?'✅ Yes':'❌ No'}</div>
          </div>
        </div>
        <div class="mb-5">
          <div class="font-semibold text-sm mb-2 text-neutral-700">Ingredients:</div>
          <p class="text-xs text-neutral-500 leading-relaxed">${(p.ingredients||[]).join(', ')}</p>
        </div>
        <div class="flex items-center gap-3 mb-5">
          <span class="text-3xl font-black text-clay-600">₹${p.price}</span>
          ${p.originalPrice ? `<span class="text-lg text-neutral-400 line-through">₹${p.originalPrice}</span>` : ''}
          ${disc > 0 ? `<span class="badge-pill bg-orange-500 text-white">${disc}% OFF</span>` : ''}
        </div>
        <div class="flex gap-3">
          <button onclick="addToCart('${p.id}');closeModal('product-modal')" class="flex-1 btn-green justify-center py-3">🛒 Add to Cart</button>
          <button onclick="_waOrderProduct('${p.id}')" class="btn-primary justify-center py-3 px-5">📱 WhatsApp</button>
        </div>
      </div>
    </div>`;
  openModal('product-modal');
}

function _waOrderProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(`Hi! I'd like to order *${p.name}* (${p.weight}) for ₹${p.price}. Please confirm availability and delivery details. 🙏`);
  window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank');
}

// ── RECIPES ───────────────────────────────────────────────────────────────────
function renderRecipes(list) {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;
  if (!list || !list.length) {
    grid.innerHTML = `<div class="col-span-full text-center py-16 text-neutral-400"><div class="text-5xl mb-3">🍽️</div><p class="font-semibold">No recipes found</p></div>`;
    return;
  }
  grid.innerHTML = list.map(r => recipeCard(r)).join('');
}

function recipeCard(r) {
  const diffColors = { Easy:'bg-green-100 text-green-700', Medium:'bg-amber-100 text-amber-700', Hard:'bg-red-100 text-red-700' };
  return `
    <div onclick="openRecipeModal('${r.id}')" class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 cursor-pointer border border-orange-50 card-lift">
      <div class="relative img-zoom h-44">
        <img src="${r.image}" alt="${r.name}" loading="lazy" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
        <div class="absolute bottom-3 left-4 right-4">
          <div class="text-xs text-white/60 uppercase tracking-wide mb-0.5">${r.category}</div>
          <h3 class="text-white font-black text-base leading-tight">${r.name}</h3>
          <p class="text-white/60 text-xs font-tamil">${r.tamilName}</p>
        </div>
        <div class="absolute top-3 right-3 glass-dark rounded-full px-2 py-0.5">
          <span class="text-amber-300 text-xs font-bold">★ ${r.rating}</span>
        </div>
      </div>
      <div class="p-4">
        <p class="text-neutral-500 text-xs mb-3 line-clamp-2 leading-relaxed">${r.description}</p>
        <div class="flex items-center justify-between text-xs text-neutral-400 mb-3">
          <span>🕐 ${r.cookTime}</span>
          <span class="badge-pill ${diffColors[r.difficulty]||''} text-xs">${r.difficulty}</span>
          <span>👥 ${r.servings}</span>
          <span>🔥 ${r.calories} cal</span>
        </div>
        <div class="flex flex-wrap gap-1 mb-3">
          ${(r.tags||[]).map(t => `<span class="badge-pill bg-saffron-50 text-saffron-700 border border-saffron-200 text-xs">${t}</span>`).join('')}
        </div>
        <button class="w-full btn-primary justify-center py-2 text-xs rounded-xl">📖 View Full Recipe</button>
      </div>
    </div>`;
}

let recipeTimer = null;
function debounceRecipeSearch(q) {
  clearTimeout(recipeTimer);
  recipeTimer = setTimeout(() => {
    const lq   = q.toLowerCase().trim();
    const list = lq
      ? RECIPES.filter(r =>
          r.name.toLowerCase().includes(lq) ||
          r.description.toLowerCase().includes(lq) ||
          (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(lq))) ||
          (r.tags && r.tags.some(t => t.toLowerCase().includes(lq)))
        )
      : RECIPES;
    renderRecipes(list);
  }, CONFIG.DEBOUNCE_DELAY);
}

function renderRecipeCategoryFilters() {
  const container = document.getElementById('recipe-cat-filters');
  if (!container) return;
  const cats = ['All', ...new Set(RECIPES.map(r => r.category))];
  container.innerHTML = cats.map(cat => `
    <button onclick="filterRecipesByCategory('${cat}')" class="filter-chip text-xs font-bold px-4 py-2 rounded-full bg-white border-2 border-gray-200 hover:border-clay-400 transition-all ${cat==='All'?'active':''}">
      ${cat}
    </button>`).join('');
}

function filterRecipesByCategory(cat) {
  document.querySelectorAll('#recipe-cat-filters .filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === cat);
  });
  const list = cat === 'All' ? RECIPES : RECIPES.filter(r => r.category === cat);
  renderRecipes(list);
}

function openRecipeModal(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) return;
  const diffColors = { Easy:'bg-green-100 text-green-700', Medium:'bg-amber-100 text-amber-700', Hard:'bg-red-100 text-red-700' };
  document.getElementById('recipe-modal-content').innerHTML = `
    <div>
      <div class="relative img-zoom rounded-2xl overflow-hidden mb-6 h-52 sm:h-72">
        <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-4 left-5 right-5">
          <span class="text-xs text-white/60 uppercase tracking-wide">${r.category}</span>
          <h2 class="text-white font-black text-2xl sm:text-3xl">${r.name}</h2>
          <p class="text-white/70 text-sm font-tamil">${r.tamilName}</p>
        </div>
        <div class="absolute top-4 right-4 glass-dark rounded-full px-3 py-1">
          <span class="text-amber-300 font-bold">★ ${r.rating}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mb-6 text-sm">
        <div class="flex items-center gap-2"><span>🕐</span><div><div class="font-bold">Prep</div><div class="text-neutral-500">${r.prepTime}</div></div></div>
        <div class="flex items-center gap-2"><span>🍳</span><div><div class="font-bold">Cook</div><div class="text-neutral-500">${r.cookTime}</div></div></div>
        <div class="flex items-center gap-2"><span>👥</span><div><div class="font-bold">Serves</div><div class="text-neutral-500">${r.servings}</div></div></div>
        <div class="flex items-center gap-2"><span>🔥</span><div><div class="font-bold">Calories</div><div class="text-neutral-500">${r.calories}/serving</div></div></div>
        <span class="badge-pill ${diffColors[r.difficulty]||''}">${r.difficulty}</span>
      </div>
      <p class="text-neutral-600 mb-6 leading-relaxed">${r.description}</p>
      <div class="grid sm:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 class="font-bold text-lg mb-3 flex items-center gap-2">🥘 Ingredients</h3>
          <ul class="space-y-2">
            ${(r.ingredients||[]).map(ing => `<li class="flex items-start gap-2 text-sm"><span class="text-green-500 mt-0.5">✓</span><span>${ing}</span></li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-3 flex items-center gap-2">📝 Instructions</h3>
          <ol class="space-y-3">
            ${(r.steps||[]).map((step,i) => `
              <li class="flex items-start gap-3 text-sm">
                <div class="step-num flex-shrink-0 mt-0.5">${i+1}</div>
                <span class="text-neutral-600 leading-relaxed">${step}</span>
              </li>`).join('')}
          </ol>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-6">
        ${(r.tags||[]).map(t => `<span class="badge-pill bg-saffron-100 text-saffron-700">${t}</span>`).join('')}
      </div>
      ${r.productId ? (() => {
        const prod = PRODUCTS.find(p => p.id === r.productId);
        return prod ? `<div class="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex items-center gap-4"><img src="${prod.image}" class="w-14 h-14 rounded-xl object-cover flex-shrink-0"><div class="flex-1"><div class="text-xs font-bold text-clay-600 uppercase tracking-wide mb-1">Use Our Product</div><div class="font-bold">${prod.name}</div><div class="text-sm text-neutral-500">₹${prod.price} · ${prod.weight}</div></div><button onclick="addToCart('${prod.id}');closeModal('recipe-modal')" class="btn-primary py-2 px-4 text-sm">Add to Cart</button></div>` : '';
      })() : ''}
    </div>`;
  openModal('recipe-modal');
}

// ── FEEDBACK ──────────────────────────────────────────────────────────────────
function renderFeedback() {
  const grid = document.getElementById('feedback-grid');
  if (!grid) return;
  grid.innerHTML = FEEDBACK.map(f => `
    <div class="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-50 card-lift">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <img src="${f.avatar}" alt="${f.name}" class="w-10 h-10 rounded-full border-2 border-orange-200 object-cover">
          <div>
            <div class="font-bold text-sm flex items-center gap-1">${f.name}${f.verified?'<span class="text-blue-500 text-xs">✓</span>':''}</div>
            <div class="text-xs text-neutral-400">${f.location}</div>
          </div>
        </div>
        <span class="text-xs text-neutral-300">${f.date}</span>
      </div>
      <div class="flex items-center gap-0.5 mb-2">
        ${'★'.repeat(f.rating).split('').map(()=>'<span class="text-amber-400 text-sm">★</span>').join('')}
        ${'★'.repeat(5-f.rating).split('').map(()=>'<span class="text-gray-200 text-sm">★</span>').join('')}
      </div>
      <span class="badge-pill bg-green-50 text-green-700 border border-green-100 mb-3 inline-flex">📦 ${f.product}</span>
      <p class="text-neutral-600 text-sm leading-relaxed line-clamp-4"><span class="quote-mark">"</span>${f.review}"</p>
      <div class="mt-3 flex items-center justify-between text-xs text-neutral-400">
        <button onclick="this.textContent='👍 Helpful (${f.helpful+1})';this.disabled=true;this.style.color='#16a34a'" class="hover:text-green-600 transition-colors">👍 Helpful (${f.helpful})</button>
        ${f.verified?'<span class="text-blue-400">✅ Verified Purchase</span>':''}
      </div>
    </div>`).join('');
}

// ── BLOG ──────────────────────────────────────────────────────────────────────
function renderBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  const catColors = { 'Cooking Tips':'bg-amber-100 text-amber-700', 'Health & Nutrition':'bg-green-100 text-green-700', 'Recipe Stories':'bg-red-100 text-red-700', 'Organic Living':'bg-emerald-100 text-emerald-700', 'Culture & Heritage':'bg-purple-100 text-purple-700' };
  grid.innerHTML = BLOG_POSTS.map(post => `
    <div class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-orange-50 card-lift">
      <div class="img-zoom h-44 overflow-hidden">
        <img src="${post.image}" alt="${post.title}" loading="lazy" class="w-full h-full object-cover">
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="badge-pill ${catColors[post.cat]||'bg-gray-100 text-gray-700'}">${post.cat}</span>
          <span class="text-xs text-neutral-400">${post.readTime}</span>
        </div>
        <h4 class="font-bold text-neutral-900 group-hover:text-clay-600 transition-colors mb-2 leading-snug">${post.title}</h4>
        <p class="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">${post.excerpt}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-neutral-400">${post.date}</span>
          <button onclick="Toast.show('📰 Full article coming soon!','info')" class="text-clay-600 text-sm font-bold hover:text-clay-800 transition-colors">Read More →</button>
        </div>
      </div>
    </div>`).join('');
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm" id="faq-${i}">
      <button onclick="toggleFAQ(${i})" class="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-neutral-800 hover:bg-orange-50 transition-colors">
        <span>${faq.q}</span>
        <span class="faq-icon text-clay-500 font-black text-xl flex-shrink-0">+</span>
      </button>
      <div class="faq-body px-5">
        <p class="text-neutral-600 text-sm leading-relaxed">${faq.a}</p>
      </div>
    </div>`).join('');
}

function toggleFAQ(i) {
  const item = document.getElementById(`faq-${i}`);
  const body = item.querySelector('.faq-body');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-body').classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
    body.classList.add('open');
  }
}

// ── POLICIES ──────────────────────────────────────────────────────────────────
function openPolicyModal(type) {
  const policy = POLICIES[type];
  if (!policy) return;
  document.getElementById('policy-title').textContent  = policy.title;
  document.getElementById('policy-content').innerHTML  = policy.content.map(p => `<p>${p}</p>`).join('');
  openModal('policy-modal');
  return false;
}

// ── PINCODE ───────────────────────────────────────────────────────────────────
function checkPincode() {
  const val = document.getElementById('pincode-input')?.value?.trim();
  const result = document.getElementById('pincode-result');
  if (!result) return;
  if (!val || val.length !== 6 || !/^\d{6}$/.test(val)) {
    result.innerHTML = '<span class="text-red-500">⚠️ Please enter a valid 6-digit pincode</span>';
    result.classList.remove('hidden');
    return;
  }
  const info = CONFIG.PINCODES[val];
  if (info) {
    const color = info.type === 'same-day' ? 'text-green-600' : 'text-amber-600';
    const icon  = info.type === 'same-day' ? '🚀' : '⏰';
    result.innerHTML = `<span class="${color}">${icon} Delivery available to <strong>${info.area}</strong> — ${info.type.replace('-',' ')} (${info.time})</span>`;
  } else {
    result.innerHTML = '<span class="text-neutral-500">📦 Pincode not in our delivery area yet. Please WhatsApp us for special delivery arrangements.</span>';
  }
  result.classList.remove('hidden');
}

// ── COUNTDOWN ────────────────────────────────────────────────────────────────
function startCountdown() {
  const target = new Date();
  target.setHours(23, 59, 59, 0);

  function tick() {
    const now  = new Date();
    let diff   = Math.max(0, Math.floor((target - now) / 1000));
    const h    = Math.floor(diff / 3600);
    diff      -= h * 3600;
    const m    = Math.floor(diff / 60);
    const s    = diff % 60;
    const fmt  = n => String(n).padStart(2,'0');
    const hEl  = document.getElementById('cd-h');
    const mEl  = document.getElementById('cd-m');
    const sEl  = document.getElementById('cd-s');
    if (hEl) hEl.textContent = fmt(h);
    if (mEl) mEl.textContent = fmt(m);
    if (sEl) sEl.textContent = fmt(s);
  }
  tick();
  setInterval(tick, 1000);
}

// ── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? (scrolled/total)*100 : 0;
    const bar      = document.getElementById('scroll-bar');
    if (bar) bar.style.width = pct + '%';
  }, { passive: true });
}

// ── SCROLL ANIMATIONS ────────────────────────────────────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('section').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.65s ease ${i*0.04}s, transform 0.65s ease ${i*0.04}s`;
    obs.observe(el);
  });
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function handleProfile() {
  if (State.user) { syncProfileUI(); openModal('profile-modal'); }
  else openModal('auth-modal');
}

function showPanel(which) {
  document.getElementById('login-panel' ).classList.toggle('hidden', which !== 'login');
  document.getElementById('signup-panel').classList.toggle('hidden', which !== 'signup');
}

function syncProfileUI() {
  const u = State.user;
  const n = document.getElementById('p-name');
  const e = document.getElementById('p-email');
  const a = document.getElementById('profile-avatar');
  if (n) n.textContent = u?.name || 'Guest User';
  if (e) e.textContent = u?.email || 'Not logged in';
  if (a) a.textContent = u?.name ? u.name.slice(0,2).toUpperCase() : 'JO';
}

function logoutUser() {
  State.user = null;
  State.save();
  closeModal('profile-modal');
  Toast.show('👋 Logged out. See you soon!','info');
  syncProfileUI();
}

function socialLogin(platform) {
  Toast.show(`🔄 ${platform.charAt(0).toUpperCase()+platform.slice(1)} login coming soon!`,'info');
}

function shareReferral() {
  const code = 'JAYA2026';
  if (navigator.share) {
    navigator.share({ title:"Jaya's Organic", text:`Use code ${code} for ₹50 off your first order at Jaya's Organic!`, url: location.href });
  } else {
    navigator.clipboard?.writeText(`Use referral code ${code} at Jaya's Organic: ${location.href}`);
    Toast.show('📤 Referral link copied to clipboard!','success');
  }
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
function setRating(n) {
  State.currentRating = n;
  const labels = ['','⭐ Poor','⭐⭐ Fair','⭐⭐⭐ Good','⭐⭐⭐⭐ Very Good','⭐⭐⭐⭐⭐ Excellent!'];
  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < n);
  });
  const rText = document.getElementById('rating-text');
  const rVal  = document.getElementById('rating-value');
  if (rText) rText.textContent = labels[n] || '';
  if (rVal)  rVal.value        = n;
}

// ── SPECIAL ACTIONS ──────────────────────────────────────────────────────────
function addHamperToCart() {
  State.cart.push({ id:'HAMPER', name:'Pongal Special Hamper', weight:'Hamper', price:850, quantity:1, image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop', inStock:true });
  State.save();
  updateCartBadge();
  renderCart();
  Toast.show('🎉 Pongal Hamper added to cart!','success');
}

function showBulkOptions() {
  const msg = encodeURIComponent("Hi Jaya's Organic! I'd like to know about bulk order discounts (1kg+). Please share details 🙏");
  window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank');
}

function selectSubscription(plan) {
  const labels = { weekly:'Weekly Box (₹1,200/mo)', biweekly:'Bi-Weekly Box (₹650/mo)', monthly:'Monthly Special (₹2,500/mo)' };
  const msg = encodeURIComponent(`Hi! I'd like to subscribe to the *${labels[plan]}*. Please share details 🙏`);
  window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank');
}

// ── FORMS ────────────────────────────────────────────────────────────────────
function initForms() {
  // Contact form
  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const d   = new FormData(e.target);
    const msg = encodeURIComponent(
      `📩 *Contact — Jaya's Organic*\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nType: ${d.get('type')}\nMessage: ${d.get('message')}`
    );
    window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank');
    e.target.reset();
    Toast.show('✅ Message sent via WhatsApp!','success');
  });

  // Newsletter
  document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    Toast.show('📬 Subscribed! Welcome to Jaya\'s Organic family 🌿','success');
    e.target.reset();
  });

  // Login
  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const d   = new FormData(e.target);
    State.user = { name: d.get('email').split('@')[0], email: d.get('email'), id: 'U'+Date.now(), joinedAt: new Date().toISOString() };
    State.save();
    syncProfileUI();
    closeModal('auth-modal');
    Toast.show(`👋 Welcome back, ${State.user.name}!`,'success');
  });

  // Signup
  document.getElementById('signup-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    State.user = { name: d.get('name'), email: d.get('email'), phone: d.get('phone'), id: 'U'+Date.now(), joinedAt: new Date().toISOString() };
    State.save();
    syncProfileUI();
    closeModal('auth-modal');
    Toast.show(`🎉 Welcome to Jaya's Organic, ${State.user.name}!`,'success');
  });

  // Review
  document.getElementById('review-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!State.currentRating) { Toast.show('⭐ Please select a star rating first!','warning'); return; }
    Toast.show('🎉 Thank you for your review! It will appear shortly.','success');
    closeModal('review-modal');
    e.target.reset();
    setRating(0);
  });

  // Populate review product select
  const sel = document.getElementById('review-product-select');
  if (sel) {
    sel.innerHTML = `<option value="">Choose a product...</option>` +
      PRODUCTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  }

  // Pincode enter
  document.getElementById('pincode-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPincode();
  });
}

// ── NETWORK & SW ─────────────────────────────────────────────────────────────
function initNetworkAndSW() {
  window.addEventListener('offline', () => Toast.show('📵 You are offline. Some features may be limited.','warning'));
  window.addEventListener('online',  () => Toast.show('✅ Back online!','success'));

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        reg.installing?.addEventListener('statechange', function() {
          if (this.state === 'installed' && navigator.serviceWorker.controller) {
            Toast.show('🔄 App updated! Refresh for latest version.','info');
          }
        });
      });
    }).catch(() => {});
  }
}

// ── PWA INSTALL ───────────────────────────────────────────────────────────────
let _installPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _installPrompt = e;
  setTimeout(() => {
    const banner = document.createElement('div');
    banner.id        = 'pwa-banner';
    banner.className = 'fixed bottom-20 sm:bottom-8 left-4 sm:left-auto sm:right-20 z-50 max-w-xs w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up';
    banner.innerHTML = `<span class="text-3xl">📱</span><div class="flex-1"><p class="font-bold text-sm">Install Jaya's Organic</p><p class="text-xs text-green-100">Works offline too!</p></div><button onclick="installPWA()" class="bg-white text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-50 transition-colors">Install</button><button onclick="this.closest('#pwa-banner').remove()" class="text-green-200 hover:text-white ml-1 text-lg">×</button>`;
    document.body.appendChild(banner);
  }, 5000);
});

function installPWA() {
  if (!_installPrompt) { Toast.show('📱 Already installed or not supported','info'); return; }
  _installPrompt.prompt();
  _installPrompt.userChoice.then(r => {
    if (r.outcome === 'accepted') Toast.show('🎉 App is being installed!','success');
    document.getElementById('pwa-banner')?.remove();
    _installPrompt = null;
  });
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load persisted state
  State.load();

  // 2. Render all sections
  renderProducts(PRODUCTS);
  renderRecipes(RECIPES);
  renderFeedback();
  renderBlog();
  renderFAQ();
  renderRecipeCategoryFilters();
  renderWishlist();
  renderCart();

  // 3. Sync badges
  updateCartBadge();
  updateWishlistBadge();
  syncProfileUI();

  // 4. Wire forms & events
  initForms();
  initScrollProgress();
  initScrollAnimations();
  initNetworkAndSW();
  startCountdown();

  // 5. Close search on outside click
  document.addEventListener('click', e => {
    const bar     = document.getElementById('search-bar');
    const results = document.getElementById('search-results');
    if (!bar?.contains(e.target) && !e.target.closest('button[onclick*="toggleSearchBar"]')) {
      results?.classList.add('hidden');
    }
  });

  // 6. ESC to close modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(el => {
        el.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  console.log('%c🍲 Jaya\'s Organic v3.0 — Production Ready', 'color:#d85e28;font-weight:bold;font-size:14px;');
});
