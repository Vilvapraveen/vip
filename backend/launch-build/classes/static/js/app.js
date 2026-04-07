const API_URL = window.location.protocol.startsWith("http")
    ? `${window.location.origin}/api`
    : "http://localhost:8080/api";
const ORDER_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

let cachedUsers = [];
let cachedProductsPage = [];
let cachedOrdersPage = [];
let cachedInsights = null;

function getToken() {
    return localStorage.getItem("adminToken");
}

function setSession({ token, username, role }) {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUsername", username || "");
    localStorage.setItem("adminRole", role || "");
}

function clearToken() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminRole");
}

function getAuthHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleUnauthorized(response) {
    if (response.status === 401 || response.status === 403) {
        clearToken();
        window.location.href = "login.html";
    }
    return response;
}

async function safeParseJson(response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

function fetchWithAuth(url, options = {}) {
    const headers = options.headers || {};
    options.headers = {
        "Content-Type": "application/json",
        ...headers,
        ...getAuthHeaders(),
    };
    return fetch(url, options).then(handleUnauthorized);
}

function formatMoney(value) {
    const amount = Number(value || 0);
    return `Rs. ${amount.toFixed(2)}`;
}

function formatDateTime(value) {
    if (!value) {
        return "-";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("en-IN");
}

function escapeHtml(value) {
    return value
        ? String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
        : "";
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function renderEmptyRow(tbody, colspan, message) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="${colspan}" class="empty-state">${escapeHtml(message)}</td>`;
    tbody.appendChild(row);
}

function buildButton(label, className, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", handler);
    return button;
}

function getStatusClass(status) {
    return status ? status.toLowerCase() : "pending";
}

function getStockClass(stockQuantity) {
    return Number(stockQuantity) <= 10 ? "low" : "healthy";
}

function bindEnterKey(inputId, handler) {
    const input = document.getElementById(inputId);
    if (!input) {
        return;
    }

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handler();
        }
    });
}

function toCsvValue(value) {
    if (value === null || value === undefined) {
        return "";
    }

    const text = String(value).replace(/"/g, "\"\"");
    return /[",\n]/.test(text) ? `"${text}"` : text;
}

function downloadCsv(filename, headers, rows) {
    const csv = [headers, ...rows]
        .map((row) => row.map(toCsvValue).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function initPage() {
    const pageType = document.body.dataset.page;
    if (!pageType) {
        return;
    }

    if (pageType !== "login" && !getToken()) {
        window.location.href = "login.html";
        return;
    }

    switch (pageType) {
        case "login":
            initLogin();
            break;
        case "dashboard":
            initDashboard();
            break;
        case "products":
            initProducts();
            break;
        case "orders":
            initOrders();
            break;
        case "users":
            initUsers();
            break;
        case "reports":
            initReports();
            break;
        default:
            break;
    }
}

function initLogin() {
    const form = document.getElementById("login-form");
    if (!form) {
        return;
    }
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            setSession(data);
            window.location.href = "dashboard.html";
            return;
        }

        const error = await safeParseJson(response);
        setText("login-error", error?.error || "Login failed");
    });
}

function initDashboard() {
    document.getElementById("logout").addEventListener("click", logout);
    loadDashboard();
}

async function loadDashboard() {
    const response = await fetchWithAuth(`${API_URL}/admin/dashboard`);
    if (!response.ok) {
        alert("Could not load dashboard data");
        return;
    }

    const data = await response.json();
    setText("product-count", data.totalProducts);
    setText("order-count", data.totalOrders);
    setText("user-count", data.totalUsers);
    setText("featured-count", data.featuredProducts);
    setText("low-stock-count", data.lowStockProducts);
    setText("inventory-units", data.totalInventoryUnits);
    setText("pending-orders", data.pendingOrders);
    setText("processing-orders", data.processingOrders);
    setText("shipped-orders", data.shippedOrders);
    setText("delivered-orders", data.deliveredOrders);
    setText("total-revenue", formatMoney(data.totalRevenue));
    setText("average-order-value", formatMoney(data.averageOrderValue));
}

function initProducts() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("search-button").addEventListener("click", () => loadProducts(0));
    document.getElementById("clear-filters").addEventListener("click", clearProductFilters);
    document.getElementById("export-products-button").addEventListener("click", exportProductsCsv);
    document.getElementById("product-form").addEventListener("submit", submitProductForm);
    document.getElementById("product-form").addEventListener("reset", () => {
        setTimeout(clearProductForm, 0);
    });
    bindEnterKey("search-query", () => loadProducts(0));
    bindEnterKey("search-category", () => loadProducts(0));
    loadProducts(0);
}

function clearProductForm() {
    document.getElementById("product-id").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-category").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-stock").value = "";
    document.getElementById("product-featured").checked = false;
    document.getElementById("product-description").value = "";
    document.getElementById("product-image").value = "";
}

function clearProductFilters() {
    document.getElementById("search-query").value = "";
    document.getElementById("search-category").value = "";
    document.getElementById("featured-only").checked = false;
    document.getElementById("low-stock-only").checked = false;
    loadProducts(0);
}

async function submitProductForm(event) {
    event.preventDefault();

    const id = document.getElementById("product-id").value;
    const payload = {
        name: document.getElementById("product-name").value.trim(),
        category: document.getElementById("product-category").value.trim(),
        price: parseFloat(document.getElementById("product-price").value),
        stockQuantity: parseInt(document.getElementById("product-stock").value, 10),
        featured: document.getElementById("product-featured").checked,
        description: document.getElementById("product-description").value.trim(),
        imageUrl: document.getElementById("product-image").value.trim(),
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/admin/products/${id}` : `${API_URL}/admin/products`;
    const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        clearProductForm();
        loadProducts(0);
        return;
    }

    const error = await safeParseJson(response);
    alert(error?.error || "Could not save product");
}

async function loadProducts(page = 0) {
    const search = document.getElementById("search-query").value.trim();
    const category = document.getElementById("search-category").value.trim();
    const featuredOnly = document.getElementById("featured-only").checked;
    const lowStockOnly = document.getElementById("low-stock-only").checked;
    const params = new URLSearchParams({
        page: String(page),
        size: "10",
        search,
        category,
        featuredOnly: String(featuredOnly),
        lowStockOnly: String(lowStockOnly)
    });

    const response = await fetchWithAuth(`${API_URL}/admin/products?${params.toString()}`);
    if (!response.ok) {
        alert("Could not load products");
        return;
    }

    const data = await response.json();
    cachedProductsPage = data.content || [];
    const tbody = document.getElementById("product-table-body");
    tbody.innerHTML = "";

    if (!cachedProductsPage.length) {
        renderEmptyRow(tbody, 9, "No catalog items match the current filters.");
    }

    cachedProductsPage.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td><strong>${escapeHtml(product.name)}</strong></td>
            <td>${product.category ? escapeHtml(product.category) : "-"}</td>
            <td>${formatMoney(product.price)}</td>
            <td><span class="stock-pill ${getStockClass(product.stockQuantity)}">${product.stockQuantity} units</span></td>
            <td>${product.featured ? '<span class="organic-badge">Featured</span>' : '-'}</td>
            <td>${product.description ? escapeHtml(product.description) : '-'}</td>
            <td><img src="${product.imageUrl || 'https://via.placeholder.com/100?text=Organic'}" alt="${escapeHtml(product.name)}" width="82" height="82"></td>
        `;

        const actionsCell = document.createElement("td");
        actionsCell.className = "d-flex gap-2 flex-wrap";
        actionsCell.appendChild(buildButton("Edit", "btn btn-sm btn-primary", () => editProduct(product)));
        actionsCell.appendChild(buildButton("Delete", "btn btn-sm btn-danger", () => deleteProduct(product.id)));
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    renderCatalogSummary(cachedProductsPage);
    renderPagination(data.number, data.totalPages, loadProducts);
}

function renderCatalogSummary(products) {
    const featured = products.filter((product) => product.featured).length;
    const lowStock = products.filter((product) => Number(product.stockQuantity) <= 10).length;
    const stockTotal = products.reduce((sum, product) => sum + Number(product.stockQuantity || 0), 0);

    setText("catalog-total-label", products.length);
    setText("catalog-featured-label", featured);
    setText("catalog-low-stock-label", lowStock);
    setText("catalog-stock-total", stockTotal);
}

function exportProductsCsv() {
    if (!cachedProductsPage.length) {
        alert("There are no visible products to export.");
        return;
    }

    downloadCsv(
        "jayas-organics-products.csv",
        ["ID", "Name", "Category", "Price", "Stock Quantity", "Featured", "Description", "Image URL"],
        cachedProductsPage.map((product) => [
            product.id,
            product.name,
            product.category || "",
            Number(product.price || 0).toFixed(2),
            product.stockQuantity || 0,
            product.featured ? "Yes" : "No",
            product.description || "",
            product.imageUrl || ""
        ])
    );
}

function editProduct(product) {
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-name").value = product.name || "";
    document.getElementById("product-category").value = product.category || "";
    document.getElementById("product-price").value = product.price ?? "";
    document.getElementById("product-stock").value = product.stockQuantity ?? 0;
    document.getElementById("product-featured").checked = Boolean(product.featured);
    document.getElementById("product-description").value = product.description || "";
    document.getElementById("product-image").value = product.imageUrl || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteProduct(id) {
    if (!confirm("Delete this product?")) {
        return;
    }

    const response = await fetchWithAuth(`${API_URL}/admin/products/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        loadProducts(0);
        return;
    }

    const error = await safeParseJson(response);
    alert(error?.error || "Delete failed");
}

function renderPagination(page, totalPages, callback) {
    const container = document.getElementById("pagination");
    if (!container) {
        return;
    }

    container.innerHTML = "";
    if (totalPages <= 1) {
        return;
    }

    for (let i = 0; i < totalPages; i += 1) {
        const button = document.createElement("button");
        button.className = `btn btn-sm ${i === page ? "btn-secondary" : "btn-outline-secondary"} me-1 mb-1`;
        button.textContent = String(i + 1);
        button.addEventListener("click", () => callback(i));
        container.appendChild(button);
    }
}

function initOrders() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("apply-order-filter").addEventListener("click", () => loadOrders(0));
    document.getElementById("export-orders-button").addEventListener("click", exportOrdersCsv);
    loadOrders(0);
}

async function loadOrders(page = 0) {
    const status = document.getElementById("order-status-filter").value;
    const params = new URLSearchParams({
        page: String(page),
        size: "10",
        status
    });

    const response = await fetchWithAuth(`${API_URL}/admin/orders?${params.toString()}`);
    if (!response.ok) {
        alert("Could not load orders");
        return;
    }

    const data = await response.json();
    cachedOrdersPage = data.content || [];
    const tbody = document.getElementById("orders-table-body");
    tbody.innerHTML = "";

    if (!cachedOrdersPage.length) {
        renderEmptyRow(tbody, 7, "No orders match the selected fulfillment filter.");
    }

    cachedOrdersPage.forEach((order) => {
        const row = document.createElement("tr");
        const items = (order.items || []).map((item) => `${escapeHtml(item.productName)} x${item.quantity}`).join("<br>");
        row.innerHTML = `
            <td>${order.id}</td>
            <td><strong>${escapeHtml(order.username)}</strong></td>
            <td><span class="status-pill ${getStatusClass(order.status)}">${escapeHtml(order.status)}</span></td>
            <td>${formatMoney(order.totalPrice)}</td>
            <td>${formatDateTime(order.createdAt)}</td>
            <td>${items || "-"}</td>
        `;

        const actionsCell = document.createElement("td");
        const select = document.createElement("select");
        select.className = "form-select form-select-sm mb-2";
        select.id = `status-${order.id}`;

        ORDER_STATUSES.forEach((statusOption) => {
            const option = document.createElement("option");
            option.value = statusOption;
            option.textContent = statusOption;
            option.selected = order.status === statusOption;
            select.appendChild(option);
        });

        actionsCell.appendChild(select);
        actionsCell.appendChild(buildButton("Update", "btn btn-sm btn-success", () => updateOrderStatus(order.id)));
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    renderOrderSummary(data);
    renderPagination(data.number, data.totalPages, loadOrders);
}

function renderOrderSummary(data) {
    const revenue = (data.content || []).reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    setText("orders-visible-count", data.numberOfElements);
    setText("orders-visible-revenue", formatMoney(revenue));
    setText("orders-current-filter", document.getElementById("order-status-filter").value);
    setText("orders-page-window", `Page ${data.number + 1}`);
}

function exportOrdersCsv() {
    if (!cachedOrdersPage.length) {
        alert("There are no visible orders to export.");
        return;
    }

    downloadCsv(
        "jayas-organics-orders.csv",
        ["Order ID", "Username", "Status", "Total Price", "Created At", "Items"],
        cachedOrdersPage.map((order) => [
            order.id,
            order.username,
            order.status,
            Number(order.totalPrice || 0).toFixed(2),
            formatDateTime(order.createdAt),
            (order.items || [])
                .map((item) => `${item.productName} x${item.quantity}`)
                .join(" | ")
        ])
    );
}

async function updateOrderStatus(orderId) {
    const select = document.getElementById(`status-${orderId}`);
    const response = await fetchWithAuth(`${API_URL}/admin/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: select.value })
    });

    if (response.ok) {
        loadOrders(0);
        return;
    }

    const error = await safeParseJson(response);
    alert(error?.error || "Status update failed");
}

function initUsers() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("user-search-button").addEventListener("click", applyUserSearch);
    document.getElementById("save-user-button").addEventListener("click", saveUser);
    document.getElementById("cancel-user-edit").addEventListener("click", cancelEdit);
    document.getElementById("export-users-button").addEventListener("click", exportUsersCsv);
    bindEnterKey("user-search-query", applyUserSearch);
    loadUsers();
}

function editUser(user) {
    document.getElementById("edit-user-form-card").style.display = "block";
    document.getElementById("edit-user-id").value = user.id;
    document.getElementById("edit-user-fullname").value = user.fullName || "";
    document.getElementById("edit-user-email").value = user.email || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function saveUser() {
    const id = document.getElementById("edit-user-id").value;
    const payload = {
        fullName: document.getElementById("edit-user-fullname").value.trim(),
        email: document.getElementById("edit-user-email").value.trim(),
    };

    const response = await fetchWithAuth(`${API_URL}/admin/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        cancelEdit();
        loadUsers();
        return;
    }

    const error = await safeParseJson(response);
    alert(error?.error || "Update failed");
}

function cancelEdit() {
    document.getElementById("edit-user-form-card").style.display = "none";
    document.getElementById("edit-user-id").value = "";
    document.getElementById("edit-user-fullname").value = "";
    document.getElementById("edit-user-email").value = "";
}

async function loadUsers() {
    const response = await fetchWithAuth(`${API_URL}/admin/users`);
    if (!response.ok) {
        alert("Could not load users");
        return;
    }

    cachedUsers = await response.json();
    applyUserSearch();
}

function getFilteredUsers() {
    const query = document.getElementById("user-search-query").value.trim().toLowerCase();
    return cachedUsers.filter((user) => {
        if (!query) {
            return true;
        }

        return [user.username, user.email, user.fullName]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(query));
    });
}

function applyUserSearch() {
    const query = document.getElementById("user-search-query").value.trim().toLowerCase();
    const filteredUsers = getFilteredUsers();
    renderUsers(filteredUsers);
    setText("user-search-label", query ? query.toUpperCase() : "ALL");
}

function renderUsers(users) {
    const tbody = document.getElementById("users-table-body");
    tbody.innerHTML = "";

    if (!users.length) {
        renderEmptyRow(tbody, 5, "No customers match the current search.");
    }

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td><strong>${escapeHtml(user.username)}</strong></td>
            <td>${escapeHtml(user.email)}</td>
            <td>${user.fullName ? escapeHtml(user.fullName) : "-"}</td>
        `;

        const actionsCell = document.createElement("td");
        actionsCell.className = "d-flex gap-2 flex-wrap";
        actionsCell.appendChild(buildButton("Edit", "btn btn-sm btn-primary", () => editUser(user)));
        actionsCell.appendChild(buildButton("Delete", "btn btn-sm btn-danger", () => deleteUser(user.id)));
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    setText("user-count-label", users.length);
}

function exportUsersCsv() {
    const filteredUsers = getFilteredUsers();
    if (!filteredUsers.length) {
        alert("There are no visible customers to export.");
        return;
    }

    downloadCsv(
        "jayas-organics-customers.csv",
        ["User ID", "Username", "Email", "Full Name"],
        filteredUsers.map((user) => [
            user.id,
            user.username,
            user.email,
            user.fullName || ""
        ])
    );
}

async function deleteUser(userId) {
    if (!confirm("Delete this user?")) {
        return;
    }

    const response = await fetchWithAuth(`${API_URL}/admin/users/${userId}`, { method: "DELETE" });
    if (response.ok) {
        loadUsers();
        return;
    }

    const error = await safeParseJson(response);
    alert(error?.error || "Delete failed");
}

function initReports() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("export-insights-summary").addEventListener("click", exportInsightsOverviewCsv);
    document.getElementById("export-top-products").addEventListener("click", exportTopProductsCsv);
    document.getElementById("export-low-stock").addEventListener("click", exportLowStockCsv);
    loadInsights();
}

async function loadInsights() {
    const response = await fetchWithAuth(`${API_URL}/admin/reports/overview`);
    if (!response.ok) {
        alert("Could not load reports");
        return;
    }

    cachedInsights = await response.json();
    renderInsightsSummary(cachedInsights);
    renderStatusRevenue(cachedInsights.revenueByStatus || []);
    renderCategoryInsights(cachedInsights.categoryInsights || []);
    renderTopProducts(cachedInsights.topProducts || []);
    renderLowStockWatchlist(cachedInsights.lowStockProducts || []);
    renderRecentOrders(cachedInsights.recentOrders || []);
}

function renderInsightsSummary(data) {
    setText("insights-top-category", data.topCategory || "N/A");
    setText("insights-catalog-value", formatMoney(data.totalCatalogValue));
    setText("insights-units-sold", data.totalUnitsSold || 0);
    setText("insights-fulfillment-rate", `${Number(data.fulfillmentCompletionRate || 0).toFixed(2)}%`);
    setText("insights-generated-at", formatDateTime(data.generatedAt));
}

function renderStatusRevenue(items) {
    const container = document.getElementById("status-revenue-grid");
    container.innerHTML = "";

    if (!items.length) {
        container.innerHTML = '<div class="summary-chip"><strong>0</strong><span>No revenue insights available yet.</span></div>';
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "summary-chip";
        card.innerHTML = `
            <strong>${formatMoney(item.revenue)}</strong>
            <span><span class="status-pill ${getStatusClass(item.status)}">${escapeHtml(item.status)}</span> | ${item.orderCount} orders</span>
        `;
        container.appendChild(card);
    });
}

function renderCategoryInsights(items) {
    const tbody = document.getElementById("category-insights-body");
    tbody.innerHTML = "";

    if (!items.length) {
        renderEmptyRow(tbody, 5, "No category insights available.");
        return;
    }

    items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${escapeHtml(item.category)}</strong></td>
            <td>${item.productCount}</td>
            <td>${item.featuredCount}</td>
            <td>${item.inventoryUnits}</td>
            <td>${formatMoney(item.catalogValue)}</td>
        `;
        tbody.appendChild(row);
    });
}

function renderTopProducts(items) {
    const tbody = document.getElementById("top-products-body");
    tbody.innerHTML = "";

    if (!items.length) {
        renderEmptyRow(tbody, 6, "No product performance data is available.");
        return;
    }

    items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.category || "Uncategorized")}</td>
            <td>${item.featured ? '<span class="organic-badge">Featured</span>' : "-"}</td>
            <td>${item.orderedUnits}</td>
            <td>${formatMoney(item.revenue)}</td>
            <td><span class="stock-pill ${getStockClass(item.stockQuantity)}">${item.stockQuantity} units</span></td>
        `;
        tbody.appendChild(row);
    });
}

function renderLowStockWatchlist(items) {
    const container = document.getElementById("low-stock-watchlist");
    container.innerHTML = "";

    if (!items.length) {
        container.innerHTML = '<div class="watch-card"><h4>Inventory healthy</h4><p>No products are currently below the low-stock threshold.</p></div>';
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "watch-card";
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-start gap-3">
                <div>
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${escapeHtml(item.category || "Uncategorized")}</p>
                </div>
                ${item.featured ? '<span class="organic-badge">Featured</span>' : ""}
            </div>
            <div class="metric-inline">${item.stockQuantity} units left</div>
        `;
        container.appendChild(card);
    });
}

function renderRecentOrders(items) {
    const tbody = document.getElementById("recent-orders-body");
    tbody.innerHTML = "";

    if (!items.length) {
        renderEmptyRow(tbody, 6, "No recent orders available.");
        return;
    }

    items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.orderId}</td>
            <td><strong>${escapeHtml(item.username)}</strong></td>
            <td><span class="status-pill ${getStatusClass(item.status)}">${escapeHtml(item.status)}</span></td>
            <td>${formatMoney(item.totalPrice)}</td>
            <td>${item.itemCount} items</td>
            <td>${formatDateTime(item.createdAt)}</td>
        `;
        tbody.appendChild(row);
    });
}

function exportInsightsOverviewCsv() {
    if (!cachedInsights) {
        alert("Insights are not loaded yet.");
        return;
    }

    downloadCsv(
        "jayas-organics-insights-overview.csv",
        ["Metric", "Value"],
        [
            ["Generated At", formatDateTime(cachedInsights.generatedAt)],
            ["Top Category", cachedInsights.topCategory || "N/A"],
            ["Catalog Value", Number(cachedInsights.totalCatalogValue || 0).toFixed(2)],
            ["Units Sold", cachedInsights.totalUnitsSold || 0],
            ["Fulfillment Progress", `${Number(cachedInsights.fulfillmentCompletionRate || 0).toFixed(2)}%`],
            ...((cachedInsights.revenueByStatus || []).map((item) => [
                `${item.status} Revenue`,
                `${Number(item.revenue || 0).toFixed(2)} (${item.orderCount} orders)`
            ]))
        ]
    );
}

function exportTopProductsCsv() {
    const items = cachedInsights?.topProducts || [];
    if (!items.length) {
        alert("There are no top products to export.");
        return;
    }

    downloadCsv(
        "jayas-organics-top-products.csv",
        ["Product ID", "Name", "Category", "Featured", "Ordered Units", "Revenue", "Stock Quantity"],
        items.map((item) => [
            item.productId,
            item.name,
            item.category || "",
            item.featured ? "Yes" : "No",
            item.orderedUnits,
            Number(item.revenue || 0).toFixed(2),
            item.stockQuantity
        ])
    );
}

function exportLowStockCsv() {
    const items = cachedInsights?.lowStockProducts || [];
    if (!items.length) {
        alert("There are no low-stock products to export.");
        return;
    }

    downloadCsv(
        "jayas-organics-low-stock.csv",
        ["Product ID", "Name", "Category", "Featured", "Stock Quantity"],
        items.map((item) => [
            item.productId,
            item.name,
            item.category || "",
            item.featured ? "Yes" : "No",
            item.stockQuantity
        ])
    );
}

function logout() {
    clearToken();
    window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", initPage);
