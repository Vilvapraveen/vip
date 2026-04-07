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
    price: 350,
    originalPrice: 350,
    image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ",
    description: "Traditional Tamil side dish made with pirandai, perfect with rice",
    stockStatus: "ready",
    preparationTime: "Ready in 2-3 days",
    shelfLife: "Best before 6 months",
    allergens: "Contains sesame",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 45
  },
  {
    id: 2,
    name: "Curry Leaves Idli Podi",
    price: 200,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Aromatic podi made with curry leaves, enhances digestion",
    stockStatus: "ready",
    preparationTime: "Made to order",
    shelfLife: "Best before 3 months",
    allergens: "None",
    badge: "No Preservatives",
    rating: 4.9,
    reviews: 32
  },
  {
    id: 3,
    name: "Ellu Podi",
    price: 250,
    originalPrice: 250,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFZnu6TJZ_7ATeuZGji5sN2p0lnjRERuryA&s",
    description: "Delicious sesame powder, great combo with rice",
    stockStatus: "ready",
    preparationTime: "Ready in 1-2 days",
    shelfLife: "Best before 4 months",
    allergens: "Contains sesame",
    badge: "Best Seller",
    rating: 4.7,
    reviews: 28
  },
  {
    id: 4,
    name: "Vallarai Podi",
    price: 120,
    originalPrice: 120,
    image: "https://in.gramango.com/uploads/products/1650698310vpg.jpg",
    description: "Brain-boosting powder made with vallarai leaves",
    stockStatus: "ready",
    preparationTime: "Made to order",
    shelfLife: "Best before 2 months",
    allergens: "None",
    badge: "Herbal Supplement",
    rating: 4.6,
    reviews: 19
  },
  {
    id: 5,
    name: "Thoothuvalai Podi",
    price: 180,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Medicinal powder from thoothuvalai leaves, supports respiratory health",
    stockStatus: "out",
    preparationTime: "Made to order",
    shelfLife: "Best before 3 months",
    allergens: "None",
    badge: "Ayurvedic",
    rating: 4.8,
    reviews: 15
  },
  {
    id: 6,
    name: "Mudakathan Podi",
    price: 160,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    description: "Traditional herbal powder for joint and bone health",
    stockStatus: "ready",
    preparationTime: "Ready in 2-3 days",
    shelfLife: "Best before 4 months",
    allergens: "Contains nuts",
    badge: "Joint Health",
    rating: 4.5,
    reviews: 22
  },
  {
    id: 7,
    name: "Avarampoo Idli Podi",
    price: 220,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    description: "Unique podi made with avarampoo flowers, rich in antioxidants",
    stockStatus: "ready",
    preparationTime: "Made to order",
    shelfLife: "Best before 3 months",
    allergens: "None",
    badge: "Antioxidant Rich",
    rating: 4.7,
    reviews: 18
  },
  {
    id: 8,
    name: "Karuppu Ulundhu Idli Podi",
    price: 450,
    originalPrice: 450,
    image: "https://img-cdn.publive.online/fit-in/640x430/filters:format(webp)/indian-express-tamil/media/media_files/LrBYq8Tch75ooqpsi4Bm.jpg",
    description: "Healthy traditional powder made with black urad dal",
    stockStatus: "ready",
    preparationTime: "Ready in 1-2 days",
    shelfLife: "Best before 6 months",
    allergens: "None",
    badge: "High Protein",
    rating: 4.9,
    reviews: 41
  },
  {
    id: 9,
    name: "Pirandai Podi",
    price: 280,
    originalPrice: 280,
    image: "https://i.ytimg.com/vi/s80e-UmMt1M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJvXrbXC4oV1_W2G2UI1aP8jExvQ",
    description: "Nutritious powder from pirandai plant, supports bone health",
    stockStatus: "ready",
    preparationTime: "Made to order",
    shelfLife: "Best before 4 months",
    allergens: "None",
    badge: "Calcium Rich",
    rating: 4.6,
    reviews: 25
  },
  {
    id: 10,
    name: "Murungai Keerai Idli Podi",
    price: 190,
    originalPrice: 190,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Superfood podi made with drumstick leaves, rich in iron",
    stockStatus: "ready",
    preparationTime: "Ready in 2-3 days",
    shelfLife: "Best before 2 months",
    allergens: "None",
    badge: "Iron Rich",
    rating: 4.8,
    reviews: 33
  },
  {
    id: 11,
    name: "Sambar Podi",
    price: 220,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    description: "Authentic homemade sambar powder for delicious sambar",
    stockStatus: "ready",
    preparationTime: "Ready in 1-2 days",
    shelfLife: "Best before 6 months",
    allergens: "None",
    badge: "Traditional Recipe",
    rating: 4.7,
    reviews: 38
  },
  {
    id: 12,
    name: "Murungai Keerai Soup Mix",
    price: 240,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Ready-to-cook soup mix with drumstick leaves and spices",
    stockStatus: "ready",
    preparationTime: "Made to order",
    shelfLife: "Best before 3 months",
    allergens: "None",
    badge: "Ready to Cook",
    rating: 4.5,
    reviews: 16
  },
  {
    id: 13,
    name: "Poondu Podi",
    price: 260,
    originalPrice: 260,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop",
    description: "Garlic-based spice powder, boosts immunity and digestion",
    stockStatus: "ready",
    preparationTime: "Ready in 1-2 days",
    shelfLife: "Best before 4 months",
    allergens: "Contains garlic",
    badge: "Immunity Booster",
    rating: 4.6,
    reviews: 29
  }
];

let testimonials = JSON.parse(localStorage.getItem('jayasOrganicTestimonials')) || [
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
  initUserProfile();
  initAuthForms();
  initReviewForm();
});

// Cart Functions
function initCart() {
  updateCartCount();
  renderCart();
}

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
  const stickyCartCountElement = document.getElementById('sticky-cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? 'block' : 'none';
  }
  
  if (cartCountMobileElement) {
    cartCountMobileElement.textContent = count;
    cartCountMobileElement.style.display = count > 0 ? 'inline-block' : 'none';
  }

  if (stickyCartCountElement) {
    stickyCartCountElement.textContent = count;
    stickyCartCountElement.style.display = count > 0 ? 'flex' : 'none';
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

  // Calculate totals with discounts
  const cartCalculation = calculateCartTotal();

  // Add discount information to cart
  let discountHTML = '';
  if (cartCalculation.comboOffers.length > 0) {
    discountHTML += cartCalculation.comboOffers.map(offer => `
      <div class="bg-green-100 border border-green-300 rounded-lg p-3 mb-2">
        <p class="text-green-800 font-semibold text-sm">🎉 ${offer.name}</p>
        <p class="text-green-700 text-xs">${offer.description}</p>
      </div>
    `).join('');
  }

  if (cartCalculation.bulkDiscount) {
    discountHTML += `
      <div class="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-2">
        <p class="text-blue-800 font-semibold text-sm">💰 Bulk Discount</p>
        <p class="text-blue-700 text-xs">${cartCalculation.bulkDiscount}</p>
      </div>
    `;
  }

  if (discountHTML) {
    cartItems.innerHTML += `
      <div class="mt-4 p-4 bg-white rounded-2xl border">
        <h4 class="font-bold text-gray-900 mb-3">🎁 Special Offers Applied</h4>
        ${discountHTML}
      </div>
    `;
  }

  // Update total display
  cartTotal.innerHTML = `
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>₹${cartCalculation.subtotal}</span>
      </div>
      ${cartCalculation.discountAmount > 0 ? `
        <div class="flex justify-between text-sm text-green-600 font-semibold">
          <span>Discount:</span>
          <span>-₹${cartCalculation.discountAmount}</span>
        </div>
      ` : ''}
      <div class="flex justify-between text-lg font-bold border-t pt-2">
        <span>Total:</span>
        <span class="gradient-text">₹${cartCalculation.total}</span>
      </div>
    </div>
  `;
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

  const cartCalculation = calculateCartTotal();
  const message = cart.map(item => `${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`).join('\n');
  const whatsappMessage = `Hi Jaya's Organic!\n\nI want to order:\n${message}\n\nSubtotal: ₹${cartCalculation.subtotal}\nDiscount: ₹${cartCalculation.discountAmount}\nTotal: ₹${cartCalculation.total}\n\nPlease confirm delivery details.`;

  // Open WhatsApp with order details
  const whatsappUrl = `https://wa.me/919600572691?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');

  // Show order confirmation modal
  showOrderConfirmation(cartCalculation);
};
    {currentUser.orders.push(order);
    
    // Add loyalty points (1 point per ₹10 spent)
    
    const pointsEarned = Math.floor(total / 10);
    currentUser.loyaltyPoints += pointsEarned;
    
    // Update member level
    if (currentUser.loyaltyPoints >= 500) {
      currentUser.memberLevel = 'Gold';
    } else if (currentUser.loyaltyPoints >= 200) {
      currentUser.memberLevel = 'Silver';
    } else if (currentUser.loyaltyPoints >= 100) {
      currentUser.memberLevel = 'Bronze';
    }
    
    saveCurrentUser();
  }{
  window.open(`https://wa.me/919600572691?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  
  // Clear cart after order
  cart = [];
  updateCartDisplay();
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
  showSkeletonLoader(grid, 6);

  // Simulate loading delay for better UX
  setTimeout(() => {
    renderProducts(grid, products);
  }, 800);
}

function renderProducts(container, productList) {
  container.innerHTML = productList.map(product => `
    <div class="product-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
        <div class="absolute top-3 left-3 flex flex-col gap-1">
          <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ${product.badge}
          </span>
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
            ${[1,2,3,4,5].map(star => `<span class="text-sm">${star <= (product.rating || 4) ? '★' : '☆'}</span>`).join('')}
          </div>
          <span class="text-xs text-gray-600">(${product.reviews || Math.floor(Math.random() * 50) + 10})</span>
        </div>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.description}</p>
        <div class="text-xs text-gray-500 mb-3">
          <div>Shelf life: ${product.shelfLife}</div>
        </div>
        <div class="flex gap-2">
          ${product.stockStatus === 'out' ?
            '<button disabled class="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">Out of Stock</button>' :
            `<button onclick="addToCart(${product.id})" class="cta-secondary flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Add to Cart
            </button>`
          }
          <a href="https://wa.me/919600572691?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(product.name)}" class="cta-primary py-2 px-4 rounded-lg text-sm font-bold transition-colors flex items-center justify-center min-w-[80px]">
            Order Now
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
        <div class="ml-4 flex-1">
          <h4 class="text-xl font-black text-neutral-900 font-display">${testimonial.name}</h4>
          <p class="text-neutral-600 text-sm font-medium flex items-center gap-1">
            📍 ${testimonial.location}
          </p>
          <p class="text-neutral-500 text-xs mt-1">${new Date(testimonial.date || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div class="mb-4">
        <h5 class="text-lg font-bold text-gray-900 mb-2">${testimonial.title || 'Review'}</h5>
        <div class="flex items-center mb-4">
          ${Array(testimonial.rating).fill().map(() => '<span class="text-amber-400 text-xl animate-pulse">⭐</span>').join('')}
          <span class="ml-2 text-sm text-neutral-600 font-semibold">(${testimonial.rating}.0)</span>
        </div>
      </div>
      
      ${testimonial.pros ? `
      <div class="mb-4">
        <h6 class="text-sm font-bold text-green-700 mb-2">👍 Pros:</h6>
        <p class="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">${testimonial.pros}</p>
      </div>
      ` : ''}
      
      ${testimonial.cons ? `
      <div class="mb-4">
        <h6 class="text-sm font-bold text-red-700 mb-2">👎 Cons:</h6>
        <p class="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">${testimonial.cons}</p>
      </div>
      ` : ''}
      
      <div class="relative mb-6">
        <div class="absolute -left-2 -top-2 text-6xl text-red-200 font-bold">"</div>
        <p class="text-neutral-700 leading-relaxed italic pl-4 relative z-10 font-medium">"${testimonial.text}"</p>
        <div class="absolute -right-2 -bottom-2 text-6xl text-green-200 font-bold">"</div>
      </div>
      
      ${testimonial.photos && testimonial.photos.length > 0 ? `
      <div class="mb-6">
        <div class="flex gap-2 flex-wrap">
          ${testimonial.photos.slice(0, 3).map(photo => `<img src="${photo}" alt="Review photo" class="w-20 h-20 object-cover rounded-lg border-2 border-gray-200">`).join('')}
        </div>
      </div>
      ` : ''}
      
      <div class="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div class="flex items-center gap-4">
          <div class="text-sm text-neutral-600">
            <span class="font-bold text-red-600">Product:</span> <span class="font-semibold">${testimonial.product}</span>
          </div>
          ${testimonial.verified ? `
          <div class="flex items-center gap-1 text-green-600">
            <span class="text-sm font-bold">Verified Purchase</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          ` : ''}
        </div>
        <div class="flex items-center gap-2">
          <button onclick="voteHelpful(${testimonial.id})" class="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
            <span>👍 Helpful</span>
            <span class="bg-gray-100 px-2 py-1 rounded text-xs">${testimonial.helpful || 0}</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (!reviewForm) return;

  // Photo upload preview
  const photoInput = document.getElementById('review-photos');
  const photoPreview = document.getElementById('photo-preview');
  
  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files).slice(0, 3); // Max 3 photos
      photoPreview.innerHTML = '';
      
      files.forEach((file, index) => {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert(`Photo ${index + 1} is too large. Please choose files under 5MB.`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'w-16 h-16 object-cover rounded-lg border-2 border-gray-200';
          photoPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.id) {
      alert('Please login before submitting a review.');
      openAuthModal();
      return;
    }

    const productSelect = document.getElementById('review-product-select');
    const ratingInput = document.getElementById('rating-value');
    const reviewTitleInput = reviewForm.querySelector('input[name="reviewTitle"]');
    const prosInput = reviewForm.querySelector('textarea[name="pros"]');
    const consInput = reviewForm.querySelector('textarea[name="cons"]');
    const reviewTextInput = reviewForm.querySelector('textarea[name="reviewText"]');
    const photoInput = document.getElementById('review-photos');

    const product = productSelect ? productSelect.value.trim() : '';
    const rating = ratingInput ? Number(ratingInput.value) : 0;
    const reviewTitle = reviewTitleInput ? reviewTitleInput.value.trim() : '';
    const pros = prosInput ? prosInput.value.trim() : '';
    const cons = consInput ? consInput.value.trim() : '';
    const reviewText = reviewTextInput ? reviewTextInput.value.trim() : '';
    const photos = photoInput ? Array.from(photoInput.files).map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
      });
    }) : [];

    if (!product) {
      alert('Please select a product you have purchased.');
      return;
    }
    if (!reviewTitle) {
      alert('Please provide a review title.');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      alert('Please choose a rating between 1 and 5 stars.');
      return;
    }
    if (!reviewText) {
      alert('Please write a detailed review.');
      return;
    }

    // Wait for photo processing
    Promise.all(photos).then(photoData => {
      const newTestimonial = {
        id: Date.now(),
        name: sanitizeInput(currentUser.name || 'Anonymous'),
        location: sanitizeInput(currentUser.addresses && currentUser.addresses.length ? currentUser.addresses[0].city || 'Your city' : 'Your city'),
        rating,
        title: sanitizeInput(reviewTitle),
        pros: sanitizeInput(pros),
        cons: sanitizeInput(cons),
        text: sanitizeInput(reviewText),
        product: sanitizeInput(product),
        photos: photoData,
        image: currentUser.photo || 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
        date: new Date().toISOString(),
        verified: true,
        helpful: 0,
        userId: currentUser.id
      };

      testimonials.unshift(newTestimonial);
      localStorage.setItem('jayasOrganicTestimonials', JSON.stringify(testimonials));
      renderFeedback(document.getElementById('feedback-grid'), testimonials);

      // Save this review to user history
      currentUser.reviews = currentUser.reviews || [];
      currentUser.reviews.push({
        product,
        rating,
        title: sanitizeInput(reviewTitle),
        pros: sanitizeInput(pros),
        cons: sanitizeInput(cons),
        reviewText: sanitizeInput(reviewText),
        photos: photoData,
        date: new Date().toISOString()
      });
      saveCurrentUser();
      saveUsersData();

      alert('Thanks for your detailed review! Your feedback has been posted. 🌟');
      closeReviewModal();
      resetReviewForm();
    });
  });
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (name && email && phone && message) {
      // Simulate send
      alert('Thank you! Your message has been sent. We\'ll reply within 2 hours on WhatsApp. 📱');
      form.reset();
    } else {
      alert('Please fill all fields');
    }
  });
}

// User Profile System
let currentUser = null;
let allUsers = JSON.parse(localStorage.getItem('jayasOrganicUsers')) || [];

function initUserProfile() {
  // Load user data from localStorage
  const savedUser = localStorage.getItem('jayasOrganicCurrentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  } else {
    // Create guest user
    currentUser = {
      id: null,
      name: 'Guest User',
      email: '',
      phone: '',
      photo: '',
      language: 'en',
      rating: 0,
      orders: [],
      addresses: [],
      paymentMethods: [],
      loyaltyPoints: 0,
      memberLevel: 'Bronze',
      referralCode: 'JAYA' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      notifications: {
        email: true,
        sms: true,
        whatsapp: true
      }
    };
  }
  updateProfileButton();
  updateProfileDisplay();
}

function handleProfileClick() {
  if (currentUser && currentUser.id) {
    openProfile();
  } else {
    openAuthModal();
  }
}

function updateProfileButton() {
  const profileBtn = document.getElementById('profile-btn');
  const mobileProfileText = document.getElementById('mobile-profile-text');
  
  if (currentUser && currentUser.id) {
    // Logged in - show profile
    if (profileBtn) profileBtn.onclick = openProfile;
    if (mobileProfileText) mobileProfileText.textContent = 'Profile';
  } else {
    // Not logged in - show login
    if (profileBtn) profileBtn.onclick = openAuthModal;
    if (mobileProfileText) mobileProfileText.textContent = 'Login';
  }
}

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  showLoginForm();
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function showLoginForm() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
}

function showSignupForm() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
}

function initAuthForms() {
  // Login form
  const loginForm = document.getElementById('login-form-element');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');
      
      const hashedPassword = hashPassword(password);
      const user = allUsers.find(u => u.email === email && u.password === hashedPassword);
      if (user) {
        currentUser = { ...user };
        saveCurrentUser();
        updateProfileButton();
        closeAuthModal();
        alert('Login successful! Welcome back! 🎉');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    });
  }
  
  // Signup form
  const signupForm = document.getElementById('signup-form-element');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(signupForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const password = formData.get('password');
      
      // Check if user already exists
      if (allUsers.find(u => u.email === email)) {
        alert('An account with this email already exists.');
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name,
        email,
        phone,
        password: hashPassword(password),
        photo: '',
        language: 'en',
        rating: 0,
        orders: [],
        addresses: [],
        paymentMethods: [],
        loyaltyPoints: 0,
        memberLevel: 'Bronze',
        referralCode: 'JAYA' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        notifications: {
          email: true,
          sms: true,
          whatsapp: true
        }
      };
      
      allUsers.push(newUser);
      currentUser = { ...newUser };
      saveUsersData();
      saveCurrentUser();
      updateProfileButton();
      closeAuthModal();
      alert('Account created successfully! Welcome to Jaya\'s Organic! 🌱');
    });
  }
}

function socialLogin(provider) {
  alert(`${provider} login is coming soon! For now, please use email signup.`);
}

function openProfile() {
  const modal = document.getElementById('profile-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateProfileDisplay();
}

function closeProfile() {
  document.getElementById('profile-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateProfileDisplay() {
  if (!currentUser) return;
  
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profilePhoto = document.getElementById('profile-photo');
  const userRating = document.getElementById('user-rating');
  const orderCount = document.getElementById('order-count');
  const referralCode = document.getElementById('referral-code');
  const languageSelect = document.getElementById('language-select');
  const loyaltyPoints = document.getElementById('loyalty-points');
  const memberLevel = document.getElementById('member-level');
  const loyaltyProgress = document.getElementById('loyalty-progress');
  
  if (profileName) profileName.textContent = currentUser.name;
  if (profileEmail) profileEmail.textContent = currentUser.email || 'Not logged in';
  if (profilePhoto) profilePhoto.src = currentUser.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCA3NVEyMCA2MCAzMCA2MEMzMCA1NSA0MCA1NSA0MCA2MEM0MCA3NSA1MCA3NSA1MCA4MEM1MCA4NSA2MCA4NSA2MCA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
  if (userRating) userRating.textContent = currentUser.rating.toFixed(1);
  if (orderCount) orderCount.textContent = currentUser.orders.length;
  if (referralCode) referralCode.textContent = currentUser.referralCode;
  if (languageSelect) languageSelect.value = currentUser.language;
  if (loyaltyPoints) loyaltyPoints.textContent = currentUser.loyaltyPoints;
  if (memberLevel) memberLevel.textContent = currentUser.memberLevel;
  if (loyaltyProgress) {
    const progress = Math.min((currentUser.loyaltyPoints / 100) * 100, 100);
    loyaltyProgress.style.width = progress + '%';
  }
  
  // Update order history
  updateOrderHistory();
  // Update rate products
  updateRateProducts();
  // Update payment methods
  updatePaymentMethods();
}

// Security utilities and review/sanitization
function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function hashPassword(password) {
  if (typeof password !== 'string') return '';
  return btoa(password); // simple base64 placeholder for front-end test scenario
}

function openReviewModal() {
  if (!currentUser || !currentUser.id) {
    alert('Please login to write a review.');
    openAuthModal();
    return;
  }

  const modal = document.getElementById('review-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  populateProductDropdown();
  resetReviewForm();
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function populateProductDropdown() {
  const select = document.getElementById('review-product-select');
  if (!select) return;

  const purchasedProducts = new Set();
  if (currentUser && Array.isArray(currentUser.orders)) {
    currentUser.orders.forEach(order => {
      if (order && Array.isArray(order.items)) {
        order.items.forEach(item => purchasedProducts.add(item));
      }
    });
  }

  select.innerHTML = '<option value="">Choose a product you\'ve purchased...</option>';
  if (purchasedProducts.size > 0) {
    purchasedProducts.forEach(product => {
      const opt = document.createElement('option');
      opt.value = product;
      opt.textContent = product;
      select.appendChild(opt);
    });
  } else {
    // If no purchased products yet, offer all available products
    products.forEach(product => {
      const opt = document.createElement('option');
      opt.value = product.name;
      opt.textContent = product.name;
      select.appendChild(opt);
    });
  }
}

function resetReviewForm() {
  const form = document.getElementById('review-form');
  const stars = document.querySelectorAll('#star-rating button');
  const ratingText = document.getElementById('rating-text');
  const ratingValue = document.getElementById('rating-value');
  const photoPreview = document.getElementById('photo-preview');

  if (form) form.reset();
  stars.forEach(star => star.textContent = '☆');
  if (ratingText) ratingText.textContent = 'Click stars to rate';
  if (ratingValue) ratingValue.value = '0';
  if (photoPreview) photoPreview.innerHTML = '';
}

function setRating(value) {
  const stars = document.querySelectorAll('#star-rating button');
  const ratingText = document.getElementById('rating-text');
  const ratingValue = document.getElementById('rating-value');

  stars.forEach((star, i) => {
    star.textContent = (i < value ? '⭐' : '☆');
  });

  const textMap = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  if (ratingText) ratingText.textContent = `${value} star${value > 1 ? 's' : ''} - ${textMap[value]}`;
  if (ratingValue) ratingValue.value = value;
}

function voteHelpful(reviewId) {
  const testimonial = testimonials.find(t => t.id === reviewId);
  if (testimonial) {
    testimonial.helpful = (testimonial.helpful || 0) + 1;
    localStorage.setItem('jayasOrganicTestimonials', JSON.stringify(testimonials));
    renderFeedback(document.getElementById('feedback-grid'), testimonials);
  }
}

function selectSubscription(plan) {
  if (!currentUser || !currentUser.id) {
    alert('Please login to subscribe to our plans.');
    openAuthModal();
    return;
  }
  
  const plans = {
    weekly: { name: 'Weekly Box', price: 1200, items: '5-6 organic items' },
    biweekly: { name: 'Bi-Weekly Box', price: 650, items: '3-4 organic items' },
    monthly: { name: 'Monthly Special', price: 2500, items: '8-10 premium items' }
  };
  
  const selectedPlan = plans[plan];
  if (confirm(`Subscribe to ${selectedPlan.name} for ₹${selectedPlan.price}/month?\n\nIncludes: ${selectedPlan.items}, free delivery, cancel anytime.`)) {
    currentUser.subscription = {
      plan: plan,
      name: selectedPlan.name,
      price: selectedPlan.price,
      items: selectedPlan.items,
      active: true,
      startDate: new Date().toISOString(),
      nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
    };
    saveCurrentUser();
    alert(`🎉 Successfully subscribed to ${selectedPlan.name}! Your first delivery will be scheduled soon.`);
  }
}

function manageSubscription() {
  if (!currentUser || !currentUser.subscription) {
    alert('You don\'t have an active subscription. Choose a plan above to get started!');
    return;
  }
  
  const sub = currentUser.subscription;
  const action = confirm(`Your current subscription: ${sub.name} (₹${sub.price}/month)\nNext delivery: ${new Date(sub.nextDelivery).toLocaleDateString()}\n\nClick OK to cancel subscription, Cancel to keep it.`);
  
  if (action) {
    currentUser.subscription.active = false;
    saveCurrentUser();
    alert('Subscription cancelled. You can resubscribe anytime!');
  }
}

function changeLanguage() {
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    const lang = languageSelect.value;
    currentUser.language = lang;
    saveCurrentUser();
    alert(`Language changed to ${lang === 'en' ? 'English' : lang === 'ta' ? 'தமிழ்' : 'हिंदी'}`);
  }
}

function updateOrderHistory() {
  const historyDiv = document.getElementById('order-history');
  if (!historyDiv) return;
  
  if (currentUser.orders.length === 0) {
    historyDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No orders yet</p>';
    return;
  }
  
  historyDiv.innerHTML = currentUser.orders.map(order => `
    <div class="bg-gray-50 rounded-xl p-3">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold">${order.items.join(', ')}</p>
          <p class="text-sm text-gray-600">${order.date}</p>
        </div>
        <span class="font-bold text-green-600">₹${order.total}</span>
      </div>
    </div>
  `).join('');
}

function updateRateProducts() {
  const rateDiv = document.getElementById('rate-products');
  if (!rateDiv) return;
  
  // Get unique products from orders
  const ratedProducts = new Set(currentUser.orders.flatMap(order => order.items));
  
  if (ratedProducts.size === 0) {
    rateDiv.innerHTML = '<p class="text-gray-500 text-center py-4">Rate products you\'ve purchased</p>';
    return;
  }
  
  rateDiv.innerHTML = Array.from(ratedProducts).map(product => `
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
  
  // Update overall rating
  const ratings = Object.values(currentUser.ratings);
  currentUser.rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  
  saveCurrentUser();
  updateProfileDisplay();
}

function shareReferral() {
  const referralCode = currentUser.referralCode;
  const message = `Join Jaya's Organic with my referral code: ${referralCode} and get exclusive discounts! 🍲✨`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Jaya\'s Organic Referral',
      text: message,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(message).then(() => {
      alert('Referral code copied to clipboard! 📋');
    });
  }
}

function saveProfile() {
  saveCurrentUser();
  alert('Profile saved successfully! 💾');
}

function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('jayasOrganicUser');
    currentUser = null;
    initUserProfile();
    closeProfile();
    alert('Logged out successfully! 👋');
  }
}

function updatePaymentMethods() {
  const paymentDiv = document.getElementById('payment-methods');
  if (!paymentDiv) return;
  
  if (currentUser.paymentMethods.length === 0) {
    paymentDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No payment methods saved</p>';
    return;
  }
  
  paymentDiv.innerHTML = currentUser.paymentMethods.map(method => `
    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
      <div class="flex items-center gap-3">
        <span class="text-2xl">${method.type === 'card' ? '💳' : '🏦'}</span>
        <div>
          <p class="font-semibold">${method.type === 'card' ? '•••• •••• •••• ' + method.last4 : method.bankName}</p>
          <p class="text-sm text-gray-600">${method.type === 'card' ? method.cardType : 'Bank Account'}</p>
        </div>
      </div>
      <button onclick="removePaymentMethod('${method.id}')" class="text-red-500 hover:text-red-700">×</button>
    </div>
  `).join('');
}

function editProfileInfo() {
  const newName = prompt('Enter your full name:', currentUser.name);
  const newPhone = prompt('Enter your phone number:', currentUser.phone || '');
  
  if (newName && newName.trim()) {
    currentUser.name = newName.trim();
    if (newPhone) currentUser.phone = newPhone.trim();
    saveCurrentUser();
    updateProfileDisplay();
    alert('Profile updated successfully!');
  }
}

function changePassword() {
  if (!currentUser.id) {
    alert('Please login to change password.');
    return;
  }
  
  const currentPassword = prompt('Enter current password:');
  if (currentPassword !== currentUser.password) {
    alert('Current password is incorrect.');
    return;
  }
  
  const newPassword = prompt('Enter new password (minimum 6 characters):');
  if (newPassword && newPassword.length >= 6) {
    currentUser.password = newPassword;
    saveCurrentUser();
    saveUsersData();
    alert('Password changed successfully!');
  } else {
    alert('Password must be at least 6 characters long.');
  }
}

function manageAddresses() {
  const addresses = currentUser.addresses || [];
  let addressText = addresses.length > 0 ? addresses.map((addr, i) => `${i+1}. ${addr}`).join('\n') : 'No addresses saved';
  
  const newAddress = prompt('Your addresses:\n' + addressText + '\n\nEnter new address (or leave empty to cancel):');
  if (newAddress && newAddress.trim()) {
    if (!currentUser.addresses) currentUser.addresses = [];
    currentUser.addresses.push(newAddress.trim());
    saveCurrentUser();
    alert('Address added successfully!');
  }
}

function notificationSettings() {
  const settings = currentUser.notifications;
  const newEmail = confirm(`Email notifications: ${settings.email ? 'ON' : 'OFF'}\nClick OK to ${settings.email ? 'turn OFF' : 'turn ON'}`);
  const newSMS = confirm(`SMS notifications: ${settings.sms ? 'ON' : 'OFF'}\nClick OK to ${settings.sms ? 'turn OFF' : 'turn ON'}`);
  const newWhatsApp = confirm(`WhatsApp notifications: ${settings.whatsapp ? 'ON' : 'OFF'}\nClick OK to ${settings.whatsapp ? 'turn OFF' : 'turn ON'}`);
  
  currentUser.notifications = {
    email: newEmail,
    sms: newSMS,
    whatsapp: newWhatsApp
  };
  
  saveCurrentUser();
  alert('Notification settings updated!');
}

function addPaymentMethod() {
  const type = prompt('Enter payment method type (card/bank):');
  if (!type || !['card', 'bank'].includes(type.toLowerCase())) {
    alert('Please enter "card" or "bank"');
    return;
  }
  
  if (type.toLowerCase() === 'card') {
    const last4 = prompt('Enter last 4 digits of card:');
    const cardType = prompt('Enter card type (Visa/Mastercard/etc.):');
    if (last4 && cardType) {
      if (!currentUser.paymentMethods) currentUser.paymentMethods = [];
      currentUser.paymentMethods.push({
        id: Date.now(),
        type: 'card',
        last4,
        cardType
      });
      saveCurrentUser();
      updatePaymentMethods();
      alert('Card added successfully!');
    }
  } else {
    const bankName = prompt('Enter bank name:');
    if (bankName) {
      if (!currentUser.paymentMethods) currentUser.paymentMethods = [];
      currentUser.paymentMethods.push({
        id: Date.now(),
        type: 'bank',
        bankName
      });
      saveCurrentUser();
      updatePaymentMethods();
      alert('Bank account added successfully!');
    }
  }
}

function removePaymentMethod(id) {
  if (confirm('Are you sure you want to remove this payment method?')) {
    currentUser.paymentMethods = currentUser.paymentMethods.filter(method => method.id != id);
    saveCurrentUser();
    updatePaymentMethods();
  }
}

function saveCurrentUser() {
  localStorage.setItem('jayasOrganicCurrentUser', JSON.stringify(currentUser));
  
  // Update user in allUsers array
  if (currentUser.id) {
    const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...currentUser };
      saveUsersData();
    }
  }
}

function saveUsersData() {
  localStorage.setItem('jayasOrganicUsers', JSON.stringify(allUsers));
}

function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('jayasOrganicCurrentUser');
    currentUser = null;
    initUserProfile();
    closeProfile();
    alert('Logged out successfully! 👋');
  }
}
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  const profileNewsletterForm = document.getElementById('profile-newsletter-form');
  
  [newsletterForm, profileNewsletterForm].forEach(form => {
    if (form) {
      form.addEventListener('submit', (e) => {
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
  });
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

// ───────────── Modern 2024-2026 Design Features ─────────────

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        // Add stagger effect for multiple elements
        const children = entry.target.querySelectorAll('.stagger-item');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-fade-in-up');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('section, .recipe-card, .product-card, .feedback-card').forEach(el => {
    observer.observe(el);
  });
}

// Modern Loading States
function showModernLoader(element, message = 'Loading...') {
  const loader = document.createElement('div');
  loader.className = 'modern-loader fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
  loader.innerHTML = `
    <div class="bg-white rounded-3xl p-8 shadow-2xl text-center">
      <div class="animate-spin w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-lg font-semibold text-gray-700">${message}</p>
      <div class="mt-4 flex justify-center space-x-1">
        <div class="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
}

function hideModernLoader(loader) {
  if (loader) {
    loader.classList.add('animate-fade-out');
    setTimeout(() => loader.remove(), 300);
  }
}

// Enhanced Micro-interactions
function initMicroInteractions() {
  // Button hover effects
  document.querySelectorAll('.btn-modern, .product-card a, .recipe-card').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'absolute inset-0 bg-white/20 rounded-inherit animate-ping';
      e.target.style.position = 'relative';
      e.target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Card lift effects
  document.querySelectorAll('.card-lift').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Tooltip system
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.classList.add('tooltip');
  });
}

// Modern Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = parseInt(element.textContent) || 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Initialize counters when they come into view
function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  });

  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Modern Parallax Effect
function initParallax() {
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// Enhanced Mobile Menu with Modern Animations
function initModernMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        // Close menu
        mobileMenu.classList.remove('open');
        mobileMenu.style.maxHeight = '0';
        menuBtn.innerHTML = `
          <div class="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <div class="w-5 h-0.5 bg-neutral-700 transition-all duration-300"></div>
            <div class="w-5 h-0.5 bg-neutral-700 transition-all duration-300"></div>
            <div class="w-5 h-0.5 bg-neutral-700 transition-all duration-300"></div>
          </div>
        `;
      } else {
        // Open menu
        mobileMenu.classList.add('open');
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        menuBtn.innerHTML = `
          <div class="w-6 h-6 flex flex-col justify-center items-center">
            <div class="w-5 h-0.5 bg-neutral-700 rotate-45 absolute transition-all duration-300"></div>
            <div class="w-5 h-0.5 bg-neutral-700 -rotate-45 absolute transition-all duration-300"></div>
          </div>
        `;
      }
    });
  }
}

// Modern Toast Notifications
function showModernToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `modern-toast fixed top-20 right-4 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-sm border animate-slide-in-right`;

  const colors = {
    success: 'bg-green-500/90 border-green-400 text-white',
    error: 'bg-red-500/90 border-red-400 text-white',
    warning: 'bg-amber-500/90 border-amber-400 text-white',
    info: 'bg-blue-500/90 border-blue-400 text-white'
  };

  toast.className += ` ${colors[type]}`;

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-2xl">
        ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
      </span>
      <p class="font-medium">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Enhanced Form Validation with Modern Feedback
function initModernForms() {
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', (e) => {
      const field = e.target;
      const value = field.value.trim();

      // Remove existing validation classes
      field.classList.remove('border-red-500', 'border-green-500');

      if (field.hasAttribute('required') && !value) {
        field.classList.add('border-red-500');
        showFieldError(field, 'This field is required');
      } else if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('border-red-500');
        showFieldError(field, 'Please enter a valid email');
      } else if (value) {
        field.classList.add('border-green-500');
        clearFieldError(field);
      }
    });

    input.addEventListener('focus', (e) => {
      e.target.classList.remove('border-red-500', 'border-green-500');
      clearFieldError(e.target);
    });
  });
}

function showFieldError(field, message) {
  clearFieldError(field);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error text-red-500 text-sm mt-1 animate-fade-in';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Modern Image Lazy Loading
function initLazyLoading() {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('skeleton');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Enhanced Accessibility Features
function initAccessibility() {
  // Keyboard navigation for cards
  document.querySelectorAll('.recipe-card, .product-card, .feedback-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Modern Progress Indicators
function showProgress(message = 'Processing...') {
  const progress = document.createElement('div');
  progress.className = 'progress-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
  progress.innerHTML = `
    <div class="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4">
      <div class="relative w-16 h-16 mx-auto mb-4">
        <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="text-lg font-semibold text-gray-700">${message}</p>
      <div class="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full animate-pulse" style="width: 60%"></div>
      </div>
    </div>
  `;
  document.body.appendChild(progress);
  return progress;
}

function hideProgress(progress) {
  if (progress) {
    progress.classList.add('animate-fade-out');
    setTimeout(() => progress.remove(), 300);
  }
}

// Initialize all modern features
function initModernFeatures() {
  initScrollAnimations();
  initMicroInteractions();
  initCounters();
  initParallax();
  initModernMobileMenu();
  initModernForms();
  initLazyLoading();
  initAccessibility();

  // Add modern CSS classes to existing elements
  document.querySelectorAll('.recipe-card, .product-card, .feedback-card').forEach(card => {
    card.classList.add('card-lift');
  });

  document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
    btn.classList.add('btn-modern');
  });

  // Add counter data attributes
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
    if (target) {
      stat.className += ' counter';
      stat.dataset.target = target;
    }
  });
}

// Call modern features initialization
document.addEventListener('DOMContentLoaded', initModernFeatures);
