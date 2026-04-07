import { NavLink } from "react-router-dom";
import { formatCurrency } from "../api";
import {
  formatCompactNumber,
  getDiscountPercent,
  splitLines,
} from "./storefrontUtils";

export function ProductCard({
  product,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) {
  const discountPercent = getDiscountPercent(product);
  const benefitPreview = splitLines(product.benefits).slice(0, 2);
  const detailPath = `/products/${product.slug || product.id}`;

  return (
    <article className="product-card">
      <div className="product-image-shell">
        <NavLink className="product-image-link" to={detailPath}>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </NavLink>
        <div className="product-badges">
          {discountPercent ? <span className="chip chip-accent">{discountPercent}% off</span> : null}
          {product.assured ? <span className="chip chip-soft">Assured</span> : null}
        </div>
        {onToggleWishlist ? (
          <button
            type="button"
            className={`wishlist-toggle${isWishlisted ? " active" : ""}`}
            onClick={() => onToggleWishlist(product)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? "Saved" : "Save"}
          </button>
        ) : null}
      </div>
      <div className="product-copy">
        <div className="product-topline">
          <p className="eyebrow mb-1">{product.category}</p>
          <span className="rating-pill">
            {product.rating} | {formatCompactNumber(product.reviewCount)} reviews
          </span>
        </div>
        <h3 className="product-title">
          <NavLink className="product-name-link" to={detailPath}>
            {product.name}
          </NavLink>
        </h3>
        <p className="product-tagline">{product.tagline}</p>
        <p className="product-description">{product.description}</p>
        {benefitPreview.length ? (
          <ul className="benefits-list">
            {benefitPreview.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        ) : null}
        <div className="product-footer">
          <div>
            <div className="product-price-row">
              <strong className="price-text">{formatCurrency(product.price)}</strong>
              <span className="struck-price">{formatCurrency(product.originalPrice)}</span>
            </div>
            <p className="delivery-copy">{product.deliveryLabel}</p>
            <p className="seller-copy">Seller: {product.sellerName}</p>
          </div>
          <div className="product-actions">
            <NavLink className="btn-market-muted btn-small" to={detailPath}>
              View details
            </NavLink>
            <button type="button" className="btn-market btn-small" onClick={() => onAddToCart(product)}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
