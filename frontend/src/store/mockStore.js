function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function slugifyText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const categoryThemes = {
  Fashion: { top: "#ff8f6b", bottom: "#ffd8c9", accent: "#b93f1c" },
  Beauty: { top: "#ff9bb0", bottom: "#ffe0ea", accent: "#b7375c" },
  Electronics: { top: "#2e8fff", bottom: "#d9ebff", accent: "#0f4fa0" },
  Home: { top: "#37b68c", bottom: "#dcfff1", accent: "#0d6d54" },
  Grocery: { top: "#f0b132", bottom: "#fff0c7", accent: "#995d00" },
  Kids: { top: "#8b7dff", bottom: "#ece8ff", accent: "#4d43a5" },
  default: { top: "#0f6bd8", bottom: "#dce9ff", accent: "#133b73" },
};

export function createMarketplaceArt(title, subtitle, themeKey = "default") {
  const theme = categoryThemes[themeKey] || categoryThemes.default;
  const safeTitle = escapeText(title);
  const safeSubtitle = escapeText(subtitle);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${theme.top}" />
          <stop offset="100%" stop-color="${theme.bottom}" />
        </linearGradient>
      </defs>
      <rect width="720" height="540" fill="url(#bg)" rx="36" />
      <circle cx="580" cy="110" r="118" fill="rgba(255,255,255,0.28)" />
      <circle cx="140" cy="420" r="92" fill="rgba(255,255,255,0.18)" />
      <rect x="54" y="72" width="612" height="396" rx="40" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.34)" />
      <rect x="84" y="116" width="168" height="34" rx="17" fill="rgba(255,255,255,0.75)" />
      <text x="108" y="139" fill="${theme.accent}" font-size="18" font-family="Trebuchet MS, Segoe UI, sans-serif" font-weight="700">VX BAZAAR PICK</text>
      <text x="84" y="224" fill="#10203f" font-size="52" font-family="Georgia, Times New Roman, serif" font-weight="700">${safeTitle}</text>
      <text x="84" y="278" fill="#193057" font-size="27" font-family="Trebuchet MS, Segoe UI, sans-serif">${safeSubtitle}</text>
      <text x="84" y="346" fill="rgba(16,32,63,0.84)" font-size="22" font-family="Trebuchet MS, Segoe UI, sans-serif">Bold deals. Fast checkout. Built to feel like a lively multi-category marketplace.</text>
      <rect x="84" y="384" width="188" height="44" rx="22" fill="${theme.accent}" />
      <text x="126" y="413" fill="#ffffff" font-size="22" font-family="Trebuchet MS, Segoe UI, sans-serif" font-weight="700">Shop the drop</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildProduct({
  id,
  name,
  category,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  sellerName,
  deliveryLabel,
  description,
  tagline,
  benefits,
  popularity,
  featured = false,
  assured = true,
  fastDelivery = false,
  unitLabel = "1 item",
}) {
  return {
    id,
    name,
    slug: slugifyText(name),
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    badge,
    sellerName,
    deliveryLabel,
    description,
    tagline,
    benefits,
    popularity,
    featured,
    assured,
    fastDelivery,
    unitLabel,
    imageUrl: createMarketplaceArt(name, tagline, category),
  };
}

export const marketplaceConfig = {
  brandName: "VX Bazaar",
  brandTagline: "Fashion, home, beauty, and gadgets in one fast-moving marketplace.",
  topMessage: "Festival-ready deals, cash on delivery, and trusted seller picks all week.",
  heroTitle: "One bold storefront for every cart mood.",
  heroCopy:
    "VX Bazaar blends the product density of major marketplaces with a cleaner, more stylish shopping flow for fashion, gadgets, beauty, and everyday essentials.",
};

export const marketplaceCategories = [
  {
    name: "Fashion",
    code: "FS",
    subtitle: "Kurtis, denim, co-ords, and daily wear.",
    highlight: "Trend-led styles refreshed every day",
  },
  {
    name: "Beauty",
    code: "BT",
    subtitle: "Skincare, haircare, and makeup must-haves.",
    highlight: "Routine kits and affordable combos",
  },
  {
    name: "Electronics",
    code: "EL",
    subtitle: "Audio, wearables, and smart accessories.",
    highlight: "Fast-delivery gadgets with strong ratings",
  },
  {
    name: "Home",
    code: "HM",
    subtitle: "Kitchen, decor, storage, and utility picks.",
    highlight: "Useful upgrades for every room",
  },
  {
    name: "Grocery",
    code: "GR",
    subtitle: "Pantry bundles and repeat-buy essentials.",
    highlight: "Easy refill packs and combo savings",
  },
  {
    name: "Kids",
    code: "KD",
    subtitle: "Learning sets, sneakers, and activity gear.",
    highlight: "Playful products with school-friendly value",
  },
];

export const marketplaceHighlights = [
  {
    eyebrow: "Fast Delivery",
    title: "48-hour dispatch on popular picks",
    copy: "Keep the pace of a marketplace without losing the polish of a premium storefront.",
  },
  {
    eyebrow: "Cash on Delivery",
    title: "Checkout choices shoppers expect",
    copy: "UPI, card, and COD flows are surfaced clearly from the first fold to final payment.",
  },
  {
    eyebrow: "Seller Tools",
    title: "A control room is already built in",
    copy: "The project still includes the existing admin workspace for catalog, orders, users, and reports.",
  },
];

export const marketplaceCollections = [
  {
    eyebrow: "Mega Fashion Edit",
    title: "Fresh ethnic and western looks under one cart.",
    copy: "Mix bestselling kurtis, sneakers, handbags, and shirts with low-friction checkout.",
    cta: "Browse styles",
  },
  {
    eyebrow: "Home Upgrade Board",
    title: "Kitchen, storage, and decor that feel useful now.",
    copy: "Hero promotions and category rails spotlight impulse-friendly utility products.",
    cta: "Refresh your home",
  },
  {
    eyebrow: "Tech and Beauty Rush",
    title: "High-margin combos with urgency built into the layout.",
    copy: "Smart cards, badges, and high-contrast deal modules make offers easier to scan.",
    cta: "See quick buys",
  },
];

export const sellerBenefits = [
  {
    title: "Seller-ready control room",
    copy: "The existing admin routes remain wired for products, orders, users, and reporting so the storefront is not just a design shell.",
  },
  {
    title: "Marketplace-grade product density",
    copy: "Grid sections, category blocks, offer cards, and shopping filters make the experience feel closer to a large commerce app.",
  },
  {
    title: "Built to demo even without APIs",
    copy: "If the backend is offline, the storefront switches to local showcase data instead of becoming an empty page.",
  },
];

export const supportPromises = [
  {
    title: "7-day easy returns",
    copy: "Keep the trust language shoppers expect on marketplace purchases.",
  },
  {
    title: "Secure payments",
    copy: "UPI, cards, and cash on delivery are reflected throughout checkout.",
  },
  {
    title: "Seller support",
    copy: "Catalog operations can still be managed through the admin workspace.",
  },
];

export const supportHighlights = [
  {
    title: "Secure marketplace practices",
    copy: "Admin login is rate-limited and session-based admin access now has a clearer expiry path.",
  },
  {
    title: "Buyer-first help",
    copy: "Support, returns, payments, and checkout expectations are visible without making shoppers hunt through the site.",
  },
  {
    title: "Save time on repeat orders",
    copy: "Wishlist and saved checkout details help shoppers return without re-entering the same information each visit.",
  },
];

export const supportFaqs = [
  {
    question: "How are payments handled?",
    answer: "The storefront supports UPI, card, and cash on delivery messaging throughout browsing and checkout. Backend validation also rejects unsupported payment methods.",
  },
  {
    question: "Can shoppers save products for later?",
    answer: "Yes. Wishlist support is stored locally so users can mark products and return to them later.",
  },
  {
    question: "What happens if the backend is offline?",
    answer: "The storefront falls back to a built-in catalog and demo-safe checkout confirmation so the website still feels complete for demos and design review.",
  },
  {
    question: "Is admin access protected?",
    answer: "Yes. Admin access is JWT-protected, login attempts are rate-limited, and security headers are applied at the backend layer.",
  },
];

export const shopperVoices = [
  {
    name: "Aarohi Mehta",
    location: "Pune",
    quote: "The layout feels familiar like a major shopping app, but cleaner and easier to scan.",
  },
  {
    name: "Rohit Nair",
    location: "Bengaluru",
    quote: "I could jump from fashion to gadgets to home products without the homepage feeling crowded.",
  },
  {
    name: "Megha Sharma",
    location: "Jaipur",
    quote: "The checkout flow and deal cards make it feel like a real marketplace instead of just a demo page.",
  },
];

export const topSearches = [
  "kurti sets",
  "wireless earbuds",
  "air fryer",
  "serum combo",
  "bedsheet set",
  "school kit",
];

export const marketplaceProducts = [
  buildProduct({
    id: "vx-1001",
    name: "Rayon Kurti Set",
    category: "Fashion",
    price: 1199,
    originalPrice: 2299,
    rating: 4.6,
    reviewCount: 2841,
    badge: "Deal of the Day",
    sellerName: "Saanvi Studio",
    deliveryLabel: "Free delivery by Wednesday",
    description: "Printed kurti set with dupatta and straight pants for all-day wear.",
    tagline: "Bestselling festive look",
    benefits: "Easy returns\nSoft feel fabric\nSizes S to XXL",
    popularity: 96,
    featured: true,
    assured: true,
    fastDelivery: true,
    unitLabel: "Set of 3",
  }),
  buildProduct({
    id: "vx-1002",
    name: "Minimal Linen Shirt",
    category: "Fashion",
    price: 899,
    originalPrice: 1699,
    rating: 4.4,
    reviewCount: 1642,
    badge: "Top Rated",
    sellerName: "North Block",
    deliveryLabel: "Delivery in 2 days",
    description: "Breathable casual shirt with a crisp cut that works for office and weekends.",
    tagline: "Smart-casual daily staple",
    benefits: "Regular fit\nLightweight fabric\nMachine washable",
    popularity: 81,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "1 shirt",
  }),
  buildProduct({
    id: "vx-1003",
    name: "TWS Bass Earbuds",
    category: "Electronics",
    price: 1499,
    originalPrice: 2999,
    rating: 4.5,
    reviewCount: 5233,
    badge: "Flash Deal",
    sellerName: "Urban Audio",
    deliveryLabel: "Delivery tomorrow in select cities",
    description: "Low-latency earbuds with ENC calling and compact charging case.",
    tagline: "Gaming mode and deep bass",
    benefits: "30-hour backup\nUSB-C fast charge\nTouch controls",
    popularity: 98,
    featured: true,
    assured: true,
    fastDelivery: true,
    unitLabel: "1 pair",
  }),
  buildProduct({
    id: "vx-1004",
    name: "Glow Serum Combo",
    category: "Beauty",
    price: 799,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 1927,
    badge: "Beauty Pick",
    sellerName: "Pure Ritual",
    deliveryLabel: "Free delivery over Rs 699",
    description: "Daily skincare pairing with vitamin C serum and hydrating gel cream.",
    tagline: "AM-PM glow routine",
    benefits: "Dermat tested\nHydration plus brightening\nTravel friendly pack",
    popularity: 84,
    featured: true,
    assured: true,
    fastDelivery: false,
    unitLabel: "Combo of 2",
  }),
  buildProduct({
    id: "vx-1005",
    name: "Air Fryer 4L",
    category: "Home",
    price: 3999,
    originalPrice: 6499,
    rating: 4.5,
    reviewCount: 1135,
    badge: "Kitchen Upgrade",
    sellerName: "Cook Craft",
    deliveryLabel: "Installation-ready delivery in 3 days",
    description: "Digital air fryer with preset menus for snacks, fries, and weekday meals.",
    tagline: "Compact appliance for quick meals",
    benefits: "8 presets\nNon-stick basket\nLow-oil cooking",
    popularity: 77,
    featured: true,
    assured: true,
    fastDelivery: false,
    unitLabel: "4 litre",
  }),
  buildProduct({
    id: "vx-1006",
    name: "Premium Bedsheet Set",
    category: "Home",
    price: 1299,
    originalPrice: 2199,
    rating: 4.3,
    reviewCount: 1758,
    badge: "Most Saved",
    sellerName: "Room Theory",
    deliveryLabel: "Free delivery by Friday",
    description: "King-size bedsheet with pillow covers in a soft geometric print.",
    tagline: "Hotel-like home refresh",
    benefits: "Fade resistant\nKing size fit\nSoft finish",
    popularity: 74,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "3-piece set",
  }),
  buildProduct({
    id: "vx-1007",
    name: "Smart Watch Active",
    category: "Electronics",
    price: 2199,
    originalPrice: 4499,
    rating: 4.4,
    reviewCount: 2685,
    badge: "Weekend Special",
    sellerName: "Pulse Labs",
    deliveryLabel: "Delivery in 48 hours",
    description: "Bluetooth calling smartwatch with AMOLED display and fitness tracking.",
    tagline: "Calls, health stats, and style",
    benefits: "100 plus sports modes\nAMOLED screen\nIP rating",
    popularity: 89,
    featured: true,
    assured: true,
    fastDelivery: true,
    unitLabel: "1 watch",
  }),
  buildProduct({
    id: "vx-1008",
    name: "Steel Bottle Set",
    category: "Home",
    price: 699,
    originalPrice: 1199,
    rating: 4.2,
    reviewCount: 982,
    badge: "Home Saver",
    sellerName: "Daily Nest",
    deliveryLabel: "Dispatch in 24 hours",
    description: "Leak-proof steel bottles for fridge storage and everyday carry.",
    tagline: "Kitchen utility essential",
    benefits: "Rust resistant\nFamily pack\nEasy-grip lids",
    popularity: 63,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "Pack of 3",
  }),
  buildProduct({
    id: "vx-1009",
    name: "Snack Pantry Combo",
    category: "Grocery",
    price: 549,
    originalPrice: 899,
    rating: 4.6,
    reviewCount: 1463,
    badge: "Combo Saver",
    sellerName: "Pantry Circle",
    deliveryLabel: "Delivery in 2 days",
    description: "Tea-time combo with roasted makhana, trail mix, and baked chips.",
    tagline: "Quick pantry refill bundle",
    benefits: "Travel friendly packs\nRepeat-buy favorite\nValue combo",
    popularity: 71,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "Pack of 6",
  }),
  buildProduct({
    id: "vx-1010",
    name: "Kids Learning Kit",
    category: "Kids",
    price: 999,
    originalPrice: 1799,
    rating: 4.8,
    reviewCount: 918,
    badge: "Parents Pick",
    sellerName: "Bright Trail",
    deliveryLabel: "Delivery by Thursday",
    description: "Activity bundle with writing boards, flash cards, and sorting games.",
    tagline: "Play-led learning bundle",
    benefits: "Age 4 plus\nReusable activity boards\nGift-ready box",
    popularity: 69,
    featured: false,
    assured: true,
    fastDelivery: false,
    unitLabel: "1 kit",
  }),
  buildProduct({
    id: "vx-1011",
    name: "Running Sneakers",
    category: "Fashion",
    price: 1599,
    originalPrice: 2899,
    rating: 4.3,
    reviewCount: 2114,
    badge: "Sports Edit",
    sellerName: "Step Up",
    deliveryLabel: "Free delivery this week",
    description: "Lightweight sneakers with cushioned sole for commute and workouts.",
    tagline: "Comfort-first everyday pair",
    benefits: "Cushioned sole\nBreathable upper\nMulti-color options",
    popularity: 87,
    featured: true,
    assured: true,
    fastDelivery: true,
    unitLabel: "1 pair",
  }),
  buildProduct({
    id: "vx-1012",
    name: "Compact Mixer Grinder",
    category: "Home",
    price: 2699,
    originalPrice: 3999,
    rating: 4.4,
    reviewCount: 1251,
    badge: "Kitchen Essential",
    sellerName: "Quick Blend",
    deliveryLabel: "Delivery in 3 days",
    description: "Three-jar mixer grinder designed for fast prep in smaller kitchens.",
    tagline: "Everyday grinding made easy",
    benefits: "Stainless jars\nOverload protection\nSpace-saving body",
    popularity: 73,
    featured: false,
    assured: true,
    fastDelivery: false,
    unitLabel: "3 jars",
  }),
  buildProduct({
    id: "vx-1013",
    name: "Hydra Haircare Duo",
    category: "Beauty",
    price: 649,
    originalPrice: 1199,
    rating: 4.5,
    reviewCount: 1344,
    badge: "Salon Pick",
    sellerName: "Root Ritual",
    deliveryLabel: "Delivery by Wednesday",
    description: "Repair-focused shampoo and mask duo for dry or damaged hair.",
    tagline: "Smoothness and shine routine",
    benefits: "Sulfate free\nTravel-safe caps\nRich conditioning",
    popularity: 67,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "Combo of 2",
  }),
  buildProduct({
    id: "vx-1014",
    name: "Study Table Lamp",
    category: "Electronics",
    price: 899,
    originalPrice: 1599,
    rating: 4.4,
    reviewCount: 875,
    badge: "Work Desk Pick",
    sellerName: "Desk Theory",
    deliveryLabel: "Dispatch within 24 hours",
    description: "USB rechargeable desk lamp with touch dimming and flexible neck.",
    tagline: "Compact light for study corners",
    benefits: "Touch dimmer\nRechargeable battery\nMinimal footprint",
    popularity: 61,
    featured: false,
    assured: true,
    fastDelivery: true,
    unitLabel: "1 lamp",
  }),
];

export function buildFallbackHomeContent(products = marketplaceProducts) {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const categoryHighlights = marketplaceCategories.map((category) => {
    const categoryProducts = products.filter((product) => product.category === category.name);
    const firstProduct = categoryProducts[0];

    return {
      category: category.name,
      productCount: categoryProducts.length,
      description: category.highlight,
      imageUrl:
        firstProduct?.imageUrl ||
        createMarketplaceArt(category.name, category.subtitle, category.name),
    };
  });

  return {
    brandName: marketplaceConfig.brandName,
    heroTitle: marketplaceConfig.heroTitle,
    heroSubtitle: marketplaceConfig.heroCopy,
    stats: [
      {
        label: "Live listings",
        value: String(products.length),
        helper: "Across fashion, home, beauty, electronics, grocery, and kids",
      },
      {
        label: "Top-rated picks",
        value: String(products.filter((product) => Number(product.rating || 0) >= 4.5).length),
        helper: "High-trust products surfaced for quicker buying decisions",
      },
      {
        label: "Fast delivery items",
        value: String(products.filter((product) => product.fastDelivery).length),
        helper: "Speed-focused picks for marketplace-style urgency",
      },
      {
        label: "Featured deals",
        value: String(featuredProducts.length),
        helper: "Hero-ready products already positioned for promotion",
      },
    ],
    featuredProducts,
    categoryHighlights,
    testimonials: shopperVoices,
    promisePoints: [
      "Multi-category browsing designed to feel familiar to major shopping apps.",
      "Cart, checkout, and seller tools wired into the same project.",
      "Fallback catalog keeps the storefront complete even without the backend running.",
    ],
  };
}
