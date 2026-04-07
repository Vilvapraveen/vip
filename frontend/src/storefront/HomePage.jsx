import { useState } from "react";
import { NavLink } from "react-router-dom";
import { apiRequest, formatCurrency } from "../api";
import {
  buildFallbackHomeContent,
  marketplaceCategories,
  marketplaceCollections,
  marketplaceConfig,
  marketplaceHighlights,
  sellerBenefits,
  shopperVoices,
  topSearches,
} from "../store/mockStore";
import { ProductCard } from "./ProductCard";

function getCategoryCounts(products) {
  return products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});
}

export function HomePage({
  products,
  loading,
  catalogMode,
  catalogMessage,
  homeContent,
  onAddToCart,
  recentlyViewedProducts,
  wishlistIds,
  onToggleWishlist,
}) {
  const [newsletterForm, setNewsletterForm] = useState({
    firstName: "",
    email: "",
    interestArea: topSearches[0],
  });
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterTone, setNewsletterTone] = useState("success");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const showcaseProducts = featuredProducts.length ? featuredProducts : products.slice(0, 6);
  const fallbackHomeContent = buildFallbackHomeContent(products);
  const activeHomeContent = homeContent || fallbackHomeContent;
  const spotlightProducts = activeHomeContent.featuredProducts?.length
    ? activeHomeContent.featuredProducts
    : showcaseProducts;
  const trendingProducts = [...products]
    .sort((left, right) => Number(right.popularity || 0) - Number(left.popularity || 0))
    .slice(0, 3);
  const categoryCounts = getCategoryCounts(products);
  const stats = activeHomeContent.stats?.length ? activeHomeContent.stats : fallbackHomeContent.stats;
  const categoryHighlights = activeHomeContent.categoryHighlights?.length
    ? activeHomeContent.categoryHighlights
    : fallbackHomeContent.categoryHighlights;
  const testimonials = activeHomeContent.testimonials?.length
    ? activeHomeContent.testimonials
    : shopperVoices;

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setNewsletterMessage("");
    setNewsletterTone("success");
    setNewsletterSubmitting(true);

    try {
      const response = await apiRequest("/api/store/newsletter", {
        method: "POST",
        body: JSON.stringify(newsletterForm),
      });
      setNewsletterMessage(response?.message || "You are on the VX Bazaar early access list.");
      setNewsletterTone("success");
    } catch {
      setNewsletterMessage("We could not submit the signup right now. Please try again when the API is available.");
      setNewsletterTone("danger");
    } finally {
      setNewsletterForm({
        firstName: "",
        email: "",
        interestArea: topSearches[0],
      });
      setNewsletterSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="section-block">
        <div className="container">
          <div className="hero-shell loading-panel">
            <h1 className="display-4">Loading the marketplace storefront...</h1>
            <p className="hero-summary">
              Pulling product cards, categories, and deal sections into place.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const heroProduct = spotlightProducts[0] || trendingProducts[0] || products[0];
  const spotlightProduct = spotlightProducts[1] || trendingProducts[1] || products[1] || heroProduct;

  return (
    <>
      <section className="section-block hero-section">
        <div className="container">
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">Marketplace storefront</p>
              <h1 className="display-4">{marketplaceConfig.heroTitle}</h1>
              <p className="hero-summary">{marketplaceConfig.heroCopy}</p>

              <div className="hero-actions">
                <NavLink to="/shop" className="btn-market btn-large">
                  Explore products
                </NavLink>
                <NavLink to="/admin/login" className="btn-market-muted btn-large">
                  Open seller hub
                </NavLink>
              </div>

              <div className="search-chip-row">
                {topSearches.map((searchTerm) => (
                  <NavLink
                    key={searchTerm}
                    className="search-chip"
                    to={`/shop?search=${encodeURIComponent(searchTerm)}`}
                  >
                    {searchTerm}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="hero-stage">
              {marketplaceCollections.slice(0, 2).map((collection) => (
                <article className="announcement-card" key={collection.title}>
                  <p className="eyebrow mb-2">{collection.eyebrow}</p>
                  <h2 className="h4">{collection.title}</h2>
                  <p>{collection.copy}</p>
                  <span className="announcement-link">{collection.cta}</span>
                </article>
              ))}

              {heroProduct ? (
                <article className="hero-product-card">
                  <img src={heroProduct.imageUrl} alt={heroProduct.name} className="hero-product-image" />
                  <div className="hero-product-copy">
                    <span className="chip chip-soft">{heroProduct.badge}</span>
                    <h2 className="h3">{heroProduct.name}</h2>
                    <p>{heroProduct.description}</p>
                    <div className="product-price-row">
                      <strong className="price-text">{formatCurrency(heroProduct.price)}</strong>
                      <span className="struck-price">{formatCurrency(heroProduct.originalPrice)}</span>
                    </div>
                    <NavLink className="btn-market-muted btn-small" to={`/products/${heroProduct.slug || heroProduct.id}`}>
                      View product
                    </NavLink>
                  </div>
                </article>
              ) : null}

              {spotlightProduct ? (
                <article className="spotlight-card">
                  <p className="eyebrow mb-2">Trending now</p>
                  <strong>{spotlightProduct.name}</strong>
                  <span>{spotlightProduct.deliveryLabel}</span>
                </article>
              ) : null}
            </div>
          </div>

          <div className="metric-grid">
            {stats.slice(0, 4).map((stat) => (
              <article className="metric-card" key={stat.label}>
                <p className="eyebrow mb-2">{stat.label}</p>
                <h2 className="display-6">{stat.value}</h2>
                <p className="metric-copy">{stat.helper}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow mb-2">Category rail</p>
              <h2 className="h1 mb-2">Built to feel like a real shopping destination.</h2>
            </div>
            <p className="section-copy">
              These tiles mirror the fast scanning behavior that makes large marketplaces easy to browse.
            </p>
          </div>

          <div className="category-grid">
            {categoryHighlights.map((category) => (
              <NavLink
                key={category.category || category.name}
                className="category-card"
                to={`/shop?category=${encodeURIComponent(category.category || category.name)}`}
              >
                <div className="category-code">
                  {(category.category || category.name || "CT").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="eyebrow mb-1">
                    {category.productCount || categoryCounts[category.category] || 0} listings
                  </p>
                  <h3 className="h4">{category.category || category.name}</h3>
                  <p className="category-copy">
                    {category.description || marketplaceCategories.find((entry) => entry.name === category.category)?.subtitle}
                  </p>
                  <span className="category-meta">
                    {marketplaceCategories.find((entry) => entry.name === (category.category || category.name))?.highlight ||
                      "Curated for marketplace-style browsing"}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow mb-2">Deal architecture</p>
              <h2 className="h1 mb-2">
                Promotional blocks that make the homepage feel busy in the right way.
              </h2>
            </div>
            <p className="section-copy">
              A dense but intentional mix of offers, category lanes, and trust messages keeps the site close to the references you shared.
            </p>
          </div>

          <div className="collection-grid">
            {marketplaceCollections.map((collection) => (
              <article className="collection-card" key={collection.title}>
                <p className="eyebrow mb-2">{collection.eyebrow}</p>
                <h3 className="h3">{collection.title}</h3>
                <p>{collection.copy}</p>
                <span className="announcement-link">{collection.cta}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow mb-2">Featured grid</p>
              <h2 className="h1 mb-2">Marketplace-ready products shoppers can add right away.</h2>
            </div>
            <p className="section-copy">
              {catalogMode === "live" ? "Loaded from the running catalog." : catalogMessage}
            </p>
          </div>

          <div className="market-grid">
            {showcaseProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds?.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {recentlyViewedProducts?.length ? (
        <section className="section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow mb-2">Recently viewed</p>
                <h2 className="h1 mb-2">Jump back into products you already checked.</h2>
              </div>
            </div>

            <div className="market-grid">
              {recentlyViewedProducts.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds?.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <div className="container dual-panel">
          <div className="content-panel story-panel">
            <p className="eyebrow mb-2">Why this works</p>
            <h2 className="h1 mb-3">A complete website, not just a pretty landing page.</h2>
            <p className="section-copy mb-4">
              The storefront now leans into multi-category shopping behavior, while the project still preserves routes for cart, checkout, and the seller-side admin area.
            </p>
            <div className="stack-gap">
              {marketplaceHighlights.map((highlight) => (
                <article className="mini-metric" key={highlight.title}>
                  <div>
                    <p className="eyebrow mb-1">{highlight.eyebrow}</p>
                    <strong>{highlight.title}</strong>
                  </div>
                  <span>{highlight.copy}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="story-grid">
            {sellerBenefits.map((item) => (
              <article className="support-card" key={item.title}>
                <h3 className="h4">{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="content-panel h-100">
                <p className="eyebrow mb-2">Shopper voices</p>
                <h2 className="h1 mb-4">
                  The site now feels closer to the shopping references you named.
                </h2>
                <div className="testimonial-grid">
                  {testimonials.map((voice) => (
                    <article className="testimonial-card" key={voice.name}>
                      <p className="testimonial-quote">&quot;{voice.quote}&quot;</p>
                      <strong>{voice.name}</strong>
                      <span>{voice.location}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="newsletter-card">
                <p className="eyebrow mb-2">Early access</p>
                <h2 className="h1 mb-3">Capture interest like a live campaign page.</h2>
                <p className="section-copy">
                  Use this section for new drops, festive launches, or waitlists. It submits to the backend when available and shows an honest retry message if the API is unavailable.
                </p>
                <form className="row g-3 mt-1" onSubmit={handleNewsletterSubmit}>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="First name"
                      value={newsletterForm.firstName}
                      onChange={(event) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          firstName: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={newsletterForm.interestArea}
                      onChange={(event) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          interestArea: event.target.value,
                        }))
                      }
                    >
                      {topSearches.map((searchTerm) => (
                        <option key={searchTerm} value={searchTerm}>
                          {searchTerm}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <input
                      className="form-control"
                      placeholder="Email address"
                      type="email"
                      value={newsletterForm.email}
                      onChange={(event) =>
                        setNewsletterForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="col-12 d-flex flex-wrap gap-3 align-items-center">
                    <button type="submit" className="btn-market" disabled={newsletterSubmitting}>
                      {newsletterSubmitting ? "Submitting..." : "Join campaign list"}
                    </button>
                    {newsletterMessage ? (
                      <span className={newsletterTone === "danger" ? "text-danger" : "text-success"}>
                        {newsletterMessage}
                      </span>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
