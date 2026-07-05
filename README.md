# Sample Node.js + Express + PostgreSQL API

A production-ready, enterprise-grade REST API built with Node.js, Express, TypeScript, and PostgreSQL using Prisma ORM.  
This project demonstrates a clean, layered architecture (Controller-Service-Repository) featuring JWT session rotation, connection pooling, and secure role-based access control.

---

## 🚀 Features

- **Express.js REST API** with robust global security configurations.
- **Prisma ORM** integrated with safe PostgreSQL connection pooling.
- **TypeScript Support** providing strong type-safety contracts across all modules.
- **Advanced Authentication Flow** containing short-lived Access Tokens and long-lived Refresh Tokens.
- **Granular Security Controls** featuring automatic `Role.ADMIN` path restrictions.
- **Graceful Error Catching** and fail-safe production error obfuscation.
- **Performance Optimized** via native Gzip compression layers.

---

## 📦 Tech Stack

- **Runtime:** Node.js / Bun
- **Framework:** Express.js
- **Database Engine:** PostgreSQL
- **ORM:** Prisma
- **Language:** TypeScript
- **Security:** Helmet, Bcrypt, JsonWebToken
- **Bundler/Runner:** tsx / Bun

---

## 📁 Project Structure

```bash
src/
├── controllers/   # Request interceptors and presentation response mapping
├── middlewares/   # JWT parsing engines and permission boundary walls
├── repositories/  # Isolated direct database data-access-layer query suites
├── routes/        # Router mounting endpoints and middleware injections
├── services/      # Core enterprise business logic and cryptography handlers
├── types/         # Global domain contracts, request attachments, and custom enums
├── utils/         # Reusable helpers, responders, pagination, and Prisma pool connection
├── app.ts         # Server configuration, security middleware orchestration, and root mounting
└── server.ts      # HTTP instance creator, uncaught error handlers, and application entry root
```
---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/HtetO2Ko/node.js-with-postgres.git
```

Move into the project folder:

```bash
cd node.js-with-postgres
```

Install dependencies:

```bash
bun install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdb?schema=public"
PORT=5050
NODE_ENV=development
ACCESS_TOKEN_SECRET=ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET=REFRESH_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=30d
```

---

## ▶️ Run Development Server

```bash
bun run dev
```

Server will run on:

```bash
http://localhost:5050
```
---

## 📡 Sample API

### Health Check

```http
GET /
```

Response:

```json
{
    "success": true,
    "message": "API V1.0.0 is active and running securely.",
    "data": null,
    "error": null
}
```
