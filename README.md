# Backend (Node.js + Express + MongoDB)

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env` from `.env.example`

3. Run in dev

```bash
npm run dev
```

Server runs on `http://localhost:5005`.

## Auth

- `POST /api/admin/login`

Use email/password from `.env` (seeded automatically on server start).

## Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

## Orders

- `POST /api/orders`
- `GET /api/admin/orders` (admin)
- `GET /api/admin/orders/:id` (admin)
- `PUT /api/admin/orders/:id/status` (admin)
