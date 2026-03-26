const recipes = [
  {
    id: 1,
    title: "Pirandai Thokku",
    category: "South Indian",
    image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ",
    description: "Pirandai Thokku – Traditional Tamil side dish made with pirandai; tasty and healthy. Perfect combo with rice, idli, and dosa 👍",
    ingredients: [
      "Pirandai – 1 cup (cleaned & chopped)",
      "Oil – 2 tbsp",
      "Tamarind – small lemon size",
      "Dry red chillies – 4–6",
      "Garlic – 5 cloves",
      "Mustard seeds – 1 tsp",
      "Urad dal – 1 tsp",
      "Asafoetida – a pinch",
      "Turmeric powder – ¼ tsp",
      "Salt – as needed"
    ],
    steps: [
      "1. Prepare pirandai",
      "2. Roast ingredients",
      "3. Grind into paste",
      "4. Temper and mix well"
    ],
    tips: "Cook pirandai well to reduce bitterness. Use enough oil for better taste and shelf life.",
    prepTime: "10 mins",
    cookTime: "20 mins"
  },

  {
    id: 2,
    title: "Idli Podi",
    category: "South Indian",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdl5necT5OCNgYCMAfuzjwmtI5MfKUtF0zaA&s",
    description: "Idli Podi – Spicy and aromatic South Indian powder; best side dish for idli and dosa.",
    ingredients: [
      "Dry red chillies – 10-12",
      "Chana dal – 2 tbsp",
      "Urad dal – 2 tbsp",
      "Sesame seeds – 1 tbsp",
      "Garlic – 4 cloves",
      "Asafoetida – a pinch",
      "Salt – as needed"
    ],
    steps: [
      "1. Roast chillies, chana dal, and urad dal separately",
      "2. Lightly roast sesame seeds",
      "3. Cool and grind with garlic, salt, and asafoetida",
      "4. Store in an airtight container"
    ],
    tips: "Roast ingredients well for rich flavor. Add sesame oil while serving.",
    prepTime: "10 mins",
    cookTime: "10 mins"
  },

  {
    id: 3,
    title: "Karuppu Ulundhu Idli Podi",
    category: "Tamil Special",
    image: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/LrBYq8Tch75ooqpsi4Bm.jpg",
    description: "Karuppu Ulundhu Podi – Healthy traditional powder; good for bone strength.",
    ingredients: [
      "Black urad dal – 1/2 cup",
      "Dry red chillies – 5",
      "Garlic – 5 cloves",
      "Salt – as needed"
    ],
    steps: [
      "1. Roast urad dal",
      "2. Roast chillies and garlic",
      "3. Grind everything",
      "4. Store and use"
    ],
    tips: "Good for health and strength.",
    prepTime: "10 mins",
    cookTime: "15 mins"
  },

  {
    id: 4,
    title: "Ellu Podi",
    category: "Side Dish",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s",
    description: "Ellu Podi – Delicious sesame powder; great combo with rice.",
    ingredients: [
      "Sesame seeds – 1/2 cup",
      "Dry red chillies – 4",
      "Garlic – 3 cloves",
      "Salt – as needed"
    ],
    steps: [
      "1. Roast sesame seeds",
      "2. Roast chillies and garlic",
      "3. Grind everything",
      "4. Store properly"
    ],
    tips: "Do not over roast sesame seeds.",
    prepTime: "10 mins",
    cookTime: "10 mins"
  },

  {
    id: 5,
    title: "Vallarai Podi",
    category: "Healthy",
    image: "https://in.gramango.com/uploads/products/1650698310vpg.jpg",
    description: "Vallarai Podi – Traditional powder that supports memory and health.",
    ingredients: [
      "Vallarai leaves – 1 cup",
      "Dry red chillies – 4",
      "Garlic – 3 cloves",
      "Salt – as needed"
    ],
    steps: [
      "1. Roast vallarai leaves",
      "2. Add chillies and garlic, roast",
      "3. Grind everything",
      "4. Store properly"
    ],
    tips: "Good for brain health.",
    prepTime: "10 mins",
    cookTime: "10 mins"
  },

  {
    id: 6,
    title: "Sambar Powder",
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    description: "Authentic Sambar Powder – Essential spice mix for making delicious sambar.",
    ingredients: [
      "Coriander seeds – 1/2 cup",
      "Dry red chillies – 10-12",
      "Chana dal – 2 tbsp",
      "Urad dal – 2 tbsp",
      "Fenugreek seeds – 1 tsp",
      "Turmeric powder – 1 tsp",
      "Asafoetida – 1/2 tsp",
      "Oil – 1 tbsp"
    ],
    steps: [
      "1. Heat oil and roast coriander seeds until fragrant",
      "2. Add chana dal, urad dal, and fenugreek seeds, roast",
      "3. Add chillies and asafoetida, roast lightly",
      "4. Cool and grind with turmeric"
    ],
    tips: "Store in airtight container. Use within 6 months for best flavor.",
    prepTime: "5 mins",
    cookTime: "15 mins"
  },

  {
    id: 7,
    title: "Rasam Powder",
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    description: "Homemade Rasam Powder – Perfect blend for authentic Tamil rasam.",
    ingredients: [
      "Coriander seeds – 1/4 cup",
      "Cumin seeds – 1 tbsp",
      "Black pepper – 1 tsp",
      "Dry red chillies – 6-8",
      "Turmeric powder – 1/2 tsp",
      "Asafoetida – 1/4 tsp"
    ],
    steps: [
      "1. Dry roast coriander seeds and cumin seeds",
      "2. Add pepper and chillies, roast lightly",
      "3. Cool and grind with turmeric and asafoetida"
    ],
    tips: "Makes rasam aromatic and flavorful. Adjust chillies for spice level.",
    prepTime: "5 mins",
    cookTime: "10 mins"
  },

  {
    id: 8,
    title: "Curd Rice",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
    description: "Thayir Sadam – Cooling curd rice, perfect for lunch or dinner.",
    ingredients: [
      "Cooked rice – 2 cups",
      "Fresh curd – 1 cup",
      "Milk – 1/2 cup",
      "Ginger – 1 inch (grated)",
      "Green chillies – 2 (chopped)",
      "Curry leaves – few",
      "Mustard seeds – 1 tsp",
      "Urad dal – 1 tsp",
      "Oil – 1 tbsp",
      "Salt – as needed"
    ],
    steps: [
      "1. Mix curd and milk, beat well",
      "2. Add to cooked rice and mix",
      "3. Temper mustard seeds, urad dal, ginger, chillies, curry leaves",
      "4. Pour over rice and mix well"
    ],
    tips: "Use fresh curd for best taste. Serve chilled in summer.",
    prepTime: "10 mins",
    cookTime: "5 mins"
  },

  {
    id: 9,
    title: "Avial",
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Kerala-style Avial – Mixed vegetable curry with coconut.",
    ingredients: [
      "Mixed vegetables (drumstick, carrot, beans, potato) – 2 cups",
      "Coconut – 1/2 cup (grated)",
      "Green chillies – 3",
      "Cumin seeds – 1/2 tsp",
      "Turmeric powder – 1/4 tsp",
      "Curry leaves – few",
      "Coconut oil – 2 tbsp",
      "Salt – as needed"
    ],
    steps: [
      "1. Cook vegetables with turmeric and salt",
      "2. Grind coconut, chillies, cumin to paste",
      "3. Add paste to vegetables, simmer",
      "4. Finish with curry leaves and coconut oil"
    ],
    tips: "Use fresh coconut for authentic taste. Serve with rice.",
    prepTime: "15 mins",
    cookTime: "20 mins"
  },

  {
    id: 10,
    title: "Pongal",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    description: "Ven Pongal – Steamed rice and lentil dish, healthy breakfast.",
    ingredients: [
      "Rice – 1 cup",
      "Moong dal – 1/2 cup",
      "Ghee – 2 tbsp",
      "Black pepper – 1 tsp",
      "Cumin seeds – 1 tsp",
      "Cashews – 10",
      "Ginger – 1 inch (chopped)",
      "Curry leaves – few",
      "Salt – as needed"
    ],
    steps: [
      "1. Cook rice and dal with water",
      "2. Mash well when cooked",
      "3. Temper ghee with pepper, cumin, cashews, ginger, curry leaves",
      "4. Pour over pongal and mix"
    ],
    tips: "Serve hot with sambar or chutney. Add more ghee for richness.",
    prepTime: "10 mins",
    cookTime: "25 mins"
  },

  {
    id: 11,
    title: "Murungai Keerai Poriyal",
    category: "Healthy",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Drumstick Leaves Stir Fry – Nutrient-rich green vegetable dish.",
    ingredients: [
      "Murungai keerai – 2 cups",
      "Onion – 1 (chopped)",
      "Garlic – 3 cloves",
      "Dry red chillies – 2",
      "Urad dal – 1 tsp",
      "Mustard seeds – 1/2 tsp",
      "Oil – 1 tbsp",
      "Salt – as needed"
    ],
    steps: [
      "1. Wash and chop keerai",
      "2. Heat oil, temper mustard, urad dal, chillies",
      "3. Add onion and garlic, sauté",
      "4. Add keerai, cook until done"
    ],
    tips: "Rich in iron and calcium. Don't overcook to retain nutrients.",
    prepTime: "10 mins",
    cookTime: "15 mins"
  },

  {
    id: 12,
    title: "Kootu",
    category: "Vegetarian",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Vegetable Kootu – Lentil and vegetable stew with coconut.",
    ingredients: [
      "Chana dal – 1/2 cup",
      "Pumpkin – 1 cup (cubed)",
      "Coconut – 1/4 cup (grated)",
      "Green chillies – 2",
      "Cumin seeds – 1/2 tsp",
      "Turmeric powder – 1/4 tsp",
      "Salt – as needed"
    ],
    steps: [
      "1. Cook dal and pumpkin with turmeric",
      "2. Grind coconut, chillies, cumin",
      "3. Add paste to cooked mixture",
      "4. Simmer until thick"
    ],
    tips: "Use any vegetable like ash gourd or raw banana.",
    prepTime: "15 mins",
    cookTime: "20 mins"
  }
];

const products = [
  {
    id: 1,
    name: "Pirandai Thokku",
    price: "₹350",
    image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ",
    description: "Traditional Tamil side dish made with pirandai, perfect with rice"
  },
  {
    id: 2,
    name: "Curry Leaves Idli Podi",
    price: "₹200",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Aromatic podi made with curry leaves, enhances digestion"
  },
  {
    id: 3,
    name: "Ellu Podi",
    price: "₹250",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s",
    description: "Delicious sesame powder, great combo with rice"
  },
  {
    id: 4,
    name: "Vallarai Podi",
    price: "₹120",
    image: "https://in.gramango.com/uploads/products/1650698310vpg.jpg",
    description: "Brain-boosting powder made with vallarai leaves"
  },
  {
    id: 5,
    name: "Thoothuvalai Podi",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Medicinal powder from thoothuvalai leaves, supports respiratory health"
  },
  {
    id: 6,
    name: "Mudakathan Podi",
    price: "₹160",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    description: "Traditional herbal powder for joint and bone health"
  },
  {
    id: 7,
    name: "Avarampoo Idli Podi",
    price: "₹220",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    description: "Unique podi made with avarampoo flowers, rich in antioxidants"
  },
  {
    id: 8,
    name: "Karuppu Ulundhu Idli Podi",
    price: "₹450",
    image: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/LrBYq8Tch75ooqpsi4Bm.jpg",
    description: "Healthy traditional powder made with black urad dal"
  },
  {
    id: 9,
    name: "Pirandai Podi",
    price: "₹280",
    image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ",
    description: "Nutritious powder from pirandai plant, supports bone health"
  },
  {
    id: 10,
    name: "Murungai Keerai Idli Podi",
    price: "₹190",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Superfood podi made with drumstick leaves, rich in iron"
  },
  {
    id: 11,
    name: "Sambar Podi",
    price: "₹220",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    description: "Authentic homemade sambar powder for delicious sambar"
  },
  {
    id: 12,
    name: "Murungai Keerai Soup Mix",
    price: "₹240",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Ready-to-cook soup mix with drumstick leaves and spices"
  },
  {
    id: 13,
    name: "Poondu Podi",
    price: "₹260",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Garlic-based spice powder, boosts immunity and digestion"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "T. Nagar, Chennai",
    rating: 5,
    text: "The Pirandai Thokku is absolutely authentic and delicious! Reminds me of my grandmother's cooking. Will definitely order again.",
    product: "Pirandai Thokku",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Rajesh K.",
    location: "Adyar, Chennai",
    rating: 5,
    text: "Amazing Idli Podi! The spice level is perfect and it goes great with hot idlis. Fresh and organic as promised.",
    product: "Idli Podi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Lakshmi M.",
    location: "Velachery, Chennai",
    rating: 5,
    text: "The Vallarai Podi is not only tasty but also healthy. My kids love it and I feel good knowing it's organic.",
    product: "Vallarai Podi",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Arun V.",
    location: "Anna Nagar, Chennai",
    rating: 5,
    text: "Best homemade food in Chennai! The delivery was quick and the packaging was excellent. Highly recommend!",
    product: "Family Pack",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Kavitha R.",
    location: "Mylapore, Chennai",
    rating: 5,
    text: "The Ellu Podi is a game changer! So flavorful and aromatic. Perfect for our Sunday breakfasts.",
    product: "Ellu Podi",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Suresh N.",
    location: "Tambaram, Chennai",
    rating: 5,
    text: "Authentic Tamil taste! The Karuppu Ulundhu Podi is exactly what I was looking for. Great quality and service.",
    product: "Karuppu Ulundhu Idli Podi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Meera T.",
    location: "Royapettah, Chennai",
    rating: 5,
    text: "The Sambar Powder is amazing! Makes the most delicious sambar I've ever tasted. No artificial flavors!",
    product: "Sambar Powder",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Venkat R.",
    location: "Nungambakkam, Chennai",
    rating: 5,
    text: "Finally found authentic Rasam Powder! The aroma and taste are exactly like my mom's cooking.",
    product: "Rasam Powder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    name: "Anitha P.",
    location: "Saidapet, Chennai",
    rating: 5,
    text: "The Curry Leaves Thokku is so tangy and flavorful! Perfect with curd rice. Love the organic ingredients.",
    product: "Curry Leaves Thokku",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    name: "Karthik M.",
    location: "Teynampet, Chennai",
    rating: 5,
    text: "Organic Rice quality is outstanding! Cooks perfectly and tastes amazing. Worth every rupee.",
    product: "Organic Rice",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 11,
    name: "Deepa S.",
    location: "Kilpauk, Chennai",
    rating: 5,
    text: "The Coconut Oil is pure and fresh! Great for cooking and hair care. No chemicals detected.",
    product: "Coconut Oil",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 12,
    name: "Ravi K.",
    location: "Purasawalkam, Chennai",
    rating: 5,
    text: "Garlic Thokku is a must-try! The spice level is perfect and it lasts long. Excellent packaging.",
    product: "Garlic Thokku",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('jayaCart')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initRecipeGrid();
  initFilters();
  initProductGrid();
  initFeedbackGrid();
  initContactForm();
  initSmoothScroll();
  initCart();
  initNewsletter();
});

// Cart Functions
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
    cart.push({
      ...product,
      quantity: 1
    });
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
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    saveCart();
    renderCart();
  }
}

function saveCart() {
  localStorage.setItem('jayaCart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  const cartCountMobileElement = document.getElementById('cart-count-mobile');
  
  if (cartCountElement) {
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? 'block' : 'none';
  }
  
  if (cartCountMobileElement) {
    cartCountMobileElement.textContent = count;
    cartCountMobileElement.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-fade-in';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartModal = document.getElementById('cart-modal');

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
    cartTotal.textContent = '₹0';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl">
      <div class="flex-1">
        <h4 class="font-semibold text-gray-900">${item.name}</h4>
        <p class="text-sm text-gray-600">${item.price}</p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">-</button>
          <span class="px-3 py-1 bg-white border rounded">${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold text-gray-900">₹${parseInt(item.price.replace('₹', '')) * item.quantity}</p>
        <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm mt-1">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);
  cartTotal.textContent = `₹${total}`;
}

function openCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderCart();
  }
}

function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function checkoutCart() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const message = cart.map(item => `${item.name} (${item.quantity}x) - ₹${parseInt(item.price.replace('₹', '')) * item.quantity}`).join('\n');
  const total = cart.reduce((sum, item) => sum + (parseInt(item.price.replace('₹', '')) * item.quantity), 0);
  const whatsappMessage = `Hi Jaya's Organic!\n\nI want to order:\n${message}\n\nTotal: ₹${total}\n\nPlease confirm delivery details.`;

  window.open(`https://wa.me/919600572691?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('hidden');
  });
}

// Recipe Grid & Filters
function initRecipeGrid() {
  const grid = document.getElementById('recipe-grid');
  renderRecipes(grid, recipes);
}

function renderRecipes(container, recipeList) {
  container.innerHTML = recipeList.map(recipe => `
    <div class="recipe-card group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer border border-white/20 transform hover:scale-105 transition-all duration-500" onclick="openRecipeModal(${recipe.id})">
      <div class="relative h-64 overflow-hidden rounded-t-3xl">
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-4 left-4 glass-effect px-4 py-2 rounded-2xl text-sm font-bold text-neutral-800 border border-white/30">
          ${recipe.category}
        </div>
        <div class="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-glow-pulse">
          ⭐ Premium
        </div>
        <div class="absolute bottom-4 left-4 right-4 glass-effect p-3 rounded-2xl border border-white/30">
          <div class="flex items-center justify-between text-neutral-800 text-sm font-semibold">
            <span class="flex items-center gap-1">🥄 ${recipe.prepTime}</span>
            <span class="flex items-center gap-1">🍳 ${recipe.cookTime}</span>
          </div>
        </div>
      </div>
      <div class="p-8">
        <h4 class="text-2xl font-black text-neutral-900 mb-4 group-hover:text-red-600 transition-colors duration-300 font-display">${recipe.title}</h4>
        <p class="text-neutral-600 leading-relaxed mb-6 line-clamp-3">${recipe.description}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold gradient-text">👀 View Recipe</span>
            <svg class="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
          <div class="w-14 h-14 bg-gradient-to-br from-red-500 via-green-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-glow-red group-hover:shadow-glow-green group-hover:rotate-12 transition-all duration-500">
            <span class="text-white text-xl animate-bounce-slow">🍲</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Filters
function initFilters() {
  const searchInput = document.getElementById('recipe-search');
  const filterChips = document.getElementById('category-filters');
  
  // Unique categories
  const categories = ['all', ...new Set(recipes.map(r => r.category))];
  
  filterChips.innerHTML += categories.map(cat => `
    <button class="filter-chip px-6 py-3 bg-white border-2 border-gray-200 rounded-full font-medium text-gray-700 hover:border-primary-500 hover:bg-primary-50 transition-all shadow-md hover:shadow-lg active:scale-95 ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
      ${cat === 'all' ? 'All' : cat}
    </button>
  `).join('');
  
  // Filter events
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
  const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
  const activeCategory = document.querySelector('.filter-chip.active').dataset.category;
  
  const filtered = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                         recipe.description.toLowerCase().includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  renderRecipes(document.getElementById('recipe-grid'), filtered);
}

// Recipe Modal
function openRecipeModal(id) {
  const recipe = recipes.find(r => r.id === id);
  const modal = document.getElementById('recipe-modal');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <div class="text-center mb-12">
      <h2 class="text-5xl font-bold font-tamil mb-4 bg-gradient-to-r from-primary-600 to-organic-green bg-clip-text text-transparent">${recipe.title}</h2>
      <div class="inline-flex items-center gap-6 text-xl text-gray-600">
        <span class="flex items-center gap-2">🥄 ${recipe.prepTime}</span>
        <span class="flex items-center gap-2">🍳 ${recipe.cookTime}</span>
        <span class="px-4 py-2 bg-primary-100 text-primary-800 rounded-full">${recipe.category}</span>
      </div>
    </div>
    
    <div class="grid md:grid-cols-2 gap-12 items-start">
      <div>
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full rounded-3xl shadow-2xl object-cover h-96">
      </div>
      
      <div class="space-y-8">
        <div>
          <h5 class="text-3xl font-bold text-gray-900 mb-6 inline-block border-b-4 border-primary-200 pb-2">Ingredients</h5>
          <ul class="space-y-2 text-lg">
            ${recipe.ingredients.map(ing => `<li class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><span class="w-2 h-2 bg-organic-green rounded-full flex-shrink-0"></span>${ing}</li>`).join('')}
          </ul>
        </div>
        
        <div>
          <h5 class="text-3xl font-bold text-gray-900 mb-6 inline-block border-b-4 border-organic-green pb-2">Cooking Steps</h5>
          <ol class="space-y-4 text-lg">
            ${recipe.steps.map((step, i) => `<li class="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-r-4 border-indigo-200 hover:shadow-md transition-all"><span class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0 mt-0.5">${i+1}</span><span>${step}</span></li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
    
    <div class="mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200">
      <h5 class="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">💡 Pro Tips</h5>
      <p class="text-xl leading-relaxed text-gray-800">${recipe.tips}</p>
    </div>
    
    <div class="mt-12 flex flex-col sm:flex-row gap-6 pt-8 border-t-2 border-gray-200">
      <a href="#recipes" class="flex-1 bg-gradient-to-r from-primary-500 to-organic-green text-white py-4 px-8 rounded-2xl font-semibold text-lg text-center hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
        ← Back to Recipes
      </a>
      <a href="https://wa.me/919600572691?text=Hi!%20I%20want%20to%20order%20${recipe.title}" class="flex-1 bg-green-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg text-center hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
        📱 Order Ingredients
      </a>
    </div>
  `;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

document.getElementById('close-modal').addEventListener('click', closeRecipeModal);
document.getElementById('recipe-modal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeRecipeModal();
});

function closeRecipeModal() {
  document.getElementById('recipe-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Products Grid
function initProductGrid() {
  const grid = document.getElementById('product-grid');
  renderProducts(grid, products);
}

function renderProducts(container, productList) {
  container.innerHTML = productList.map(product => `
    <div class="product-card bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl cursor-pointer p-2 h-[480px] flex flex-col border border-white/30 transform hover:scale-105 transition-all duration-500">
      <div class="relative h-64 overflow-hidden rounded-2xl mb-6 flex-1">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-4 right-4 glass-effect px-4 py-2 rounded-2xl font-black text-lg shadow-glow-red border border-white/30">
          <span class="gradient-text">${product.price}</span>
        </div>
        <div class="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-glow-pulse">
          🌟 Organic
        </div>
        <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="glass-effect p-3 rounded-2xl border border-white/30">
            <p class="text-neutral-800 text-sm font-semibold text-center">Premium Quality Assured</p>
          </div>
        </div>
      </div>
      <div class="p-6 flex-0">
        <h4 class="text-2xl font-black text-neutral-900 mb-4 font-display group-hover:text-red-600 transition-colors duration-300">${product.name}</h4>
        <p class="text-neutral-600 mb-6 flex-1 leading-relaxed line-clamp-2">${product.description}</p>
        <div class="flex gap-3">
          <button onclick="addToCart(${product.id})" class="flex-1 bg-gradient-to-r from-red-500 via-green-500 to-amber-500 text-white py-4 px-4 rounded-3xl font-bold text-sm hover:shadow-glow-red hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
            🛒 Add to Cart
          </button>
          <a href="https://wa.me/919600572691?text=Hi!%20I%20want%20to%20order%20${product.name.replace(/\(.*\)/, '')}" class="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-4 rounded-3xl font-bold text-sm hover:shadow-glow-green hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
            📱 Order
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// Feedback Grid
function initFeedbackGrid() {
  const grid = document.getElementById('feedback-grid');
  renderFeedback(grid, testimonials);
}

function renderFeedback(container, feedbackList) {
  container.innerHTML = feedbackList.map(testimonial => `
    <div class="feedback-card bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-105 hover:-rotate-1">
      <div class="flex items-center mb-6">
        <div class="relative">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full object-cover border-4 border-gradient p-1">
          <div class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xs">✓</span>
          </div>
        </div>
        <div class="ml-4">
          <h4 class="text-xl font-black text-neutral-900 font-display">${testimonial.name}</h4>
          <p class="text-neutral-600 text-sm font-medium flex items-center gap-1">
            📍 ${testimonial.location}
          </p>
        </div>
      </div>
      <div class="flex items-center mb-4">
        ${Array(testimonial.rating).fill().map(() => '<span class="text-amber-400 text-xl animate-pulse">⭐</span>').join('')}
        <span class="ml-2 text-sm text-neutral-600 font-semibold">(${testimonial.rating}.0)</span>
      </div>
      <div class="relative mb-6">
        <div class="absolute -left-2 -top-2 text-6xl text-red-200 font-bold">"</div>
        <p class="text-neutral-700 leading-relaxed italic pl-4 relative z-10 font-medium">"${testimonial.text}"</p>
        <div class="absolute -right-2 -bottom-2 text-6xl text-green-200 font-bold">"</div>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div class="text-sm text-neutral-600">
          <span class="font-bold text-red-600">Product:</span> <span class="font-semibold">${testimonial.product}</span>
        </div>
        <div class="flex items-center gap-1 text-green-600">
          <span class="text-sm font-bold">Verified Purchase</span>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  `).join('');
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (name && phone && message) {
      // Simulate send
      alert('Thank you! Your message has been sent. We\'ll reply within 2 hours on WhatsApp. 📱');
      form.reset();
    } else {
      alert('Please fill all fields');
    }
  });
}

// Newsletter Form
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = e.target.querySelector('input[type="email"]').value;
      
      if (email) {
        alert('Thank you for subscribing! We\'ll keep you updated with our latest recipes and products. 📧');
        e.target.reset();
      } else {
        alert('Please enter a valid email address');
      }
    });
  }
}

// Smooth Scroll Enhancement
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Live Search Enhancement (already in filters)
