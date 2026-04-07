const API_URL = 'http://localhost:8080/api';

function getToken() {
    return localStorage.getItem('adminToken');
}

function setToken(token) {
    localStorage.setItem('adminToken', token);
}

function clearToken() {
    localStorage.removeItem('adminToken');
}

function getAuthHeaders() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function handleUnauthorized(response) {
    if (response.status === 401 || response.status === 403) {
        clearToken();
        window.location.href = 'login.html';
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
        'Content-Type': 'application/json',
        ...headers,
        ...getAuthHeaders(),
    };
    return fetch(url, options).then(handleUnauthorized);
}

function initPage() {
    const pageType = document.body.dataset.page;
    if (!pageType) return;
    if (pageType !== 'login' && !getToken()) {
        window.location.href = 'login.html';
        return;
    }
    switch (pageType) {
        case 'login': initLogin(); break;
        case 'dashboard': initDashboard(); break;
        case 'products': initProducts(); break;
        case 'orders': initOrders(); break;
        case 'users': initUsers(); break;
    }
}

function initLogin() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            window.location.href = 'dashboard.html';
        } else {
            const error = await safeParseJson(response);
            document.getElementById('login-error').textContent = error?.error || 'Login failed';
        }
    });
}

function initDashboard() {
    activateNav();
    document.getElementById('logout').addEventListener('click', logout);
    fetchWithAuth(`${API_URL}/admin/dashboard`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('product-count').textContent = data.totalProducts;
            document.getElementById('order-count').textContent = data.totalOrders;
            document.getElementById('user-count').textContent = data.totalUsers;
        });
}

function initProducts() {
    activateNav();
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('search-button').addEventListener('click', () => loadProducts(0));
    document.getElementById('product-form').addEventListener('submit', submitProductForm);
    loadProducts(0);
}

async function submitProductForm(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const payload = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value,
        imageUrl: document.getElementById('product-image').value,
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/admin/products/${id}` : `${API_URL}/admin/products`;
    const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        document.getElementById('product-form').reset();
        document.getElementById('product-id').value = '';
        loadProducts(0);
    } else {
        const error = await safeParseJson(response);
        alert(error?.error || 'Could not save product');
    }
}

async function loadProducts(page = 0) {
    const search = document.getElementById('search-query').value.trim();
    const size = 10;
    const response = await fetchWithAuth(`${API_URL}/admin/products?page=${page}&size=${size}${search ? `&search=${encodeURIComponent(search)}` : ''}`);
    const data = await response.json();
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';
    data.content.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.description || '-'}</td>
            <td><img src="${product.imageUrl || 'https://via.placeholder.com/100'}" alt="${product.name}" width="80"></td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editProduct(${product.id}, '${escapeHtml(product.name)}', ${product.price}, '${escapeHtml(product.description)}', '${escapeHtml(product.imageUrl)}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    renderPagination(data.pageable.pageNumber, data.totalPages, loadProducts);
}

function escapeHtml(value) {
    return value ? value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;') : '';
}

function editProduct(id, name, price, description, imageUrl) {
    document.getElementById('product-id').value = id;
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-description').value = description;
    document.getElementById('product-image').value = imageUrl;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    const response = await fetchWithAuth(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        loadProducts(0);
    } else {
        const error = await safeParseJson(response);
        alert(error?.error || 'Delete failed');
    }
}

function renderPagination(page, totalPages, callback) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-sm ${i === page ? 'btn-secondary' : 'btn-outline-secondary'} me-1 mb-1`;
        button.textContent = i + 1;
        button.onclick = () => callback(i);
        container.appendChild(button);
    }
}

function initOrders() {
    activateNav();
    document.getElementById('logout').addEventListener('click', logout);
    loadOrders(0);
}

async function loadOrders(page = 0) {
    const size = 10;
    const response = await fetchWithAuth(`${API_URL}/admin/orders?page=${page}&size=${size}`);
    const data = await response.json();
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    data.content.forEach(order => {
        const row = document.createElement('tr');
        const items = order.items.map(item => `${item.productName} x${item.quantity}`).join('<br>');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.username}</td>
            <td>${order.status}</td>
            <td>${order.totalPrice.toFixed(2)}</td>
            <td>${new Date(order.createdAt).toLocaleString()}</td>
            <td>${items}</td>
            <td>
                <select id="status-${order.id}" class="form-select form-select-sm mb-2">
                    <option ${order.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
                    <option ${order.status === 'SHIPPED' ? 'selected' : ''}>SHIPPED</option>
                    <option ${order.status === 'DELIVERED' ? 'selected' : ''}>DELIVERED</option>
                </select>
                <button class="btn btn-sm btn-success" onclick="updateOrderStatus(${order.id})">Update</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    renderPagination(data.pageable.pageNumber, data.totalPages, loadOrders);
}

async function updateOrderStatus(orderId) {
    const select = document.getElementById(`status-${orderId}`);
    const response = await fetchWithAuth(`${API_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: select.value })
    });
    if (response.ok) {
        alert('Order status updated');
        loadOrders(0);
    } else {
        const error = await safeParseJson(response);
        alert(error?.error || 'Status update failed');
    }
}

function initUsers() {
    function editUser(id, fullName, email) {
    document.getElementById('edit-user-form-card').style.display = 'block';
    document.getElementById('edit-user-id').value = id;
    document.getElementById('edit-user-fullname').value = fullName;
    document.getElementById('edit-user-email').value = email;
}

async function saveUser() {
    const id = document.getElementById('edit-user-id').value;
    const payload = {
        fullName: document.getElementById('edit-user-fullname').value,
        email: document.getElementById('edit-user-email').value,
    };
    const response = await fetchWithAuth(`${API_URL}/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        cancelEdit();
        loadUsers();
    } else {
        alert('Update failed');
    }
}

function cancelEdit() {
    document.getElementById('edit-user-form-card').style.display = 'none';
}
    activateNav();
    document.getElementById('logout').addEventListener('click', logout);
    loadUsers();

}

async function loadUsers() {
    const response = await fetchWithAuth(`${API_URL}/admin/users`);
    const users = await response.json();
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.fullName || '-'}</td>
            <td>
            <button class="btn btn-sm btn-primary me-1" onclick="editUser(${user.id}, '${user.fullName || ''}', '${user.email}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function deleteUser(userId) {
    if (!confirm('Delete this user?')) return;
    const response = await fetchWithAuth(`${API_URL}/admin/users/${userId}`, { method: 'DELETE' });
    if (response.ok) {
        loadUsers();
    } else {
        const error = await safeParseJson(response);
        alert(error?.error || 'Delete failed');
    }
}

function activateNav() {
    const navLink = document.querySelector('.nav-link.active');
    if (!navLink) return;
    navLink.classList.add('active');
}

function logout() {
    clearToken();
    window.location.href = 'login.html';
}

window.addEventListener('DOMContentLoaded', initPage);
