// Data Arrays - Easy to edit
const recipes = [
  {
    id: 1,
    title: "Piranda Thokku",
    category: "South Indian",
    // image: "https://ibb.co/hFPsYvKR",
    image: "https://i.ibb.co/kVh3MRnN/PIRANDAI-THOKKU.png",
    description: "Traditional Tamil sambar with fresh drumstick and brinjal",
    ingredients: ["Toor dal 1 cup", "Drumstick 2", "Brinjal 4 small", "Tamarind extract", "Sambar powder 3 tbsp", "Mustard seeds", "Curry leaves"],
    steps: [
      "1. Pressure cook toor dal with turmeric until soft",
      "2. Extract tamarind juice and boil with veggies",
      "3. Add sambar powder and cooked dal, boil well",
      "4. Temper with mustard, urad dal, red chili & curry leaves"
    ],
    tips: "Use homemade sambar powder for authentic taste. Adjust spice as per preference.",
    prepTime: "15 mins",
    cookTime: "25 mins"
  },
  {
    id: 2,
    title: "Idli Podi",
    category: "South Indian",
    image: "https://i.ibb.co/fzf2f7sw/Curry-leaves-idli-podi-1.png",
    description: "Spicy pepper rasam made with organic tomatoes",
    ingredients: ["Tomatoes 3", "Tamarind small lemon size", "Pepper 2 tsp", "Cumin 1 tsp", "Garlic 3 cloves", "Curry leaves", "Coriander leaves"],
    steps: [
      "1. Crush pepper, cumin & garlic together",
      "2. Boil tomatoes & tamarind, extract juice",
      "3. Add spice mix & boil till frothy",
      "4. Temper with ghee, mustard & curry leaves"
    ],
    tips: "Perfect for cold evenings. Serve hot with rice.",
    prepTime: "10 mins",
    cookTime: "15 mins"
  },
  {
    id: 3,
    title: "Karuppu ulunthu Etli Podi",
    category: "Tamil Special",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop",
    description: "Vellai kuzhambu with tender coconut & garlic",
    ingredients: ["Tender coconut 1 cup", "Garlic 10 cloves", "Black pepper 1 tbsp", "Cumin seeds 1 tsp", "Coconut milk", "Curry leaves"],
    steps: [
      "1. Grind pepper, cumin & garlic coarsely",
      "2. Cook tender coconut with spices",
      "3. Add coconut milk & simmer gently",
      "4. Temper with ghee & curry leaves"
    ],
    tips: "Use fresh tender coconut for best results.",
    prepTime: "20 mins",
    cookTime: "20 mins"
  },
  {
    id: 4,
    title: "Poriyal",
    category: "Side Dish",
    image: "https://images.unsplash.com/photo-1628074013041-9d36a78397a3?w=400&h=300&fit=crop",
    description: "Cabbage poriyal - simple yet delicious side",
    ingredients: ["Cabbage 1 medium", "Mustard seeds", "Urad dal", "Red chili 2", "Coconut grated 1/4 cup", "Curry leaves"],
    steps: [
      "1. Chop cabbage finely",
      "2. Temper mustard, urad dal, chili & curry leaves",
      "3. Add cabbage & salt, cook covered till soft",
      "4. Mix with grated coconut"
    ],
    tips: "Don't overcook - crunch is key!",
    prepTime: "10 mins",
    cookTime: "15 mins"
  },
  {
    id: 5,
    title: "Payasam",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1562440499-64b320180f9c?w=400&h=300&fit=crop",
    description: "Paal payasam made with organic milk",
    ingredients: ["Milk 1L", "Sago 1/2 cup", "Sugar 1 cup", "Cardamom 4", "Cashews & raisins"],
    steps: [
      "1. Cook sago in water till transparent",
      "2. Boil milk with cardamom till thick",
      "3. Add cooked sago & sugar",
      "4. Fry cashews & raisins, garnish"
    ],
    tips: "Slow cooking gives best texture.",
    prepTime: "15 mins",
    cookTime: "45 mins"
  }
];

const products = [
  {
    id: 1,
    name: "Daily Thali (Serves 2)",
    price: "₹350",
    image: "https://images.unsplash.com/photo-1559314809-0f31657ffb66?w=400&h=300&fit=crop",
    description: "Complete meal with 4 curries, rice, rasam, sambar, appalam"
  },
  {
    id: 2,
    name: "Sambar Rice Pack",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1684076918137-7b6c65556df7?w=400&h=300&fit=crop",
    description: "2 servings of piping hot sambar rice with pickle"
  },
  {
    id: 3,
    name: "Mixed Biryani Combo",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Chicken + Veg biryani (2 servings) with raita & salna"
  },
  {
    id: 4,
    name: "South Indian Breakfast",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2db?w=400&h=300&fit=crop",
    description: "Idli (8) + Vada (4) + Chutneys + Sambar"
  },
  {
    id: 5,
    name: "Fresh Curd Rice",
    price: "₹120",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop",
    description: "2 servings of cooling curd rice with pickle & pomegranate"
  },
  {
    id: 6,
    name: "Family Pack (Serves 5)",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1559314809-0f31657ffb66?w=400&h=300&fit=crop",
    description: "Full meal for family - 8 varieties + rice + dessert"
  }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initRecipeGrid();
  initFilters();
  initProductGrid();
  initContactForm();
  initSmoothScroll();
});

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
    <div class="recipe-card group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl cursor-pointer" onclick="openRecipeModal(${recipe.id})">
      <div class="relative h-64 overflow-hidden">
        <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
          ${recipe.category}
        </div>
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex items-center justify-between text-white/90 text-sm mb-2">
            <span>🥄 ${recipe.prepTime}</span>
            <span>🍳 ${recipe.cookTime}</span>
          </div>
        </div>
      </div>
      <div class="p-8">
        <h4 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">${recipe.title}</h4>
        <p class="text-gray-600 leading-relaxed mb-6">${recipe.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold gradient-text">👀 View</span>
          <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-organic-green rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform duration-500">
            <span class="text-white">🍲</span>
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
      <a href="https://wa.me/919894567890?text=Hi!%20I%20want%20to%20order%20${recipe.title}" class="flex-1 bg-green-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg text-center hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
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
    <div class="product-card bg-white rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl cursor-pointer p-2 h-[420px] flex flex-col">
      <div class="relative h-64 overflow-hidden rounded-2xl mb-6 flex-1">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
          ${product.price}
        </div>
      </div>
      <div class="p-6 flex-0">
        <h4 class="text-2xl font-bold text-gray-900 mb-3">${product.name}</h4>
        <p class="text-gray-600 mb-6 flex-1">${product.description}</p>
        <a href="https://wa.me/919894567890?text=Hi!%20I%20want%20to%20order%20${product.name.replace(/\\(.*\\)/, '')}" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all block text-center">
          Order on WhatsApp 📱
        </a>
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
