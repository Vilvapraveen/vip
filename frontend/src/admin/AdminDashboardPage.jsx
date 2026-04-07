import { useEffect, useState } from "react";
import { apiRequest, formatCurrency, formatDate } from "../api";

const ORDER_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const defaultProductForm = {
  id: "",
  name: "",
  tagline: "",
  category: "",
  slug: "",
  badge: "",
  price: "",
  stockQuantity: "",
  unitLabel: "",
  originRegion: "",
  rating: "4.8",
  reviewCount: "0",
  sortOrder: "0",
  imageUrl: "",
  description: "",
  benefits: "",
  ingredients: "",
  featured: false,
  heroProduct: false,
  organicCertified: true,
  active: true,
};

function toProductForm(product) {
  if (!product) {
    return defaultProductForm;
  }

  return {
    id: product.id || "",
    name: product.name || "",
    tagline: product.tagline || "",
    category: product.category || "",
    slug: product.slug || "",
    badge: product.badge || "",
    price: product.price ?? "",
    stockQuantity: product.stockQuantity ?? "",
    unitLabel: product.unitLabel || "",
    originRegion: product.originRegion || "",
    rating: product.rating ?? "4.8",
    reviewCount: product.reviewCount ?? "0",
    sortOrder: product.sortOrder ?? "0",
    imageUrl: product.imageUrl || "",
    description: product.description || "",
    benefits: product.benefits || "",
    ingredients: product.ingredients || "",
    featured: Boolean(product.featured),
    heroProduct: Boolean(product.heroProduct),
    organicCertified: product.organicCertified !== false,
    active: product.active !== false,
  };
}

function toProductPayload(form) {
  return {
    name: form.name,
    tagline: form.tagline,
    category: form.category,
    slug: form.slug,
    badge: form.badge,
    price: Number(form.price),
    stockQuantity: Number(form.stockQuantity),
    unitLabel: form.unitLabel,
    originRegion: form.originRegion,
    rating: Number(form.rating),
    reviewCount: Number(form.reviewCount),
    sortOrder: Number(form.sortOrder),
    imageUrl: form.imageUrl,
    description: form.description,
    benefits: form.benefits,
    ingredients: form.ingredients,
    featured: form.featured,
    heroProduct: form.heroProduct,
    organicCertified: form.organicCertified,
    active: form.active,
  };
}

export function AdminDashboardPage({ session, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [productsPage, setProductsPage] = useState({ content: [] });
  const [ordersPage, setOrdersPage] = useState({ content: [] });
  const [usersPage, setUsersPage] = useState({ content: [] });
  const [report, setReport] = useState(null);
  const [productForm, setProductForm] = useState(defaultProductForm);
  const [userDrafts, setUserDrafts] = useState({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadDashboardData() {
      setLoading(true);
      setError("");
      try {
        const [dashboardPayload, productsPayload, ordersPayload, usersPayload, reportPayload] =
          await Promise.all([
            apiRequest("/api/admin/dashboard", { token: session.token }),
            apiRequest("/api/admin/products?page=0&size=12", { token: session.token }),
            apiRequest("/api/admin/orders?page=0&size=10", { token: session.token }),
            apiRequest("/api/admin/users?page=0&size=10", { token: session.token }),
            apiRequest("/api/admin/reports/overview", { token: session.token }),
          ]);

        if (ignore) {
          return;
        }

        setDashboard(dashboardPayload);
        setProductsPage(productsPayload);
        setOrdersPage(ordersPayload);
        setUsersPage(usersPayload);
        setReport(reportPayload);
        setUserDrafts(
          Object.fromEntries(
            (usersPayload.content || []).map((user) => [
              user.id,
              { email: user.email || "", fullName: user.fullName || "" },
            ])
          )
        );
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();
    return () => {
      ignore = true;
    };
  }, [session.token]);

  function updateNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  async function refreshProductsAndMetrics() {
    const [dashboardPayload, productsPayload, reportPayload] = await Promise.all([
      apiRequest("/api/admin/dashboard", { token: session.token }),
      apiRequest("/api/admin/products?page=0&size=12", { token: session.token }),
      apiRequest("/api/admin/reports/overview", { token: session.token }),
    ]);
    setDashboard(dashboardPayload);
    setProductsPage(productsPayload);
    setReport(reportPayload);
  }

  async function refreshOrdersAndMetrics() {
    const [dashboardPayload, ordersPayload, reportPayload] = await Promise.all([
      apiRequest("/api/admin/dashboard", { token: session.token }),
      apiRequest("/api/admin/orders?page=0&size=10", { token: session.token }),
      apiRequest("/api/admin/reports/overview", { token: session.token }),
    ]);
    setDashboard(dashboardPayload);
    setOrdersPage(ordersPayload);
    setReport(reportPayload);
  }

  async function refreshUsers() {
    const usersPayload = await apiRequest("/api/admin/users?page=0&size=10", {
      token: session.token,
    });
    setUsersPage(usersPayload);
    setUserDrafts(
      Object.fromEntries(
        (usersPayload.content || []).map((user) => [
          user.id,
          { email: user.email || "", fullName: user.fullName || "" },
        ])
      )
    );
  }

  async function handleProductSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const payload = toProductPayload(productForm);
      const hasId = Boolean(productForm.id);
      await apiRequest(
        hasId ? `/api/admin/products/${productForm.id}` : "/api/admin/products",
        {
          method: hasId ? "PUT" : "POST",
          token: session.token,
          body: JSON.stringify(payload),
        }
      );
      setProductForm(defaultProductForm);
      await refreshProductsAndMetrics();
      updateNotice(hasId ? "Product updated successfully." : "Product created successfully.");
      setActiveTab("products");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeleteProduct(productId) {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await apiRequest(`/api/admin/products/${productId}`, {
        method: "DELETE",
        token: session.token,
      });
      await refreshProductsAndMetrics();
      updateNotice("Product deleted successfully.");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleUpdateOrder(orderId, status) {
    try {
      await apiRequest(`/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        token: session.token,
        body: JSON.stringify({ status }),
      });
      await refreshOrdersAndMetrics();
      updateNotice(`Order ${orderId} moved to ${status}.`);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleSaveUser(userId) {
    const draft = userDrafts[userId];
    try {
      await apiRequest(`/api/admin/users/${userId}`, {
        method: "PUT",
        token: session.token,
        body: JSON.stringify(draft),
      });
      await refreshUsers();
      updateNotice("User updated successfully.");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeleteUser(userId) {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await apiRequest(`/api/admin/users/${userId}`, {
        method: "DELETE",
        token: session.token,
      });
      await refreshUsers();
      updateNotice("User deleted successfully.");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (loading) {
    return (
      <section className="container py-5">
        <div className="content-panel p-5 text-center">Loading admin workspace...</div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="admin-shell">
        <div className="admin-header mb-4">
          <div>
            <p className="eyebrow mb-2">Admin Dashboard</p>
            <h1 className="display-6 mb-2">Jaya&apos;s Organic operations workspace</h1>
            <p className="text-secondary mb-0">
              Welcome, {session.username}. Use the tabs below to manage the storefront and operations data.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-dark rounded-pill"
              onClick={() => setActiveTab("products")}
            >
              Add product
            </button>
            <button type="button" className="btn btn-danger rounded-pill" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {notice ? <div className="alert alert-success">{notice}</div> : null}
        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div className="admin-tabbar">
          {[
            ["overview", "Overview"],
            ["products", "Products"],
            ["orders", "Orders"],
            ["users", "Users"],
            ["reports", "Reports"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`tab-pill ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "overview" ? (
          <div className="row g-4">
            <div className="col-md-6 col-xl-3">
              <div className="stat-card h-100">
                <p className="eyebrow mb-2">Products</p>
                <h2 className="display-6 mb-1">{dashboard?.totalProducts || 0}</h2>
                <p className="text-secondary mb-0">
                  {dashboard?.featuredProducts || 0} featured, {dashboard?.lowStockProducts || 0} low stock
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="stat-card h-100">
                <p className="eyebrow mb-2">Orders</p>
                <h2 className="display-6 mb-1">{dashboard?.totalOrders || 0}</h2>
                <p className="text-secondary mb-0">
                  {dashboard?.pendingOrders || 0} pending, {dashboard?.processingOrders || 0} processing
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="stat-card h-100">
                <p className="eyebrow mb-2">Users</p>
                <h2 className="display-6 mb-1">{dashboard?.totalUsers || 0}</h2>
                <p className="text-secondary mb-0">Average order value {formatCurrency(dashboard?.averageOrderValue)}</p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="stat-card h-100">
                <p className="eyebrow mb-2">Revenue</p>
                <h2 className="display-6 mb-1">{formatCurrency(dashboard?.totalRevenue)}</h2>
                <p className="text-secondary mb-0">{dashboard?.totalInventoryUnits || 0} units currently in stock</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="content-panel p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="eyebrow mb-2">Recent Orders</p>
                    <h2 className="h3 mb-0">Latest order activity</h2>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Ref</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(ordersPage.content || []).slice(0, 5).map((order) => (
                        <tr key={order.id}>
                          <td>{order.orderReference || order.id}</td>
                          <td>{order.customerName || order.username}</td>
                          <td>
                            <span className={`status-pill ${String(order.status || "").toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{formatCurrency(order.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="content-panel p-4 h-100">
                <p className="eyebrow mb-2">Top Products</p>
                <h2 className="h3 mb-3">Revenue-leading catalog items</h2>
                <div className="stack-gap">
                  {(report?.topProducts || []).slice(0, 5).map((product) => (
                    <div className="mini-metric" key={product.productId}>
                      <div>
                        <strong>{product.name}</strong>
                        <p className="text-secondary mb-0">
                          {product.category} · {product.orderedUnits} units
                        </p>
                      </div>
                      <strong>{formatCurrency(product.revenue)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "products" ? (
          <div className="row g-4">
            <div className="col-xl-5">
              <form className="content-panel p-4 h-100" onSubmit={handleProductSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="eyebrow mb-2">Catalog Editor</p>
                    <h2 className="h3 mb-0">
                      {productForm.id ? "Update product" : "Create product"}
                    </h2>
                  </div>
                  {productForm.id ? (
                    <button
                      type="button"
                      className="btn btn-link text-danger"
                      onClick={() => setProductForm(defaultProductForm)}
                    >
                      Reset
                    </button>
                  ) : null}
                </div>
                <div className="row g-3">
                  {[
                    ["name", "Product name"],
                    ["tagline", "Tagline"],
                    ["category", "Category"],
                    ["slug", "Slug"],
                    ["badge", "Badge"],
                    ["price", "Price"],
                    ["stockQuantity", "Stock quantity"],
                    ["unitLabel", "Unit label"],
                    ["originRegion", "Origin region"],
                    ["rating", "Rating"],
                    ["reviewCount", "Review count"],
                    ["sortOrder", "Sort order"],
                    ["imageUrl", "Image URL"],
                  ].map(([field, label]) => (
                    <div className="col-md-6" key={field}>
                      <label className="form-label">{label}</label>
                      <input
                        className="form-control"
                        value={productForm[field]}
                        onChange={(event) =>
                          setProductForm((current) => ({
                            ...current,
                            [field]: event.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={productForm.description}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Benefits</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={productForm.benefits}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          benefits: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Ingredients</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={productForm.ingredients}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          ingredients: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-wrap gap-3">
                      {[
                        ["featured", "Featured"],
                        ["heroProduct", "Hero product"],
                        ["organicCertified", "Organic certified"],
                        ["active", "Active"],
                      ].map(([field, label]) => (
                        <label className="form-check" key={field}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={productForm[field]}
                            onChange={(event) =>
                              setProductForm((current) => ({
                                ...current,
                                [field]: event.target.checked,
                              }))
                            }
                          />
                          <span className="form-check-label ms-2">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-success rounded-pill px-4">
                    {productForm.id ? "Save changes" : "Create product"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark rounded-pill px-4"
                    onClick={() => setProductForm(defaultProductForm)}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
            <div className="col-xl-7">
              <div className="content-panel p-4 h-100">
                <p className="eyebrow mb-2">Live Catalog</p>
                <h2 className="h3 mb-3">Storefront-ready products</h2>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {(productsPage.content || []).map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img src={product.imageUrl} alt={product.name} className="table-thumb" />
                              <div>
                                <strong>{product.name}</strong>
                                <p className="text-secondary small mb-0">{product.tagline}</p>
                              </div>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td>{formatCurrency(product.price)}</td>
                          <td>{product.stockQuantity}</td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark rounded-pill"
                                onClick={() => {
                                  setProductForm(toProductForm(product));
                                  setActiveTab("products");
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger rounded-pill"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "orders" ? (
          <div className="content-panel p-4">
            <p className="eyebrow mb-2">Order Management</p>
            <h2 className="h3 mb-3">Track and update customer orders</h2>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Delivery</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(ordersPage.content || []).map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.orderReference || order.id}</strong>
                        <p className="text-secondary small mb-0">{formatDate(order.createdAt)}</p>
                      </td>
                      <td>
                        <strong>{order.customerName || order.username}</strong>
                        <p className="text-secondary small mb-0">{order.customerEmail}</p>
                      </td>
                      <td>
                        <strong>{order.deliveryCity}</strong>
                        <p className="text-secondary small mb-0">{order.deliveryPincode}</p>
                      </td>
                      <td>{order.paymentMethod || "COD"}</td>
                      <td>{formatCurrency(order.totalPrice)}</td>
                      <td>
                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(event) => handleUpdateOrder(order.id, event.target.value)}
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {activeTab === "users" ? (
          <div className="content-panel p-4">
            <p className="eyebrow mb-2">Customer Records</p>
            <h2 className="h3 mb-3">Manage user contact details</h2>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Full name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {(usersPage.content || []).map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>
                        <input
                          className="form-control"
                          value={userDrafts[user.id]?.email || ""}
                          onChange={(event) =>
                            setUserDrafts((current) => ({
                              ...current,
                              [user.id]: {
                                ...(current[user.id] || {}),
                                email: event.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={userDrafts[user.id]?.fullName || ""}
                          onChange={(event) =>
                            setUserDrafts((current) => ({
                              ...current,
                              [user.id]: {
                                ...(current[user.id] || {}),
                                fullName: event.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark rounded-pill"
                            onClick={() => handleSaveUser(user.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-pill"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {activeTab === "reports" ? (
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="content-panel p-4 h-100">
                <p className="eyebrow mb-2">Revenue by Status</p>
                <h2 className="h3 mb-3">Where orders are sitting right now</h2>
                <div className="stack-gap">
                  {(report?.revenueByStatus || []).map((item) => (
                    <div className="mini-metric" key={item.status}>
                      <div>
                        <strong>{item.status}</strong>
                        <p className="text-secondary mb-0">{item.orderCount} orders</p>
                      </div>
                      <strong>{formatCurrency(item.revenue)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-panel p-4 h-100">
                <p className="eyebrow mb-2">Low Stock Watchlist</p>
                <h2 className="h3 mb-3">Products that need attention</h2>
                <div className="stack-gap">
                  {(report?.lowStockProducts || []).map((item) => (
                    <div className="mini-metric" key={item.productId}>
                      <div>
                        <strong>{item.name}</strong>
                        <p className="text-secondary mb-0">{item.category}</p>
                      </div>
                      <strong>{item.stockQuantity} left</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="content-panel p-4">
                <p className="eyebrow mb-2">Recent Fulfillment Snapshot</p>
                <h2 className="h3 mb-3">Latest operational movement</h2>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Units</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(report?.recentOrders || []).map((order) => (
                        <tr key={order.orderId}>
                          <td>{order.orderId}</td>
                          <td>{order.username}</td>
                          <td>{order.status}</td>
                          <td>{order.itemCount}</td>
                          <td>{formatCurrency(order.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
