# Bank Lite API

A minimal **banking-style API** built with **TypeScript** and **Fastify** to demonstrate best practices for API design and delivery.
This project was created as a compact showcase for graduate software engineering and product owner roles, with a focus on
**API contracts, versioning, authentication, and automated quality gates**.

---

## ✨ Features

- **Versioned API** under `/v1/*`, allowing backwards-compatible upgrades.
- **Accounts endpoints** with **pagination** (`page`, `page_size`) and a consistent **error model`.
- **Payments endpoint** protected with **JWT authentication** and simple scope-based authorisation.
- **Uniform error responses**: `{ "error": { "code": string, "message": string } }`.
- **Health checks**: `/v1/healthz` and `/v1/readyz` for orchestration readiness probes.
- **OpenAPI 3.1 specification** (`openapi.yaml`) documents endpoints, schemas, errors, and auth requirements.
- **Contract testing** using **Dredd**, validating that implementation matches the OpenAPI contract.
- **Unit tests** with Vitest for core logic (e.g., JWT helpers).
- **CI/CD pipeline** (GitHub Actions) running build, tests, and contract tests as automated quality gates.
- **Observability**: structured logging (pino) with request IDs.

---

## 📂 Project Structure

```
bank-lite-api/
├── src/
│   ├── index.ts          # Fastify app entry point
│   ├── routes/v1.ts      # Versioned API routes (accounts, payments, health)
│   ├── lib/              # Shared logic (JWT, in-memory data, logging)
│   └── types/            # Type definitions for models and errors
├── openapi.yaml          # API contract (OpenAPI 3.1 spec)
├── dredd.yml             # Contract testing config
├── tsconfig.json         # TypeScript config
└── .github/workflows/ci.yml  # GitHub Actions CI pipeline
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run the API (dev mode)
```bash
npm run dev
```
API available at `http://localhost:3000/v1/healthz`

### 3. Run unit tests
```bash
npm test
```

### 4. Run contract tests
```bash
npm run contract:test
```

---

## 🔑 Authentication

- **JWT** tokens are required for `POST /v1/payments`.
- Tokens must include the `create:payments` scope.
- A helper function `signDemoJwt()` generates demo tokens for local testing.

---

## 📖 Example Endpoints

- `GET /v1/accounts` → paginated list of accounts  
- `GET /v1/accounts/{id}` → single account by ID  
- `POST /v1/payments` → create a payment (requires JWT)  
- `GET /v1/healthz` → health check  
- `GET /v1/readyz` → readiness probe with deprecation header  

---

## 🎯 Why this project?

This project was designed to demonstrate:
- Practical knowledge of **Node.js/TypeScript API development**
- Understanding of **API contracts (OpenAPI), versioning, pagination, error models**
- Fundamentals of **authentication/authorisation (JWT, scopes)**
- Using **contract tests and CI/CD pipelines** as automated quality gates
- Awareness of **observability, health checks, and production readiness**

---

## 📜 License

MIT
