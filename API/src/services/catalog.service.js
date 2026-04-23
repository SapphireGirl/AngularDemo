const { getPool } = require('../config/db');

/** @typedef {import('../../../demo-app/src/app/services/models/catalog-item.model').ICatalogItem} CatalogItem */
/** @typedef {import('../../../demo-app/src/app/services/models/catalog-category.model').ICatalogCategory} CatalogCategory */

function readRequiredField(row, fieldName, candidates, sourceName = 'stored procedure result') {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null) {
      return row[key];
    }
  }

  throw new Error(
    `${sourceName} is missing required field '${fieldName}'. Expected one of: ${candidates.join(', ')}`
  );
}

function readOptionalField(row, candidates) {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null) {
      return row[key];
    }
  }

  return null;
}

function toNumber(value, fieldName) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Field '${fieldName}' must be numeric. Received: ${value}`);
  }

  return parsed;
}

function toTrimmedString(value) {
  return String(value).trim();
}

async function executeCatalogItemsProcedure(pool, categoryId) {
  const executeByName = (procedureName) => pool.request()
    .input('CatagoryId', categoryId)
    .execute(procedureName);

  try {
    return await executeByName('dbo.GetCatalogItemsByCatagory');
  } catch (error) {
    if (!/Could not find stored procedure/i.test(String(error.message))) {
      throw error;
    }

    return executeByName('dbo.GetCatalogItemsByCatagoryId');
  }
}

/** @returns {Promise<CatalogCategory[]>} */
async function getCatalogCategories() {
  const pool = await getPool();
  const result = await pool.request().execute('dbo.GetAllCatagories');

  return result.recordset.map((row) => ({
    id: toNumber(readRequiredField(row, 'id', ['id', 'Id', 'CatagoryId', 'CategoryId']), 'id'),
    name: toTrimmedString(readRequiredField(row, 'name', ['name', 'Name']))
  }));
}

/** @returns {Promise<CatalogItem[]>} */
async function getCatalogItemsByCategory(categoryId) {
  const pool = await getPool();
  const result = await executeCatalogItemsProcedure(pool, categoryId);

  return result.recordset.map((row) => ({
    id: toNumber(readRequiredField(row, 'id', ['id', 'Id', 'CatalogItemId', 'ItemId'], 'Catalog items stored procedure result'), 'id'),
    title: toTrimmedString(readRequiredField(row, 'title', ['title', 'Title'], 'Catalog items stored procedure result')),
    description: toTrimmedString(readRequiredField(row, 'description', ['description', 'Description', 'Details'], 'Catalog items stored procedure result')),
    category: toTrimmedString(readRequiredField(row, 'category', ['category', 'Category', 'Catagory', 'CategoryName', 'CatagoryName', 'name', 'Name'], 'Catalog items stored procedure result')),
    price: toNumber(readRequiredField(row, 'price', ['price', 'Price', 'UnitPrice'], 'Catalog items stored procedure result'), 'price'),
    imageName: toTrimmedString(readOptionalField(row, ['imageName', 'ImageName']) ?? '')
  }));
}

module.exports = {
  getCatalogCategories,
  getCatalogItemsByCategory
};
