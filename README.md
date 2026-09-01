# MediCare+ — Pharmacy E-commerce Demo

A polished frontend-only pharmacy e-commerce prototype designed for a client presentation.

## Included demo flows

- Responsive pharmacy home page
- Product categories and product cards
- Add to cart with quantity controls
- Cart drawer with subtotal
- Checkout modal
- Cash on Delivery and Online Payment selection
- Demo order confirmation + generated order ID
- Order tracking timeline
- Prescription upload UI
- Prescription product matching demo
- LocalStorage cart/order persistence
- Mobile responsive design

## Run

No database or Python setup is required.

Option 1:
Open `index.html` directly in a browser.

Option 2 (recommended):
Use VS Code Live Server or any simple static server.

## Important

This is a client-demo prototype. Product information, prescription matching, payments, authentication, inventory, and tracking are simulated in the browser. No real prescription is processed and no real payment is taken.

## Suggested production version

Once the client approves the UI/flow, rebuild the backend in Django + Django REST Framework with PostgreSQL/SQL Server, authentication, admin/inventory, prescription review, payment gateway, order APIs, notifications, and real shipment tracking.
