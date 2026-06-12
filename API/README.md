# AngularDemo API

Express API that returns catalog data from SQL Server.

## 1. Setup

```bash
# from repository root
cd API
npm install
```

## 2. Configure environment

Use `.env.local` for local development.

1. Copy the keys from `.env.example` into `.env.local`
2. Set your real SQL values in `.env.local`
3. Keep `.env.example` as placeholders only for sharing with the team

Required SQL table format (default table name: `CatalogItems`):

- `Id` (int)
- `Title` (nvarchar)
- `Description` (nvarchar)
- `Category` (nvarchar)
- `Price` (decimal)
- `ImageName` (nvarchar)

## 3. Run

```bash
npm run dev
```

## Endpoints

- `GET /health`
- `GET /api/catalog`


## Interceptors
