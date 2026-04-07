import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../api";
import { ProductCard } from "./ProductCard";
import {
  findProductBySlug,
  formatCompactNumber,
  getDiscountPercent,
  splitLines,
} from "./storefrontUtils";

export function ProductDetailPage({
  products,
  onAddToCart,
  onToggleWishlist,
  onProductView,
  recentlyViewedProducts,
  wishlistIds,
}) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = findProductBySlug(products, slug);

  const relatedProducts = product
    ? products
        .filter((item) => item.id !== product.id)
        .sort((left, right) => {
          const leftScore =
            (left.category === product.category ? 4 : 0) +
            (left.featured ? 2 : 0) +
            Number(left.popularity || 0) / 100;
          const rightScore =
            (right.category === product.category ? 4 : 0) +
            (right.featured ? 2 : 0) +
            Number(right.popularity || 0) / 100;
          return rightScore - leftScore;
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (product && onProductView) {
      onProductView(product);
    }
  }, [onProductView, product]);

  if (!product) {
    return (
      <section className="section-block">
        <div className="container">
          <div className="content-panel empty-panel">
            <p className="eyebrow mb-2">Product details</p>
            <h1 className="display-6 mb-3">This product could not be found.</h1>
            <p className="section-copy">
              It may have moved, or the catalog has been refreshed since the link was created.
            </p>
            <NavLink className="btn-market" to="/shop">
              Back to shop
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  const benefits = splitLines(product.benefits);
  const ingredients = splitLines(product.ingredients || "");
  const discountPercent = getDiscountPercent(product);
  const isWishlisted = wishlistIds?.includes(product.id);

  function handleAddToCart() {
    onAddToCart(product, quantity);
  }

  function handleBuyNow() {
    onAddToCart(product, quantity);
    navigate("/checkout");
  }

  return (
    <section className="section-block">
      <div className="container">
        <div className="breadcrumb-row">
          <NavLink to="/">Home</NavLink>
          <span>/</span>
          <NavLink to="/shop">Shop</NavLink>
          <span>/</span>
          <NavLink to={`/shop?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </NavLink>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-image-shell">
              <img src={product.imageUrl} alt={product.name} className="detail-image" />
            </div>
            <div className="detail-badges">
              {product.badge ? <span className="chip chip-accent">{product.badge}</span> : null}
              {discountPercent ? <span className="chip chip-soft">{discountPercent}% savings</span> : null}
              {product.fastDelivery ? <span className="chip chip-soft">Fast delivery</span> : null}
            </div>
          </div>

          <div className="detail-copy-panel">
            <p className="eyebrow mb-2">{product.category}</p>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>

            <div className="detail-rating-row">
              <span className="rating-star">4.5+</span>
              <span>
                {product.rating} rating from {formatCompactNumber(product.reviewCount)} shoppers
              </span>
            </div>

            <div className="detail-price-block">
              <div className="product-price-row">
                <strong className="detail-price">{formatCurrency(product.price)}</strong>
                <span className="struck-price">{formatCurrency(product.originalPrice)}</span>
              </div>
              <p className="delivery-copy mb-0">{product.deliveryLabel}</p>
            </div>

            <p className="section-copy">{product.description}</p>

            {benefits.length ? (
              <div className="detail-list-card">
                <h2 className="h5 mb-3">Why shoppers like it</h2>
                <ul className="benefits-list">
                  {benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="buy-box">
              <div className="quantity-picker">
                <span>Quantity</span>
                <div className="quantity-row">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity((current) => Math.min(current + 1, 10))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="detail-cta-row">
                <button type="button" className="btn-market" onClick={handleAddToCart}>
                  Add {quantity} to cart
                </button>
                <button type="button" className="btn-market-muted" onClick={handleBuyNow}>
                  Buy now
                </button>
                {onToggleWishlist ? (
                  <button
                    type="button"
                    className="btn-market-muted"
                    onClick={() => onToggleWishlist(product)}
                  >
                    {isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="detail-meta-grid">
              <article className="support-card">
                <h3 className="h5">Seller</h3>
                <p>{product.sellerName}</p>
              </article>
              <article className="support-card">
                <h3 className="h5">Unit</h3>
                <p>{product.unitLabel}</p>
              </article>
              <article className="support-card">
                <h3 className="h5">Catalog status</h3>
                <p>{product.assured ? "Assured listing" : "Marketplace listing"}</p>
              </article>
            </div>
          </div>
        </div>

        <div className="detail-lower-grid">
          <article className="content-panel">
            <p className="eyebrow mb-2">Product story</p>
            <h2 className="h3 mb-3">Why this listing works on a marketplace storefront</h2>
            <p className="section-copy">
              The page is structured to support high-intent browsing with a clear value proposition, visible pricing, trust signals, quantity controls, and quick paths into cart or checkout.
            </p>
          </article>

          <article className="content-panel">
            <p className="eyebrow mb-2">Details</p>
            <h2 className="h3 mb-3">What shoppers should know</h2>
            <div className="stack-gap">
              <div className="mini-metric">
                <strong>Delivery</strong>
                <span>{product.deliveryLabel}</span>
              </div>
              <div className="mini-metric">
                <strong>Category</strong>
                <span>{product.category}</span>
              </div>
              <div className="mini-metric">
                <strong>Seller</strong>
                <span>{product.sellerName}</span>
              </div>
              {ingredients.length ? (
                <div className="mini-metric">
                  <strong>Specs / ingredients</strong>
                  <span>{ingredients.join(", ")}</span>
                </div>
              ) : null}
            </div>
          </article>
        </div>

        {relatedProducts.length ? (
          <div className="related-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow mb-2">Related picks</p>
                <h2 className="h2 mb-0">Keep the cart moving with similar products.</h2>
              </div>
            </div>
            <div className="market-grid">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds?.includes(item.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        ) : null}

        {recentlyViewedProducts?.length ? (
          <div className="related-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow mb-2">Recently viewed</p>
                <h2 className="h2 mb-0">Keep your shortlist moving.</h2>
              </div>
            </div>
            <div className="market-grid">
              {recentlyViewedProducts
                .filter((item) => item.id !== product.id)
                .slice(0, 3)
                .map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlistIds?.includes(item.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
