# Postman Samples for Jaya's Organics

## 1. Admin Login

POST http://localhost:8080/api/auth/login

Headers:
- Content-Type: application/json

Body:
```json
{
  "username": "admin",
  "password": "password"
}
```

Response:
```json
{
  "token": "<JWT_TOKEN>",
  "type": "Bearer",
  "username": "admin",
  "role": "ADMIN"
}
```

## 2. Dashboard Metrics

GET http://localhost:8080/api/admin/dashboard

Headers:
- Authorization: Bearer <JWT_TOKEN>

Response:
```json
{
  "totalProducts": 5,
  "totalOrders": 3,
  "totalUsers": 2,
  "lowStockProducts": 2,
  "featuredProducts": 3,
  "totalInventoryUnits": 71,
  "pendingOrders": 1,
  "processingOrders": 1,
  "shippedOrders": 0,
  "deliveredOrders": 1,
  "totalRevenue": 1930.00,
  "averageOrderValue": 643.33
}
```

## 3. Reports Overview

GET http://localhost:8080/api/admin/reports/overview

Headers:
- Authorization: Bearer <JWT_TOKEN>

Response:
```json
{
  "generatedAt": "2026-04-04T18:16:30.000Z",
  "topCategory": "Superfood",
  "totalCatalogValue": 24630.00,
  "totalUnitsSold": 5,
  "fulfillmentCompletionRate": 33.33,
  "revenueByStatus": [
    {
      "status": "PENDING",
      "orderCount": 1,
      "revenue": 980.00
    }
  ],
  "topProducts": [
    {
      "productId": 5,
      "name": "Organic Sesame Laddu Mix",
      "category": "Healthy Snacks",
      "featured": true,
      "stockQuantity": 6,
      "orderedUnits": 2,
      "revenue": 660.00
    }
  ]
}
```

## 4. Browse Products with Filters

GET http://localhost:8080/api/admin/products?page=0&size=10&featuredOnly=true

Headers:
- Authorization: Bearer <JWT_TOKEN>

## 5. Create Product

POST http://localhost:8080/api/admin/products

Headers:
- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

Body:
```json
{
  "name": "Organic Curry Leaf Powder",
  "category": "Superfood",
  "price": 240.00,
  "stockQuantity": 16,
  "featured": true,
  "description": "Freshly roasted curry leaf powder for daily rice and podi meals.",
  "imageUrl": "https://example.com/curry-leaf-powder.png"
}
```

## 6. Update Product

PUT http://localhost:8080/api/admin/products/1

Headers:
- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

Body:
```json
{
  "name": "Moringa Wellness Powder",
  "category": "Superfood",
  "price": 430.00,
  "stockQuantity": 20,
  "featured": true,
  "description": "Updated moringa blend for smoothies, porridges, and immunity routines.",
  "imageUrl": "https://example.com/moringa-wellness.png"
}
```

## 7. Filter Orders by Status

GET http://localhost:8080/api/admin/orders?page=0&size=10&status=PROCESSING

Headers:
- Authorization: Bearer <JWT_TOKEN>

## 8. Update Order Status

PUT http://localhost:8080/api/admin/orders/1/status

Headers:
- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

Body:
```json
{
  "status": "SHIPPED"
}
```

## 9. Get Users

GET http://localhost:8080/api/admin/users?page=0&size=10&search=jaya

Headers:
- Authorization: Bearer <JWT_TOKEN>

## 10. Update User

PUT http://localhost:8080/api/admin/users/1

Headers:
- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

Body:
```json
{
  "email": "jaya@example.com",
  "fullName": "Jaya Kumar"
}
```

## 11. Delete User

DELETE http://localhost:8080/api/admin/users/1

Headers:
- Authorization: Bearer <JWT_TOKEN>
