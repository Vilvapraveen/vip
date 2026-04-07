import { NavLink } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export function WishlistPage({
  wishlistProducts,
  onAddToCart,
  onToggleWishlist,
  recentlyViewedProducts,
  wishlistIds,
}) {
  if (!wishlistProducts.length) {
    return (
      <section className="section-block">
        <div className="container">
          <div className="content-panel empty-panel">
            <p className="eyebrow mb-2">Wishlist</p>
            <h1 className="display-6 mb-3">No saved items yet.</h1>
            <p className="section-copy">
              Save products while browsing so shoppers can compare, revisit, and buy later without searching again.
            </p>
            <NavLink to="/shop" className="btn-market">
              Discover products
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">Wishlist</p>
            <h1 className="display-6 mb-2">Saved products ready for a faster comeback.</h1>
          </div>
          <p className="section-copy">
            This helps the site feel more like a real marketplace account experience even without full customer login.
          </p>
        </div>

        <div className="market-grid">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds?.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {recentlyViewedProducts?.length ? (
          <div className="related-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow mb-2">Recently viewed</p>
                <h2 className="h2 mb-0">More products to compare against your saved list.</h2>
              </div>
            </div>
            <div className="market-grid">
              {recentlyViewedProducts
                .filter((product) => !wishlistIds?.includes(product.id))
                .slice(0, 3)
                .map((product) => (
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
        ) : null}
      </div>
    </section>
  );
}
