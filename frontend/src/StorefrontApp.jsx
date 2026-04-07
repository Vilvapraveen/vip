import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { apiRequest } from "./api";
import { AdminDashboardPage } from "./admin/AdminDashboardPage";
import {
  buildFallbackHomeContent,
  marketplaceProducts as fallbackProducts,
} from "./store/mockStore";
import { AdminLoginPage } from "./storefront/AdminLoginPage";
import { CheckoutPage } from "./storefront/CheckoutPage";
import { HomePage } from "./storefront/HomePage";
import { ProductDetailPage } from "./storefront/ProductDetailPage";
import { SiteLayout } from "./storefront/SiteLayout";
import { ShopPage } from "./storefront/ShopPage";
import { SupportPage } from "./storefront/SupportPage";
import { WishlistPage } from "./storefront/WishlistPage";
import { normalizeHomeContent, normalizeProduct } from "./storefront/storefrontUtils";

const CART_STORAGE_KEY = "vx-bazaar-cart";
const ADMIN_STORAGE_KEY = "vx-bazaar-admin-session";
const WISHLIST_STORAGE_KEY = "vx-bazaar-wishlist";
const PROFILE_STORAGE_KEY = "vx-bazaar-profile";
const RECENTLY_VIEWED_STORAGE_KEY = "vx-bazaar-recent";

function resolveStorage(storageType) {
  return storageType === "session" ? window.sessionStorage : window.localStorage;
}

function readStorage(key, fallback, storageType = "local") {
  try {
    const rawValue = resolveStorage(storageType).getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function usePersistentState(key, fallback, storageType = "local") {
  const [value, setValue] = useState(() => readStorage(key, fallback, storageType));

  useEffect(() => {
    try {
      const storage = resolveStorage(storageType);
      if (value == null) {
        storage.removeItem(key);
        return;
      }
      storage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage write failures and keep the in-memory state usable.
    }
  }, [key, storageType, value]);

  return [value, setValue];
}

function ProtectedAdminRoute({ onLogout, session }) {
  if (!session?.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboardPage session={session} onLogout={onLogout} />;
}

function ShopRoute(props) {
  const [searchParams] = useSearchParams();
  return <ShopPage {...props} searchParams={searchParams} />;
}

export default function StorefrontApp() {
  const [cartItems, setCartItems] = usePersistentState(CART_STORAGE_KEY, []);
  const [adminSession, setAdminSession] = usePersistentState(ADMIN_STORAGE_KEY, null, "session");
  const [wishlistIds, setWishlistIds] = usePersistentState(WISHLIST_STORAGE_KEY, []);
  const [savedProfile, setSavedProfile] = usePersistentState(PROFILE_STORAGE_KEY, {});
  const [recentlyViewedIds, setRecentlyViewedIds] = usePersistentState(RECENTLY_VIEWED_STORAGE_KEY, []);
  const [catalogState, setCatalogState] = useState({
    loading: true,
    products: fallbackProducts,
    source: "demo",
    message:
      "Live product APIs are unavailable right now, so the storefront is showing a built-in showcase catalog.",
  });
  const [homeState, setHomeState] = useState({
    content: buildFallbackHomeContent(fallbackProducts),
    source: "demo",
  });

  useEffect(() => {
    let ignore = false;

    async function loadStorefrontData() {
      const [productsResult, homeResult] = await Promise.allSettled([
        apiRequest("/api/store/products?page=0&size=100"),
        apiRequest("/api/store/home"),
      ]);

      if (ignore) {
        return;
      }

      let activeProducts = fallbackProducts;
      let productSource = "demo";
      let productMessage =
        "Live product APIs are unavailable right now, so the storefront is showing a built-in showcase catalog.";

      if (productsResult.status === "fulfilled") {
        const normalizedProducts = (productsResult.value?.content || [])
          .map(normalizeProduct)
          .filter(Boolean);

        if (normalizedProducts.length) {
          activeProducts = normalizedProducts;
          productSource = "live";
          productMessage = "Connected to the live storefront catalog.";
        }
      }

      setCatalogState({
        loading: false,
        products: activeProducts,
        source: productSource,
        message: productMessage,
      });

      if (homeResult.status === "fulfilled") {
        setHomeState({
          content:
            normalizeHomeContent(homeResult.value) || buildFallbackHomeContent(activeProducts),
          source: "live",
        });
      } else {
        setHomeState({
          content: buildFallbackHomeContent(activeProducts),
          source: "demo",
        });
      }
    }

    loadStorefrontData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!adminSession?.expiresAtEpochMs) {
      return undefined;
    }

    const remainingMs = adminSession.expiresAtEpochMs - Date.now();
    if (remainingMs <= 0) {
      setAdminSession(null);
      return undefined;
    }

    const expiryTimer = window.setTimeout(() => {
      setAdminSession(null);
    }, remainingMs);

    return () => window.clearTimeout(expiryTimer);
  }, [adminSession, setAdminSession]);

  function handleAddToCart(product, quantity = 1) {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      const safeQuantity = Math.max(Number(quantity || 1), 1);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + safeQuantity } : item
        );
      }

      return [...current, { ...product, quantity: safeQuantity }];
    });
  }

  function handleUpdateQuantity(productId, nextQuantity) {
    if (nextQuantity <= 0) {
      setCartItems((current) => current.filter((item) => item.id !== productId));
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  }

  function handleRemoveItem(productId) {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  }

  function handleClearCart() {
    setCartItems([]);
  }

  function handleAdminLogin(session) {
    setAdminSession(session);
  }

  function handleAdminLogout() {
    setAdminSession(null);
  }

  function handleToggleWishlist(product) {
    setWishlistIds((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );
  }

  function handleSaveProfile(profile) {
    if (!profile) {
      setSavedProfile({});
      return;
    }

    setSavedProfile({
      customerName: profile.customerName || "",
      customerEmail: profile.customerEmail || "",
      customerPhone: profile.customerPhone || "",
      shippingAddress: profile.shippingAddress || "",
      deliveryCity: profile.deliveryCity || "",
      deliveryState: profile.deliveryState || "Tamil Nadu",
      deliveryPincode: profile.deliveryPincode || "",
    });
  }

  function handleProductView(product) {
    setRecentlyViewedIds((current) => {
      const next = [product.id, ...current.filter((id) => id !== product.id)];
      return next.slice(0, 8);
    });
  }

  const cartCount = cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const catalogMode = catalogState.source === "live" ? "live" : "demo";
  const wishlistProducts = catalogState.products.filter((product) => wishlistIds.includes(product.id));
  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => catalogState.products.find((product) => product.id === id))
    .filter(Boolean);
  const sharedStorefrontProps = {
    products: catalogState.products,
    loading: catalogState.loading,
    catalogMode,
    catalogMessage: catalogState.message,
    homeContent: homeState.content,
    onAddToCart: handleAddToCart,
    wishlistIds,
    onToggleWishlist: handleToggleWishlist,
    recentlyViewedProducts,
  };

  return (
    <Routes>
      <Route
        element={
          <SiteLayout
            cartCount={cartCount}
            catalogMode={catalogMode}
            catalogMessage={catalogState.message}
            wishlistCount={wishlistProducts.length}
          />
        }
      >
        <Route index element={<HomePage {...sharedStorefrontProps} />} />
        <Route path="/shop" element={<ShopRoute {...sharedStorefrontProps} />} />
        <Route
          path="/products/:slug"
          element={
            <ProductDetailPage
              products={catalogState.products}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onProductView={handleProductView}
              recentlyViewedProducts={recentlyViewedProducts}
              wishlistIds={wishlistIds}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlistProducts={wishlistProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              recentlyViewedProducts={recentlyViewedProducts}
              wishlistIds={wishlistIds}
            />
          }
        />
        <Route
          path="/support"
          element={<SupportPage />}
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              catalogMode={catalogMode}
              catalogMessage={catalogState.message}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              savedProfile={savedProfile}
              onSaveProfile={handleSaveProfile}
            />
          }
        />
      </Route>
      <Route
        path="/admin/login"
        element={<AdminLoginPage onLogin={handleAdminLogin} currentSession={adminSession} />}
      />
      <Route
        path="/admin"
        element={<ProtectedAdminRoute session={adminSession} onLogout={handleAdminLogout} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
