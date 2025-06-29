# 🚛 Lorry Booking System – Task Tracker

This is a full-stack system for managing lorry bookings between consumers and drivers. It uses Firebase Authentication for secure login and Prisma ORM for structured database access.

---

## 🔐 Authentication

- [x] Setup **Firebase Authentication**
  - Enable email/password, Google, and phone providers
- [x] Configure **Firebase Admin SDK** in the backend
- [x] Add middleware to **verify Firebase JWT** in protected routes
- [x] Extract `UID` and `email` from verified token
- [x] Use Firebase UID as `id` in the `User` table (Prisma)


## 🧑‍💼 User Management

- [x] Define Prisma `User` model:
  - `id` (Firebase UID)
  - `name`, `email`, `phone`, `role`
- [x] Enum `Role`: `CONSUMER`, `DRIVER`, `ADMIN`
- [x] Automatically create user record on first login

---

## 📦 Query System

- [x] Create `Query` model:
  - Pickup and drop address
  - Coordinates
  - Weight
  - Status: `PENDING`, `ACCEPTED`, `REJECTED`, `COMPLETED`
- [x] Relate queries to the consumer via foreign key
- [ ] Allow drivers to view open (`PENDING`) queries
- [ ] Allow drivers to respond to a query

---

## 🚛 Lorry Management

- [x] Define `Lorry` model:
  - `plateNumber`, `type`, `capacity`, `color (optional)`
- [x] Link each lorry to a `driverId` (User relation)
- [x] Enforce one lorry per driver

---

## 📄 Booking System

- [x] Define `Booking` model:
  - Link: `query`, `consumer`, `driver`, `lorry`
  - Optional fields: `currentLat`, `currentLng`, `routePath` (JSON)
- [x] Enum `BookingStatus`: `ONGOING`, `COMPLETED`, `CANCELLED`
- [ ] Allow drivers to accept query → create booking
- [ ] Implement live driver location update (WebSocket or polling)
- [ ] Store full delivery route in `routePath`

---

## 🔁 API Flow (Planned)

- [ ] **Middleware**: Firebase token verification on all protected endpoints
- [ ] `POST /queries` – Consumer raises a query
- [ ] `GET /queries/pending` – Driver views open queries
- [ ] `POST /queries/:id/respond` – Driver responds to a query
- [ ] `POST /bookings` – Create a booking on acceptance
- [ ] `PATCH /bookings/:id/location` – Driver live location updates

---

## 🛡️ Security Rules

- [x] Use Firebase token to determine role (consumer/driver)
- [ ] Restrict access by role in routes:
  - Consumers can only raise queries
  - Drivers can only accept/respond to queries
- [ ] Admins can view all data and manage users

---

## ✅ Database Overview (Prisma Models)

- `User` – Firebase-authenticated user with role
- `Query` – Raised by consumers, responded to by drivers
- `Lorry` – Owned by drivers
- `Booking` – Links consumers, drivers, lorries, and queries

---

## 📅 Roadmap v2 (Optional Enhancements)

- [ ] OTP-based login using Firebase Phone Auth
- [ ] Push notifications on booking status changes
- [ ] Driver rating & feedback system
- [ ] Admin dashboard for monitoring queries and bookings

---

> Built with 💚 using Firebase, Prisma, and Node.js
