import { createMarketplaceArt } from "../store/mockStore";

export function splitLines(value) {
  if (!value) {
    return [];
  }

  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}

export function getDiscountPercent(product) {
  const currentPrice = Number(product.price || 0);
  const basePrice = Number(product.originalPrice || 0);

  if (!currentPrice || !basePrice || basePrice <= currentPrice) {
    return 0;
  }

  return Math.round(((basePrice - currentPrice) / basePrice) * 100);
}

export function normalizeProduct(product) {
  const price = Number(product?.price || 0);
  const originalPrice =
    Number(product?.originalPrice || 0) ||
    Math.max(price + Math.round(price * 0.24), price + 100);
  const name = product?.name || product?.title || "Marketplace pick";
  const category = product?.category || "Lifestyle";

  return {
    id: product?.id || product?.slug || name.toLowerCase().replace(/\s+/g, "-"),
    name,
    slug:
      product?.slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    category,
    price,
    originalPrice,
    rating: Number(product?.rating || 4.4).toFixed(1),
    reviewCount: Number(product?.reviewCount || 0),
    badge: product?.badge || (product?.featured ? "Top Pick" : "Trending"),
    sellerName: product?.sellerName || product?.originRegion || "Trusted Seller",
    deliveryLabel:
      product?.deliveryLabel ||
      (Number(product?.stockQuantity || 0) > 15
        ? "Fast delivery available"
        : "Delivery in 3 to 5 days"),
    description:
      product?.description ||
      product?.tagline ||
      "Curated product card with marketplace-first pricing, trust signals, and checkout flow.",
    tagline: product?.tagline || product?.unitLabel || "Popular marketplace pick",
    benefits:
      product?.benefits ||
      "Quality checked\nEasy replacement\nStrong value for price",
    popularity: Number(product?.popularity || product?.reviewCount || 0),
    featured: Boolean(product?.featured || product?.heroProduct),
    assured: product?.assured ?? product?.organicCertified !== false,
    fastDelivery: Boolean(product?.fastDelivery || Number(product?.stockQuantity || 0) > 20),
    unitLabel: product?.unitLabel || "1 item",
    imageUrl:
      product?.imageUrl || createMarketplaceArt(name, product?.tagline || category, category),
  };
}

export function normalizeHomeContent(homePayload) {
  if (!homePayload) {
    return null;
  }

  return {
    brandName: homePayload.brandName || null,
    heroTitle: homePayload.heroTitle || null,
    heroSubtitle: homePayload.heroSubtitle || null,
    storyTitle: homePayload.storyTitle || null,
    storyBody: homePayload.storyBody || null,
    promisePoints: Array.isArray(homePayload.promisePoints) ? homePayload.promisePoints : [],
    stats: Array.isArray(homePayload.stats) ? homePayload.stats : [],
    featuredProducts: Array.isArray(homePayload.featuredProducts)
      ? homePayload.featuredProducts.map(normalizeProduct)
      : [],
    categoryHighlights: Array.isArray(homePayload.categoryHighlights)
      ? homePayload.categoryHighlights.map((highlight) => ({
          category: highlight.category,
          productCount: Number(highlight.productCount || 0),
          description: highlight.description || "",
          imageUrl:
            highlight.imageUrl ||
            createMarketplaceArt(
              highlight.category || "Category",
              highlight.description || "Marketplace lane",
              highlight.category || "default"
            ),
        }))
      : [],
    testimonials: Array.isArray(homePayload.testimonials) ? homePayload.testimonials : [],
  };
}

export function findProductBySlug(products, slug) {
  if (!slug) {
    return null;
  }

  return (
    products.find((product) => product.slug === slug) ||
    products.find((product) => String(product.id) === String(slug)) ||
    null
  );
}
