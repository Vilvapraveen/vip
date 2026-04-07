import { useEffect, useState } from "react";
import { marketplaceCategories, topSearches } from "../store/mockStore";
import { ProductCard } from "./ProductCard";

export function ShopPage({
  products,
  loading,
  catalogMode,
  catalogMessage,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  searchParams,
}) {
  const [filters, setFilters] = useState(() => ({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: "popularity",
    featuredOnly: false,
    assuredOnly: false,
    fastOnly: false,
    wishlistOnly: false,
  }));
  const [page, setPage] = useState(0);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    setFilters((current) => {
      if (current.search === search && current.category === category) {
        return current;
      }

      return {
        ...current,
        search,
        category,
      };
    });
  }, [searchParams]);

  useEffect(() => {
    setPage(0);
  }, [
    filters.assuredOnly,
    filters.category,
    filters.fastOnly,
    filters.featuredOnly,
    filters.search,
    filters.sort,
    filters.wishlistOnly,
  ]);

  const filteredProducts = [...products]
    .filter((product) => {
      const searchValue = filters.search.trim().toLowerCase();
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue);
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesFeatured = !filters.featuredOnly || product.featured;
      const matchesAssured = !filters.assuredOnly || product.assured;
      const matchesFast = !filters.fastOnly || product.fastDelivery;
      const matchesWishlist = !filters.wishlistOnly || wishlistIds?.includes(product.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFeatured &&
        matchesAssured &&
        matchesFast &&
        matchesWishlist
      );
    })
    .sort((left, right) => {
      if (filters.sort === "price-low") {
        return Number(left.price || 0) - Number(right.price || 0);
      }
      if (filters.sort === "price-high") {
        return Number(right.price || 0) - Number(left.price || 0);
      }
      if (filters.sort === "rating") {
        return Number(right.rating || 0) - Number(left.rating || 0);
      }
      return Number(right.popularity || 0) - Number(left.popularity || 0);
    });

  const totalPages = Math.max(Math.ceil(filteredProducts.length / 9), 1);
  const activePage = Math.min(page, totalPages - 1);
  const visibleProducts = filteredProducts.slice(activePage * 9, activePage * 9 + 9);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(totalPages - 1, 0));
    }
  }, [page, totalPages]);

  return (
    <section className="section-block">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow mb-2">Shop all</p>
            <h1 className="display-6 mb-2">A full product feed with marketplace-style filtering.</h1>
          </div>
          <p className="section-copy">
            {catalogMode === "live"
              ? "Browsing the live catalog feed."
              : `${catalogMessage} Filters still work locally so the page stays useful.`}
          </p>
        </div>

        <div className="filter-panel">
          <div className="filter-grid">
            <input
              className="form-control"
              placeholder="Search by product, category, or use case"
              value={filters.search}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  search: event.target.value,
                }))
              }
            />
            <select
              className="form-select"
              value={filters.category}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
            >
              <option value="">All categories</option>
              {marketplaceCategories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={filters.sort}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  sort: event.target.value,
                }))
              }
            >
              <option value="popularity">Sort by popularity</option>
              <option value="rating">Sort by rating</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>

          <div className="toggle-row">
            <label className="toggle-pill">
              <input
                type="checkbox"
                checked={filters.featuredOnly}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    featuredOnly: event.target.checked,
                  }))
                }
              />
              Featured only
            </label>
            <label className="toggle-pill">
              <input
                type="checkbox"
                checked={filters.assuredOnly}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    assuredOnly: event.target.checked,
                  }))
                }
              />
              Assured sellers
            </label>
            <label className="toggle-pill">
              <input
                type="checkbox"
                checked={filters.fastOnly}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    fastOnly: event.target.checked,
                  }))
                }
              />
              Fast delivery
            </label>
            <label className="toggle-pill">
              <input
                type="checkbox"
                checked={filters.wishlistOnly}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    wishlistOnly: event.target.checked,
                  }))
                }
              />
              Wishlist only
            </label>
          </div>

          <div className="search-chip-row">
            {topSearches.map((searchTerm) => (
              <button
                key={searchTerm}
                type="button"
                className="search-chip"
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    search: searchTerm,
                  }))
                }
              >
                {searchTerm}
              </button>
            ))}
          </div>
        </div>

        <div className="results-bar">
          <span>
            Showing {visibleProducts.length} of {filteredProducts.length} products
          </span>
          <span>{loading ? "Refreshing catalog..." : "Ready to add to cart"}</span>
        </div>

        {visibleProducts.length ? (
          <div className="market-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds?.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="content-panel empty-panel">
            <h2 className="h3 mb-3">No products match these filters.</h2>
            <p className="section-copy mb-0">
              Try clearing one or two filters, or search for one of the quick terms above.
            </p>
          </div>
        )}

        <div className="pager-row">
          <span>
            Page {activePage + 1} of {totalPages}
          </span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn-market-muted"
              disabled={activePage === 0}
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn-market"
              disabled={activePage >= totalPages - 1}
              onClick={() => setPage((current) => Math.min(current + 1, totalPages - 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
