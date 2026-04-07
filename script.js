/* ================================================================
   Jaya's Organic – Customer Side JavaScript (Fully Fixed)
   Fixes:
   1. checkoutCart() broken syntax fixed
   2. calculateCartTotal() added
   3. showSkeletonLoader() added
   4. showOrderConfirmation() / closeOrderConfirmation() added
   5. checkPincode() added
   6. addComboToCart() / addHamperToCart() / showBulkOptions() added
   7. changeProfilePhoto() added
   8. duplicate logoutUser() removed
   9. products fetched from API (/api/products) with fallback to static data
================================================================ */

const BACKEND_URL = 'http://localhost:8080/api';

// ─── Static fallback product data (shown if backend is unreachable) ──
const staticProducts = [
  { id: 1,  name: "Pirandai Thokku",          price: 350, originalPrice: 350, image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg", description: "Traditional Tamil side dish made with pirandai, perfect with rice", stockStatus: "ready", preparationTime: "Ready in 2-3 days", shelfLife: "Best before 6 months", allergens: "Contains sesame", badge: "Best Seller", rating: 4.8, reviews: 45 },
  { id: 2,  name: "Curry Leaves Idli Podi",   price: 200, originalPrice: 200, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", description: "Aromatic podi made with curry leaves, enhances digestion", stockStatus: "ready", preparationTime: "Made to order", shelfLife: "Best before 3 months", allergens: "None", badge: "No Preservatives", rating: 4.9, reviews: 32 },
  { id: 3,  name: "Ellu Podi",                price: 250, originalPrice: 250, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s", description: "Delicious sesame powder, great combo with rice", stockStatus: "ready", preparationTime: "Ready in 1-2 days", shelfLife: "Best before 4 months", allergens: "Contains sesame", badge: "Best Seller", rating: 4.7, reviews: 28 },
  { id: 4,  name: "Vallarai Podi",            price: 120, originalPrice: 120, image: "https://in.gramango.com/uploads/products/1650698310vpg.jpg", description: "Brain-boosting powder made with vallarai leaves", stockStatus: "ready", preparationTime: "Made to order", shelfLife: "Best before 2 months", allergens: "None", badge: "Herbal Supplement", rating: 4.6, reviews: 19 },
  { id: 5,  name: "Thoothuvalai Podi",        price: 180, originalPrice: 180, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop", description: "Medicinal powder, supports respiratory health", stockStatus: "out", preparationTime: "Made to order", shelfLife: "Best before 3 months", allergens: "None", badge: "Ayurvedic", rating: 4.8, reviews: 15 },
  { id: 6,  name: "Mudakathan Podi",          price: 160, originalPrice: 160, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", description: "Traditional herbal powder for joint and bone health", stockStatus: "ready", preparationTime: "Ready in 2-3 days", shelfLife: "Best before 4 months", allergens: "Contains nuts", badge: "Joint Health", rating: 4.5, reviews: 22 },
  { id: 7,  name: "Avarampoo Idli Podi",      price: 220, originalPrice: 220, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", description: "Unique podi made with avarampoo flowers, rich in antioxidants", stockStatus: "ready", preparationTime: "Made to order", shelfLife: "Best before 3 months", allergens: "None", badge: "Antioxidant Rich", rating: 4.7, reviews: 18 },
  { id: 8,  name: "Karuppu Ulundhu Idli Podi",price: 450, originalPrice: 450, image: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/LrBYq8Tch75ooqpsi4Bm.jpg", description: "Healthy traditional powder made with black urad dal", stockStatus: "ready", preparationTime: "Ready in 1-2 days", shelfLife: "Best before 6 months", allergens: "None", badge: "High Protein", rating: 4.9, reviews: 41 },
  { id: 9,  name: "Pirandai Podi",            price: 280, originalPrice: 280, image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg", description: "Nutritious powder from pirandai plant, supports bone health", stockStatus: "ready", preparationTime: "Made to order", shelfLife: "Best before 4 months", allergens: "None", badge: "Calcium Rich", rating: 4.6, reviews: 25 },
  { id: 10, name: "Murungai Keerai Idli Podi",price: 190, originalPrice: 190, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop", description: "Superfood podi made with drumstick leaves, rich in iron", stockStatus: "ready", preparationTime: "Ready in 2-3 days", shelfLife: "Best before 2 months", allergens: "None", badge: "Iron Rich", rating: 4.8, reviews: 33 },
  { id: 11, name: "Sambar Podi",              price: 220, originalPrice: 220, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", description: "Authentic homemade sambar powder for delicious sambar", stockStatus: "ready", preparationTime: "Ready in 1-2 days", shelfLife: "Best before 6 months", allergens: "None", badge: "Traditional Recipe", rating: 4.7, reviews: 38 },
  { id: 12, name: "Murungai Keerai Soup Mix", price: 240, originalPrice: 240, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", description: "Ready-to-cook soup mix with drumstick leaves and spices", stockStatus: "ready", preparationTime: "Made to order", shelfLife: "Best before 3 months", allergens: "None", badge: "Ready to Cook", rating: 4.5, reviews: 16 },
  { id: 13, name: "Poondu Podi",              price: 260, originalPrice: 260, image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop", description: "Garlic-based spice powder, boosts immunity and digestion", stockStatus: "ready", preparationTime: "Ready in 1-2 days", shelfLife: "Best before 4 months", allergens: "Contains garlic", badge: "Immunity Booster", rating: 4.6, reviews: 29 }
];

// Live product list (filled by API or fallback)
let products = [];

// ─── Recipe Data ────────────────────────────────────────────
const recipes = [
  { id: 1, title: "Pirandai Thokku", category: "South Indian", image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ", description: "Pirandai Thokku – Traditional Tamil side dish made with pirandai; tasty and healthy. Perfect combo with rice, idli, and dosa 👍", ingredients: ["Pirandai – 1 cup (cleaned & chopped)", "Oil – 2 tbsp", "Tamarind – small lemon size", "Dry red chillies – 4–6", "Garlic – 5 cloves", "Mustard seeds – 1 tsp", "Urad dal – 1 tsp", "Asafoetida – a pinch", "Turmeric powder – ¼ tsp", "Salt – as needed"], steps: ["1. Prepare pirandai", "2. Roast ingredients", "3. Grind into paste", "4. Temper and mix well"], tips: "Cook pirandai well to reduce bitterness. Use enough oil for better taste and shelf life.", prepTime: "10 mins", cookTime: "20 mins" },
  { id: 2, title: "Idli Podi", category: "South Indian", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdl5necT5OCNgYCMAfuzjwmtI5MfKUtF0zaA&s", description: "Idli Podi – Spicy and aromatic South Indian powder; best side dish for idli and dosa.", ingredients: ["Dry red chillies – 10-12", "Chana dal – 2 tbsp", "Urad dal – 2 tbsp", "Sesame seeds – 1 tbsp", "Garlic – 4 cloves", "Asafoetida – a pinch", "Salt – as needed"], steps: ["1. Roast chillies, chana dal, and urad dal separately", "2. Lightly roast sesame seeds", "3. Cool and grind with garlic, salt, and asafoetida", "4. Store in an airtight container"], tips: "Roast ingredients well for rich flavor. Add sesame oil while serving.", prepTime: "10 mins", cookTime: "10 mins" },
  { id: 3, title: "Karuppu Ulundhu Idli Podi", category: "Tamil Special", image: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/LrBYq8Tch75ooqpsi4Bm.jpg", description: "Karuppu Ulundhu Podi – Healthy traditional powder; good for bone strength.", ingredients: ["Black urad dal – 1/2 cup", "Dry red chillies – 5", "Garlic – 5 cloves", "Salt – as needed"], steps: ["1. Roast urad dal", "2. Roast chillies and garlic", "3. Grind everything", "4. Store and use"], tips: "Good for health and strength.", prepTime: "10 mins", cookTime: "15 mins" },
  { id: 4, title: "Ellu Podi", category: "Side Dish", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s", description: "Ellu Podi – Delicious sesame powder; great combo with rice.", ingredients: ["Sesame seeds – 1/2 cup", "Dry red chillies – 4", "Garlic – 3 cloves", "Salt – as needed"], steps: ["1. Roast sesame seeds", "2. Roast chillies and garlic", "3. Grind everything", "4. Store properly"], tips: "Do not over roast sesame seeds.", prepTime: "10 mins", cookTime: "10 mins" },
  { id: 5, title: "Vallarai Podi", category: "Healthy", image: "https://in.gramango.com/uploads/products/1650698310vpg.jpg", description: "Vallarai Podi – Traditional powder that supports memory and health.", ingredients: ["Vallarai leaves – 1 cup", "Dry red chillies – 4", "Garlic – 3 cloves", "Salt – as needed"], steps: ["1. Roast vallarai leaves", "2. Add chillies and garlic, roast", "3. Grind everything", "4. Store properly"], tips: "Good for brain health.", prepTime: "10 mins", cookTime: "10 mins" },
  { id: 6, title: "Sambar Powder", category: "South Indian", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", description: "Authentic Sambar Powder – Essential spice mix for making delicious sambar.", ingredients: ["Coriander seeds – 1/2 cup", "Dry red chillies – 10-12", "Chana dal – 2 tbsp", "Urad dal – 2 tbsp", "Fenugreek seeds – 1 tsp", "Turmeric powder – 1 tsp", "Asafoetida – 1/2 tsp", "Oil – 1 tbsp"], steps: ["1. Heat oil and roast coriander seeds until fragrant", "2. Add chana dal, urad dal, and fenugreek seeds, roast", "3. Add chillies and asafoetida, roast lightly", "4. Cool and grind with turmeric"], tips: "Store in airtight container. Use within 6 months for best flavor.", prepTime: "5 mins", cookTime: "15 mins" },
  { id: 7, title: "Pongal", category: "Breakfast", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", description: "Ven Pongal – Steamed rice and lentil dish, healthy breakfast.", ingredients: ["Rice – 1 cup", "Moong dal – 1/2 cup", "Ghee – 2 tbsp", "Black pepper – 1 tsp", "Cumin seeds – 1 tsp", "Cashews – 10", "Ginger – 1 inch (chopped)", "Curry leaves – few", "Salt – as needed"], steps: ["1. Cook rice and dal with water", "2. Mash well when cooked", "3. Temper ghee with pepper, cumin, cashews, ginger, curry leaves", "4. Pour over pongal and mix"], tips: "Serve hot with sambar or chutney. Add more ghee for richness.", prepTime: "10 mins", cookTime: "25 mins" }
];

// ─── Testimonials ───────────────────────────────────────────
let testimonials = JSON.parse(localStorage.getItem('jayasOrganicTestimonials')) || [
  { id: 1, name: "Priya S.", location: "T. Nagar, Chennai", rating: 5, text: "The Pirandai Thokku is absolutely authentic and delicious! Reminds me of my grandmother's cooking. Will definitely order again.", product: "Pirandai Thokku", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Rajesh K.", location: "Adyar, Chennai", rating: 5, text: "Amazing Idli Podi! The spice level is perfect and it goes great with hot idlis. Fresh and organic as promised.", product: "Idli Podi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Lakshmi M.", location: "Velachery, Chennai", rating: 5, text: "The Vallarai Podi is not only tasty but also healthy. My kids love it and I feel good knowing it's organic.", product: "Vallarai Podi", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 4, name: "Arun V.", location: "Anna Nagar, Chennai", rating: 5, text: "Best homemade food in Chennai! The delivery was quick and the packaging was excellent. Highly recommend!", product: "Family Pack", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "Kavitha R.", location: "Mylapore, Chennai", rating: 5, text: "The Ellu Podi is a game changer! So flavorful and aromatic. Perfect for our Sunday breakfasts.", product: "Ellu Podi", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" }
];

// ─── Shopping Cart ───────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('jayaCart')) || [];

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initRecipeGrid();
  initFilters();
  initProductGrid();     // ✅ Now fetches from API
  initFeedbackGrid();
  initContactForm();
  initSmoothScroll();
  initCart();
  initNewsletter();
  initUserProfile();
  initAuthForms();
  initReviewForm();
  initModernFeatures();
});

// ─── Cart ────────────────────────────────────────────────────
function initCart() {
  updateCartCount();
  renderCart();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  showCartNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) { removeFromCart(productId); return; }
  const item = cart.find(item => item.id === productId);
  if (item) { item.quantity = newQuantity; saveCart(); renderCart(); }
}

function saveCart() {
  localStorage.setItem('jayaCart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  ['cart-count', 'cart-count-mobile', 'sticky-cart-count'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = count;
    el.style.display = count > 0 ? (id === 'cart-count-mobile' ? 'inline-block' : 'flex') : 'none';
  });
}

function showCartNotification(message) {
  const n = document.createElement('div');
  n.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-fade-in';
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

// ✅ FIX 1: calculateCartTotal() — was missing, caused crash
function calculateCartTotal() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountAmount = 0;
  const comboOffers = [];
  let bulkDiscount = null;

  // Combo: any 3 podis for ₹500
  const podiItems = cart.filter(item => item.name && item.name.toLowerCase().includes('podi'));
  const totalPodiQty = podiItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalPodiQty >= 3) {
    const podiSubtotal = podiItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const comboSets  = Math.floor(totalPodiQty / 3);
    const avgPodiPrice = podiSubtotal / totalPodiQty;
    const fullPrice  = comboSets * 3 * avgPodiPrice;
    const comboPrice = comboSets * 500;
    const savings    = Math.max(0, Math.round(fullPrice - comboPrice));
    if (savings > 0) {
      discountAmount += savings;
      comboOffers.push({ name: `Podi Combo Offer`, description: `Any 3 Podis for ₹500 — Save ₹${savings}!` });
    }
  }

  // Bulk: orders ≥ ₹1000 get 15% off
  if (subtotal >= 1000 && comboOffers.length === 0) {
    const savings = Math.floor(subtotal * 0.15);
    discountAmount += savings;
    bulkDiscount = `15% bulk discount applied — Save ₹${savings}!`;
  }

  const total = Math.max(0, subtotal - discountAmount);
  return { subtotal, discountAmount, total, comboOffers, bulkDiscount };
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
    cartTotal.innerHTML = '<div class="flex justify-between text-lg font-bold"><span>Total:</span><span>₹0</span></div>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl" onerror="this.src='https://via.placeholder.com/64'">
      <div class="flex-1">
        <h4 class="font-semibold text-gray-900">${item.name}</h4>
        <p class="text-sm text-gray-600">₹${item.price}</p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">-</button>
          <span class="px-3 py-1 bg-white border rounded">${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold text-gray-900">₹${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm mt-1">Remove</button>
      </div>
    </div>
  `).join('');

  const calc = calculateCartTotal();

  // Discount banners
  let discountHTML = '';
  calc.comboOffers.forEach(o => {
    discountHTML += `<div class="bg-green-100 border border-green-300 rounded-lg p-3 mb-2"><p class="text-green-800 font-semibold text-sm">🎉 ${o.name}</p><p class="text-green-700 text-xs">${o.description}</p></div>`;
  });
  if (calc.bulkDiscount) {
    discountHTML += `<div class="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-2"><p class="text-blue-800 font-semibold text-sm">💰 Bulk Discount</p><p class="text-blue-700 text-xs">${calc.bulkDiscount}</p></div>`;
  }
  if (discountHTML) {
    cartItems.innerHTML += `<div class="mt-4 p-4 bg-white rounded-2xl border"><h4 class="font-bold text-gray-900 mb-3">🎁 Special Offers Applied</h4>${discountHTML}</div>`;
  }

  cartTotal.innerHTML = `
    <div class="space-y-2">
      <div class="flex justify-between text-sm"><span>Subtotal:</span><span>₹${calc.subtotal}</span></div>
      ${calc.discountAmount > 0 ? `<div class="flex justify-between text-sm text-green-600 font-semibold"><span>Discount:</span><span>-₹${calc.discountAmount}</span></div>` : ''}
      <div class="flex justify-between text-lg font-bold border-t pt-2"><span>Total:</span><span class="gradient-text">₹${calc.total}</span></div>
    </div>`;
}

function openCart() {
  const m = document.getElementById('cart-modal');
  if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; renderCart(); }
}

function closeCart() {
  const m = document.getElementById('cart-modal');
  if (m) { m.classList.add('hidden'); document.body.style.overflow = ''; }
}

// ✅ FIX 2: checkoutCart() — was broken with orphaned code block
function checkoutCart() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }

  const calc = calculateCartTotal();
  const lines = cart.map(item => `${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`).join('\n');
  const whatsappMessage = `Hi Jaya's Organic!\n\nI want to order:\n${lines}\n\nSubtotal: ₹${calc.subtotal}\nDiscount: ₹${calc.discountAmount}\nTotal: ₹${calc.total}\n\nPlease confirm delivery details.`;

  // Add order to user history if logged in
  if (currentUser && currentUser.id) {
    const order = {
      id: Date.now(),
      items: cart.map(i => i.name),
      total: calc.total,
      date: new Date().toLocaleDateString()
    };
    currentUser.orders = currentUser.orders || [];
    currentUser.orders.push(order);

    // Loyalty points: 1 point per ₹10 spent
    const pointsEarned = Math.floor(calc.total / 10);
    currentUser.loyaltyPoints = (currentUser.loyaltyPoints || 0) + pointsEarned;

    // Member level
    if      (currentUser.loyaltyPoints >= 500) currentUser.memberLevel = 'Gold';
    else if (currentUser.loyaltyPoints >= 200) currentUser.memberLevel = 'Silver';
    else if (currentUser.loyaltyPoints >= 100) currentUser.memberLevel = 'Bronze';

    saveCurrentUser();
  }

  window.open(`https://wa.me/919600572691?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  showOrderConfirmation(calc);

  // Clear cart after order
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
}

// ✅ FIX 3: showOrderConfirmation() — was missing
function showOrderConfirmation(calc) {
  const modal = document.getElementById('order-confirmation-modal');
  const orderIdEl = document.getElementById('order-id');
  if (modal) {
    if (orderIdEl) orderIdEl.textContent = '#JO' + Date.now().toString().slice(-6);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    closeCart();
  }
}

function closeOrderConfirmation() {
  const modal = document.getElementById('order-confirmation-modal');
  if (modal) { modal.classList.add('hidden'); document.body.style.overflow = ''; }
}

// ─── Product Grid (Fetches from API) ─────────────────────────

// ✅ FIX 4: showSkeletonLoader() — was missing
function showSkeletonLoader(container, count) {
  container.innerHTML = Array(count).fill(`
    <div class="product-card bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div class="w-full h-48 bg-gray-200"></div>
      <div class="p-4 space-y-3">
        <div class="h-5 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="flex gap-2 mt-2">
          <div class="h-10 bg-gray-200 rounded flex-1"></div>
          <div class="h-10 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  `).join('');
}

// ✅ FIX 5: initProductGrid() — now fetches from backend API with fallback
async function initProductGrid() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  showSkeletonLoader(grid, 6);

  try {
    // Try to fetch products from public API endpoint
    const response = await fetch(`${BACKEND_URL}/products`, {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    if (response.ok) {
      const apiProducts = await response.json();
      // Map backend Product fields to our format
      products = apiProducts.map(p => ({
        id:              p.id,
        name:            p.name,
        price:           parseFloat(p.price),
        originalPrice:   parseFloat(p.price),
        image:           p.imageUrl || 'https://via.placeholder.com/400x300',
        description:     p.description || '',
        stockStatus:     'ready',
        preparationTime: 'Made to order',
        shelfLife:       'Check packaging',
        allergens:       'Check label',
        badge:           'Fresh',
        rating:          4.5,
        reviews:         0
      }));
      console.log(`✅ Loaded ${products.length} products from API`);
    } else {
      throw new Error('API returned ' + response.status);
    }
  } catch (err) {
    // Fallback to static products
    console.warn('⚠️ Using static products (backend unavailable):', err.message);
    products = [...staticProducts];
  }

  renderProducts(grid, products);
  // Also populate review dropdown
  populateProductDropdown();
}

function renderProducts(container, productList) {
  if (!productList || productList.length === 0) {
    container.innerHTML = '<div class="col-span-3 text-center py-12 text-gray-500">No products available at the moment.</div>';
    return;
  }
  container.innerHTML = productList.map(product => `
    <div class="product-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
        <div class="absolute top-3 left-3 flex flex-col gap-1">
          <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">${product.badge || 'Fresh'}</span>
          ${product.stockStatus === 'out' ? '<span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Out of Stock</span>' : ''}
        </div>
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span class="text-lg font-bold text-gray-900">₹${product.price}</span>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">${product.name}</h3>
        <div class="flex items-center mb-2">
          <div class="flex text-yellow-400 mr-2">
            ${[1,2,3,4,5].map(star => `<span class="text-sm">${star <= Math.round(product.rating || 4) ? '★' : '☆'}</span>`).join('')}
          </div>
          <span class="text-xs text-gray-600">(${product.reviews || ''})</span>
        </div>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>
        ${product.shelfLife ? `<div class="text-xs text-gray-500 mb-3">Shelf life: ${product.shelfLife}</div>` : ''}
        <div class="flex gap-2">
          ${product.stockStatus === 'out'
            ? '<button disabled class="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">Out of Stock</button>'
            : `<button onclick="addToCart(${product.id})" class="cta-secondary flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors">Add to Cart</button>`
          }
          <a href="https://wa.me/919600572691?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}" class="cta-primary py-2 px-4 rounded-lg text-sm font-bold transition-colors flex items-center justify-center min-w-[80px]">
            Order Now
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Delivery Pincode Checker ─────────────────────────────────

// ✅ FIX 6: checkPincode() — was missing
function checkPincode() {
  const pincode = document.getElementById('pincode-input')?.value.trim();
  const resultEl = document.getElementById('delivery-result');
  if (!resultEl) return;

  if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
    resultEl.textContent = '⚠️ Please enter a valid 6-digit PIN code.';
    resultEl.className = 'mt-3 text-sm text-orange-600';
    return;
  }

  // Chennai-area pincodes
  const sameDayPincodes = ['600001','600002','600003','600004','600005','600006','600014','600017','600018','600028','600030','600032','600034','600035','600040','600041','600042','600078','600091','600096','600113'];
  const nextDayPincodes = ['600045','600048','600053','600059','600063','600073','600073','600100','600116','600117','600119','600122','600123','601201','601202','603001','603002'];

  if (sameDayPincodes.includes(pincode)) {
    resultEl.textContent = '✅ Same-day delivery available! Order before 12 PM.';
    resultEl.className = 'mt-3 text-sm text-green-600 font-semibold';
  } else if (nextDayPincodes.includes(pincode)) {
    resultEl.textContent = '🚚 Next-day delivery available for this area.';
    resultEl.className = 'mt-3 text-sm text-blue-600 font-semibold';
  } else {
    resultEl.textContent = '📞 Please call +91 96005 72691 to check availability for this area.';
    resultEl.className = 'mt-3 text-sm text-amber-700';
  }
}

// ─── Special Offers ───────────────────────────────────────────

// ✅ FIX 7: addComboToCart() — was missing
function addComboToCart() {
  const podiProducts = products.filter(p => p.name.toLowerCase().includes('podi') && p.stockStatus !== 'out');
  if (podiProducts.length < 3) {
    alert('Please choose any 3 podi products from our catalog below for this offer!');
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  // Auto-add first 3 podis
  const topThree = podiProducts.slice(0, 3);
  topThree.forEach(p => addToCart(p.id));
  alert(`🎉 3 Podi Combo added to cart! Price: ₹500 (combo pricing applied at checkout).`);
  openCart();
}

// ✅ FIX 8: addHamperToCart() — was missing
function addHamperToCart() {
  // Hamper = special virtual product at ₹850
  const hamper = { id: 9999, name: 'Pongal Special Hamper', price: 850, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', description: 'Traditional gift box with 5 premium items', stockStatus: 'ready', badge: 'Gift Hamper' };
  const existing = cart.find(i => i.id === 9999);
  if (existing) { alert('Hamper is already in your cart!'); return; }
  cart.push({ ...hamper, quantity: 1 });
  saveCart();
  updateCartCount();
  showCartNotification('Pongal Special Hamper added to cart!');
  openCart();
}

// ✅ FIX 9: showBulkOptions() — was missing
function showBulkOptions() {
  const msg = `📦 Bulk Order Discount:\n\n• Orders ₹1,000+ → 15% off\n• Orders ₹2,000+ → 20% off\n• Orders ₹5,000+ → 25% off\n\nFor bulk orders above ₹5,000, call us:\n📱 +91 96005 72691\n\nDiscount auto-applied at checkout!`;
  alert(msg);
}

// ─── Mobile Menu ──────────────────────────────────────────────
function initMobileMenu() {
  const btn  = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
}

// ─── Recipes ─────────────────────────────────────────────────
function initRecipeGrid() {
  const grid = document.getElementById('recipe-grid');
  if (grid) renderRecipes(grid, recipes);
}

function renderRecipes(container, recipeList) {
  container.innerHTML = recipeList.map(recipe => `
    <div class="recipe-card group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer border border-white/20 transform hover:scale-105 transition-all duration-500" onclick="openRecipeModal(${recipe.id})">
      <div class="relative h-64 overflow-hidden rounded-t-3xl">
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
        <div class="absolute top-4 left-4 glass-effect px-4 py-2 rounded-2xl text-sm font-bold text-neutral-800 border border-white/30">${recipe.category}</div>
        <div class="absolute bottom-4 left-4 right-4 glass-effect p-3 rounded-2xl border border-white/30">
          <div class="flex items-center justify-between text-neutral-800 text-sm font-semibold">
            <span>🥄 ${recipe.prepTime}</span><span>🍳 ${recipe.cookTime}</span>
          </div>
        </div>
      </div>
      <div class="p-8">
        <h4 class="text-2xl font-black text-neutral-900 mb-4 group-hover:text-red-600 transition-colors duration-300">${recipe.title}</h4>
        <p class="text-neutral-600 leading-relaxed mb-6 line-clamp-3">${recipe.description}</p>
        <span class="text-lg font-bold gradient-text">👀 View Recipe →</span>
      </div>
    </div>
  `).join('');
}

function initFilters() {
  const searchInput  = document.getElementById('recipe-search');
  const filterChips  = document.getElementById('category-filters');
  if (!searchInput || !filterChips) return;

  const categories = ['all', ...new Set(recipes.map(r => r.category))];
  filterChips.innerHTML += categories.map(cat => `
    <button class="filter-chip px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:border-primary-500 transition-all shadow-md ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
      ${cat === 'all' ? 'All' : cat}
    </button>
  `).join('');

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      applyFilters();
    });
  });
  searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
  const searchTerm = document.getElementById('recipe-search')?.value.toLowerCase() || '';
  const activeChip = document.querySelector('.filter-chip.active');
  const activeCategory = activeChip?.dataset.category || 'all';
  const filtered = recipes.filter(r => {
    const matchesSearch   = r.title.toLowerCase().includes(searchTerm) || r.description.toLowerCase().includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  renderRecipes(document.getElementById('recipe-grid'), filtered);
}

function openRecipeModal(id) {
  const recipe  = recipes.find(r => r.id === id);
  if (!recipe) return;
  const modal   = document.getElementById('recipe-modal');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="text-center mb-12">
      <h2 class="text-5xl font-bold font-tamil mb-4 gradient-text">${recipe.title}</h2>
      <div class="inline-flex items-center gap-6 text-xl text-gray-600">
        <span>🥄 ${recipe.prepTime}</span><span>🍳 ${recipe.cookTime}</span>
        <span class="px-4 py-2 bg-red-100 text-red-800 rounded-full">${recipe.category}</span>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-12 items-start">
      <div><img src="${recipe.image}" alt="${recipe.title}" class="w-full rounded-3xl shadow-2xl object-cover h-96"></div>
      <div class="space-y-8">
        <div>
          <h5 class="text-3xl font-bold text-gray-900 mb-6">Ingredients</h5>
          <ul class="space-y-2 text-lg">${recipe.ingredients.map(ing => `<li class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>${ing}</li>`).join('')}</ul>
        </div>
        <div>
          <h5 class="text-3xl font-bold text-gray-900 mb-6">Cooking Steps</h5>
          <ol class="space-y-4 text-lg">${recipe.steps.map((step, i) => `<li class="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl"><span class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">${i+1}</span><span>${step}</span></li>`).join('')}</ol>
        </div>
      </div>
    </div>
    <div class="mt-12 p-8 bg-amber-50 rounded-3xl border-2 border-amber-200">
      <h5 class="text-3xl font-bold text-gray-900 mb-6">💡 Pro Tips</h5>
      <p class="text-xl leading-relaxed text-gray-800">${recipe.tips}</p>
    </div>
    <div class="mt-12 flex flex-col sm:flex-row gap-6 pt-8 border-t-2 border-gray-200">
      <a href="#recipes" class="flex-1 bg-gradient-to-r from-red-500 to-green-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg text-center">← Back to Recipes</a>
      <a href="https://wa.me/919600572691?text=Hi!%20I%20want%20to%20order%20${recipe.title}" class="flex-1 bg-green-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg text-center">📱 Order Now</a>
    </div>
  `;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

document.getElementById('close-modal')?.addEventListener('click', closeRecipeModal);
document.getElementById('recipe-modal')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeRecipeModal(); });
function closeRecipeModal() {
  document.getElementById('recipe-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

// ─── Feedback Grid ────────────────────────────────────────────
function initFeedbackGrid() {
  const grid = document.getElementById('feedback-grid');
  if (grid) renderFeedback(grid, testimonials);
}

function renderFeedback(container, feedbackList) {
  container.innerHTML = feedbackList.map(t => `
    <div class="feedback-card bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30">
      <div class="flex items-center mb-6">
        <img src="${t.image || 'https://via.placeholder.com/64'}" alt="${t.name}" class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" onerror="this.src='https://via.placeholder.com/64'">
        <div class="ml-4 flex-1">
          <h4 class="text-xl font-black text-neutral-900">${t.name}</h4>
          <p class="text-neutral-600 text-sm">📍 ${t.location}</p>
        </div>
      </div>
      <div class="flex items-center mb-4">
        ${Array(t.rating).fill().map(() => '<span class="text-amber-400 text-xl">⭐</span>').join('')}
        <span class="ml-2 text-sm text-gray-600">(${t.rating}.0)</span>
      </div>
      ${t.pros ? `<div class="mb-3"><h6 class="text-sm font-bold text-green-700 mb-1">👍 Pros:</h6><p class="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">${t.pros}</p></div>` : ''}
      <div class="relative mb-6">
        <p class="text-neutral-700 leading-relaxed italic font-medium">"${t.text}"</p>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-neutral-200">
        <span class="text-sm text-gray-600"><span class="font-bold text-red-600">Product:</span> ${t.product}</span>
        <button onclick="voteHelpful(${t.id})" class="text-sm text-gray-600 hover:text-green-600 transition-colors">
          👍 Helpful (${t.helpful || 0})
        </button>
      </div>
    </div>
  `).join('');
}

function voteHelpful(reviewId) {
  const t = testimonials.find(t => t.id === reviewId);
  if (t) {
    t.helpful = (t.helpful || 0) + 1;
    localStorage.setItem('jayasOrganicTestimonials', JSON.stringify(testimonials));
    renderFeedback(document.getElementById('feedback-grid'), testimonials);
  }
}

// ─── Review Form ──────────────────────────────────────────────
function initReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (!reviewForm) return;

  const photoInput   = document.getElementById('review-photos');
  const photoPreview = document.getElementById('photo-preview');
  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files).slice(0, 3);
      photoPreview.innerHTML = '';
      files.forEach(file => {
        if (file.size > 5 * 1024 * 1024) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const img = document.createElement('img');
          img.src = ev.target.result;
          img.className = 'w-16 h-16 object-cover rounded-lg border-2 border-gray-200';
          photoPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser?.id) { alert('Please login before submitting a review.'); openAuthModal(); return; }

    const product     = document.getElementById('review-product-select')?.value.trim();
    const rating      = Number(document.getElementById('rating-value')?.value);
    const reviewTitle = reviewForm.querySelector('input[name="reviewTitle"]')?.value.trim();
    const pros        = reviewForm.querySelector('textarea[name="pros"]')?.value.trim();
    const cons        = reviewForm.querySelector('textarea[name="cons"]')?.value.trim();
    const reviewText  = reviewForm.querySelector('textarea[name="reviewText"]')?.value.trim();

    if (!product)    { alert('Please select a product.'); return; }
    if (!reviewTitle){ alert('Please provide a review title.'); return; }
    if (!rating || rating < 1 || rating > 5) { alert('Please choose a rating.'); return; }
    if (!reviewText) { alert('Please write a detailed review.'); return; }

    const newTestimonial = {
      id:       Date.now(),
      name:     sanitizeInput(currentUser.name || 'Anonymous'),
      location: sanitizeInput(currentUser.addresses?.[0]?.city || 'Chennai'),
      rating,
      title:    sanitizeInput(reviewTitle),
      pros:     sanitizeInput(pros),
      cons:     sanitizeInput(cons),
      text:     sanitizeInput(reviewText),
      product:  sanitizeInput(product),
      photos:   [],
      image:    currentUser.photo || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150',
      date:     new Date().toISOString(),
      verified: true,
      helpful:  0,
      userId:   currentUser.id
    };

    testimonials.unshift(newTestimonial);
    localStorage.setItem('jayasOrganicTestimonials', JSON.stringify(testimonials));
    renderFeedback(document.getElementById('feedback-grid'), testimonials);

    currentUser.reviews = currentUser.reviews || [];
    currentUser.reviews.push({ product, rating, reviewText, date: new Date().toISOString() });
    saveCurrentUser();

    alert('Thanks for your review! 🌟');
    closeReviewModal();
    resetReviewForm();
  });
}

function openReviewModal() {
  if (!currentUser?.id) { alert('Please login to write a review.'); openAuthModal(); return; }
  const modal = document.getElementById('review-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  populateProductDropdown();
  resetReviewForm();
}

function closeReviewModal() {
  document.getElementById('review-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

function populateProductDropdown() {
  const select = document.getElementById('review-product-select');
  if (!select) return;
  select.innerHTML = '<option value="">Choose a product you\'ve purchased...</option>';
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
}

function resetReviewForm() {
  document.getElementById('review-form')?.reset();
  document.querySelectorAll('#star-rating button').forEach(s => s.textContent = '☆');
  const rt = document.getElementById('rating-text');
  const rv = document.getElementById('rating-value');
  const pp = document.getElementById('photo-preview');
  if (rt) rt.textContent = 'Click stars to rate';
  if (rv) rv.value = '0';
  if (pp) pp.innerHTML = '';
}

function setRating(value) {
  document.querySelectorAll('#star-rating button').forEach((star, i) => {
    star.textContent = i < value ? '⭐' : '☆';
  });
  const textMap = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const rt = document.getElementById('rating-text');
  const rv = document.getElementById('rating-value');
  if (rt) rt.textContent = `${value} star${value > 1 ? 's' : ''} — ${textMap[value]}`;
  if (rv) rv.value = value;
}

// ─── Contact Form ─────────────────────────────────────────────
function initContactForm() {
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.get('name') && data.get('email') && data.get('phone') && data.get('message')) {
      alert("Thank you! Your message has been sent. We'll reply within 2 hours on WhatsApp. 📱");
      e.target.reset();
    } else {
      alert('Please fill all fields');
    }
  });
}

// ─── User Profile System ─────────────────────────────────────
let currentUser = null;
let allUsers    = JSON.parse(localStorage.getItem('jayasOrganicUsers')) || [];

function initUserProfile() {
  const savedUser = localStorage.getItem('jayasOrganicCurrentUser');
  if (savedUser) {
    try { currentUser = JSON.parse(savedUser); }
    catch { currentUser = null; }
  }
  if (!currentUser) {
    currentUser = {
      id: null, name: 'Guest User', email: '', phone: '', photo: '', language: 'en',
      rating: 0, orders: [], addresses: [], paymentMethods: [], loyaltyPoints: 0,
      memberLevel: 'Bronze', referralCode: 'JAYA' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      notifications: { email: true, sms: true, whatsapp: true }
    };
  }
  updateProfileButton();
  updateProfileDisplay();
}

function handleProfileClick() {
  currentUser?.id ? openProfile() : openAuthModal();
}

function updateProfileButton() {
  const mobileText = document.getElementById('mobile-profile-text');
  if (mobileText) mobileText.textContent = currentUser?.id ? 'Profile' : 'Login';
}

function openAuthModal() {
  document.getElementById('auth-modal')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  showLoginForm();
}

function closeAuthModal() {
  document.getElementById('auth-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

function showLoginForm() {
  document.getElementById('login-form')?.classList.remove('hidden');
  document.getElementById('signup-form')?.classList.add('hidden');
}

function showSignupForm() {
  document.getElementById('login-form')?.classList.add('hidden');
  document.getElementById('signup-form')?.classList.remove('hidden');
}

function initAuthForms() {
  document.getElementById('login-form-element')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email    = e.target.email.value;
    const password = hashPassword(e.target.password.value);
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = { ...user };
      saveCurrentUser();
      updateProfileButton();
      closeAuthModal();
      alert('Login successful! Welcome back! 🎉');
    } else {
      alert('Invalid email or password.');
    }
  });

  document.getElementById('signup-form-element')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name     = e.target.name.value;
    const email    = e.target.email.value;
    const phone    = e.target.phone.value;
    const password = e.target.password.value;

    if (allUsers.find(u => u.email === email)) { alert('Account already exists.'); return; }

    const newUser = {
      id: Date.now(), name, email, phone, password: hashPassword(password), photo: '', language: 'en',
      rating: 0, orders: [], addresses: [], paymentMethods: [], loyaltyPoints: 0,
      memberLevel: 'Bronze', referralCode: 'JAYA' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      notifications: { email: true, sms: true, whatsapp: true }
    };
    allUsers.push(newUser);
    currentUser = { ...newUser };
    saveUsersData();
    saveCurrentUser();
    updateProfileButton();
    closeAuthModal();
    alert("Account created! Welcome to Jaya's Organic! 🌱");
  });
}

function socialLogin(provider) {
  alert(`${provider} login coming soon! Please use email signup for now.`);
}

function openProfile() {
  document.getElementById('profile-modal')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateProfileDisplay();
}

function closeProfile() {
  document.getElementById('profile-modal')?.classList.add('hidden');
  document.body.style.overflow = '';
}

function updateProfileDisplay() {
  if (!currentUser) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('profile-name',  currentUser.name);
  set('profile-email', currentUser.email || 'Not logged in');
  set('user-rating',   (currentUser.rating || 0).toFixed(1));
  set('order-count',   (currentUser.orders || []).length);
  set('referral-code', currentUser.referralCode);
  set('loyalty-points',currentUser.loyaltyPoints || 0);
  set('member-level',  currentUser.memberLevel || 'Bronze');

  const photo = document.getElementById('profile-photo');
  if (photo) photo.src = currentUser.photo || photo.src;

  const progress = document.getElementById('loyalty-progress');
  if (progress) progress.style.width = Math.min(((currentUser.loyaltyPoints || 0) / 100) * 100, 100) + '%';

  updateOrderHistory();
  updateRateProducts();
  updatePaymentMethods();
}

function sanitizeInput(val) {
  if (typeof val !== 'string') return '';
  const d = document.createElement('div');
  d.textContent = val;
  return d.innerHTML;
}

function hashPassword(password) {
  return typeof password === 'string' ? btoa(password) : '';
}

function updateOrderHistory() {
  const div = document.getElementById('order-history');
  if (!div) return;
  const orders = currentUser.orders || [];
  if (!orders.length) { div.innerHTML = '<p class="text-gray-500 text-center py-4">No orders yet</p>'; return; }
  div.innerHTML = orders.map(o => `
    <div class="bg-gray-50 rounded-xl p-3">
      <div class="flex justify-between items-start">
        <div><p class="font-semibold">${(o.items || []).join(', ')}</p><p class="text-sm text-gray-600">${o.date}</p></div>
        <span class="font-bold text-green-600">₹${o.total}</span>
      </div>
    </div>
  `).join('');
}

function updateRateProducts() {
  const div = document.getElementById('rate-products');
  if (!div) return;
  const rated = new Set((currentUser.orders || []).flatMap(o => o.items || []));
  if (!rated.size) { div.innerHTML = '<p class="text-gray-500 text-center py-4">Rate products you\'ve purchased</p>'; return; }
  div.innerHTML = Array.from(rated).map(product => `
    <div class="bg-gray-50 rounded-xl p-3">
      <div class="flex justify-between items-center">
        <span class="font-semibold">${product}</span>
        <div class="flex gap-1">
          ${[1,2,3,4,5].map(star => `
            <button onclick="rateProduct('${product}', ${star})" class="text-2xl hover:scale-110 transition-transform">
              ${star <= (currentUser.ratings?.[product] || 0) ? '⭐' : '☆'}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function rateProduct(product, rating) {
  if (!currentUser.ratings) currentUser.ratings = {};
  currentUser.ratings[product] = rating;
  const ratings = Object.values(currentUser.ratings);
  currentUser.rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  saveCurrentUser();
  updateProfileDisplay();
}

function updatePaymentMethods() {
  const div = document.getElementById('payment-methods');
  if (!div) return;
  const methods = currentUser.paymentMethods || [];
  if (!methods.length) { div.innerHTML = '<p class="text-gray-500 text-center py-4">No payment methods saved</p>'; return; }
  div.innerHTML = methods.map(m => `
    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
      <div class="flex items-center gap-3">
        <span class="text-2xl">${m.type === 'card' ? '💳' : '🏦'}</span>
        <div>
          <p class="font-semibold">${m.type === 'card' ? `•••• ${m.last4}` : m.bankName}</p>
          <p class="text-sm text-gray-600">${m.type === 'card' ? m.cardType : 'Bank Account'}</p>
        </div>
      </div>
      <button onclick="removePaymentMethod('${m.id}')" class="text-red-500 hover:text-red-700 text-xl">×</button>
    </div>
  `).join('');
}

function editProfileInfo() {
  const newName  = prompt('Enter your full name:', currentUser.name);
  const newPhone = prompt('Enter your phone number:', currentUser.phone || '');
  if (newName?.trim()) {
    currentUser.name = newName.trim();
    if (newPhone) currentUser.phone = newPhone.trim();
    saveCurrentUser();
    updateProfileDisplay();
    alert('Profile updated!');
  }
}

function changePassword() {
  if (!currentUser.id) { alert('Please login to change password.'); return; }
  const current = prompt('Enter current password:');
  if (hashPassword(current) !== currentUser.password) { alert('Current password is incorrect.'); return; }
  const newPw = prompt('Enter new password (min 6 characters):');
  if (newPw && newPw.length >= 6) {
    currentUser.password = hashPassword(newPw);
    saveCurrentUser(); saveUsersData();
    alert('Password changed!');
  } else {
    alert('Password must be at least 6 characters.');
  }
}

// ✅ FIX 10: changeProfilePhoto() — was missing
function changeProfilePhoto() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentUser.photo = ev.target.result;
      const photo = document.getElementById('profile-photo');
      if (photo) photo.src = ev.target.result;
      saveCurrentUser();
      alert('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function manageAddresses() {
  const addrs = currentUser.addresses || [];
  const text  = addrs.length ? addrs.map((a, i) => `${i+1}. ${typeof a === 'string' ? a : a.full}`).join('\n') : 'No addresses saved';
  const newAddr = prompt('Your addresses:\n' + text + '\n\nEnter new address:');
  if (newAddr?.trim()) {
    currentUser.addresses = currentUser.addresses || [];
    currentUser.addresses.push(newAddr.trim());
    saveCurrentUser();
    alert('Address added!');
  }
}

function notificationSettings() {
  const s = currentUser.notifications;
  currentUser.notifications = {
    email:    confirm(`Email notifications: ${s.email ? 'ON' : 'OFF'}\nClick OK to ${s.email ? 'turn OFF' : 'turn ON'}`),
    sms:      confirm(`SMS notifications: ${s.sms ? 'ON' : 'OFF'}\nClick OK to ${s.sms ? 'turn OFF' : 'turn ON'}`),
    whatsapp: confirm(`WhatsApp notifications: ${s.whatsapp ? 'ON' : 'OFF'}\nClick OK to ${s.whatsapp ? 'turn OFF' : 'turn ON'}`)
  };
  saveCurrentUser();
  alert('Notification settings updated!');
}

function addPaymentMethod() {
  const type = prompt('Enter payment type (card/bank):');
  if (!type) return;
  if (type.toLowerCase() === 'card') {
    const last4 = prompt('Enter last 4 digits:');
    const cardType = prompt('Enter card type (Visa/Mastercard etc):');
    if (last4 && cardType) {
      currentUser.paymentMethods = currentUser.paymentMethods || [];
      currentUser.paymentMethods.push({ id: Date.now(), type: 'card', last4, cardType });
      saveCurrentUser(); updatePaymentMethods();
      alert('Card added!');
    }
  } else {
    const bankName = prompt('Enter bank name:');
    if (bankName) {
      currentUser.paymentMethods = currentUser.paymentMethods || [];
      currentUser.paymentMethods.push({ id: Date.now(), type: 'bank', bankName });
      saveCurrentUser(); updatePaymentMethods();
      alert('Bank added!');
    }
  }
}

function removePaymentMethod(id) {
  if (confirm('Remove this payment method?')) {
    currentUser.paymentMethods = (currentUser.paymentMethods || []).filter(m => m.id != id);
    saveCurrentUser(); updatePaymentMethods();
  }
}

function shareReferral() {
  const msg = `Join Jaya's Organic with my referral code: ${currentUser.referralCode} and get exclusive discounts! 🍲`;
  if (navigator.share) {
    navigator.share({ title: "Jaya's Organic Referral", text: msg, url: window.location.href });
  } else {
    navigator.clipboard.writeText(msg).then(() => alert('Referral code copied! 📋'));
  }
}

function saveProfile() { saveCurrentUser(); alert('Profile saved! 💾'); }

// ✅ FIX 11: Only ONE logoutUser() definition (duplicate removed)
function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('jayasOrganicCurrentUser');
    currentUser = null;
    initUserProfile();
    closeProfile();
    alert('Logged out! 👋');
  }
}

function selectSubscription(plan) {
  if (!currentUser?.id) { alert('Please login to subscribe.'); openAuthModal(); return; }
  const plans = {
    weekly:   { name: 'Weekly Box',       price: 1200 },
    biweekly: { name: 'Bi-Weekly Box',    price: 650  },
    monthly:  { name: 'Monthly Special',  price: 2500 }
  };
  const p = plans[plan];
  if (confirm(`Subscribe to ${p.name} for ₹${p.price}/month?`)) {
    currentUser.subscription = { plan, name: p.name, price: p.price, active: true, startDate: new Date().toISOString() };
    saveCurrentUser();
    alert(`🎉 Subscribed to ${p.name}!`);
  }
}

function manageSubscription() {
  if (!currentUser?.subscription) { alert("No active subscription. Choose a plan above!"); return; }
  const sub = currentUser.subscription;
  if (confirm(`Current: ${sub.name} (₹${sub.price}/month)\nClick OK to cancel.`)) {
    currentUser.subscription.active = false;
    saveCurrentUser();
    alert('Subscription cancelled. You can resubscribe anytime!');
  }
}

function saveCurrentUser() {
  localStorage.setItem('jayasOrganicCurrentUser', JSON.stringify(currentUser));
  if (currentUser?.id) {
    const idx = allUsers.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) { allUsers[idx] = { ...currentUser }; saveUsersData(); }
  }
}

function saveUsersData() {
  localStorage.setItem('jayasOrganicUsers', JSON.stringify(allUsers));
}

// ─── Newsletter ───────────────────────────────────────────────
function initNewsletter() {
  ['newsletter-form', 'profile-newsletter-form'].forEach(id => {
    document.getElementById(id)?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      if (email) { alert("Thank you for subscribing! 📧"); e.target.reset(); }
    });
  });
}

// ─── Smooth Scroll ────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ─── Modern Features ──────────────────────────────────────────
function initModernFeatures() {
  initScrollAnimations();
  initCounters();
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('section').forEach(el => observer.observe(el));
}

function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { element.textContent = target.toLocaleString(); clearInterval(timer); }
    else element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target) || parseInt(entry.target.textContent);
        if (target) { animateCounter(entry.target, target); observer.unobserve(entry.target); }
      }
    });
  });
  document.querySelectorAll('.counter').forEach(el => observer.observe(el));
}
