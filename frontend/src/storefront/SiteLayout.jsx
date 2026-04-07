import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { marketplaceConfig } from "../store/mockStore";

export function SiteLayout({ cartCount, catalogMode, catalogMessage, wishlistCount }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  function navLinkClass({ isActive }) {
    return `nav-pill${isActive ? " active" : ""}`;
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchText.trim()) {
      params.set("search", searchText.trim());
    }
    navigate(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="site-shell">
      <div className="site-topbar">
        <div className="container site-topbar-inner">
          <p className="topbar-copy">{marketplaceConfig.topMessage}</p>
          <div className="topbar-tags">
            <span>COD available</span>
            <span>{catalogMode === "live" ? "Live catalog connected" : "Demo catalog ready"}</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-grid">
          <div className="brand-lockup">
            <NavLink className="brand-mark" to="/">
              {marketplaceConfig.brandName}
            </NavLink>
            <p className="brand-tag">{marketplaceConfig.brandTagline}</p>
          </div>

          <form className="search-shell" onSubmit={handleSearchSubmit}>
            <input
              className="search-input"
              placeholder="Search fashion, gadgets, beauty, and home picks"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button type="submit" className="btn-market">
              Search
            </button>
          </form>

          <div className="quick-actions">
            <NavLink className="quick-link" to="/wishlist">
              Wishlist ({wishlistCount})
            </NavLink>
            <NavLink className="quick-link" to="/admin/login">
              Seller Hub
            </NavLink>
            <NavLink className="quick-link cart-link" to="/checkout">
              Cart ({cartCount})
            </NavLink>
          </div>
        </div>

        <div className="container header-nav">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={navLinkClass} to="/shop">
            Shop
          </NavLink>
          <NavLink className={navLinkClass} to="/checkout">
            Checkout
          </NavLink>
          <NavLink className={navLinkClass} to="/wishlist">
            Wishlist
          </NavLink>
          <NavLink className={navLinkClass} to="/support">
            Support
          </NavLink>
          <NavLink className={navLinkClass} to="/shop?category=Fashion">
            Fashion
          </NavLink>
          <NavLink className={navLinkClass} to="/shop?category=Electronics">
            Electronics
          </NavLink>
          <NavLink className={navLinkClass} to="/shop?category=Home">
            Home
          </NavLink>
        </div>
      </header>

      {catalogMode === "demo" ? (
        <div className="container">
          <div className="demo-banner">{catalogMessage}</div>
        </div>
      ) : null}

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <div>
            <p className="eyebrow footer-eyebrow">VX Bazaar</p>
            <h2 className="footer-title">
              Marketplace energy on the storefront, operational depth in the back office.
            </h2>
            <p className="footer-copy">
              This project now feels closer to a modern multi-category shopping destination while keeping the existing React and Spring Boot structure underneath.
            </p>
          </div>
          <div className="footer-grid">
            <div>
              <h3 className="footer-heading">Explore</h3>
              <NavLink className="footer-link" to="/shop">
                All products
              </NavLink>
              <NavLink className="footer-link" to="/shop?category=Fashion">
                Fashion deals
              </NavLink>
              <NavLink className="footer-link" to="/shop?category=Electronics">
                Gadget zone
              </NavLink>
            </div>
            <div>
              <h3 className="footer-heading">Checkout</h3>
              <NavLink className="footer-link" to="/checkout">
                Cart summary
              </NavLink>
              <NavLink className="footer-link" to="/wishlist">
                Saved items
              </NavLink>
              <span className="footer-link muted">UPI, cards, and COD</span>
              <span className="footer-link muted">Trusted delivery messaging</span>
            </div>
            <div>
              <h3 className="footer-heading">Operations</h3>
              <NavLink className="footer-link" to="/admin/login">
                Seller hub
              </NavLink>
              <NavLink className="footer-link" to="/support">
                Help and support
              </NavLink>
              <span className="footer-link muted">Catalog and orders</span>
              <span className="footer-link muted">Users and reports</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
