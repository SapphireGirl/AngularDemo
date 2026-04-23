# AngularDemo API

Express API that returns catalog data from SQL Server.

## 1. Setup

```bash
# from repository root
cd API
npm install
```

## 2. Configure environment

Create a `.env` file from `.env.example` and set your SQL values.

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
