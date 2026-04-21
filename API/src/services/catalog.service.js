const { getPool, sql } = require('../config/db');

async function getCatalogItems() {
    const pool = await getPool();
    const tableName = process.env.SQL_CATALOG_TABLE || 'CatalogItems';

    const query = `
    SELECT
      Id AS id,
      Title AS title,
      Description AS description,
      Category AS category,
      Price AS price,
      ImageUrl AS imageUrl
    FROM [${tableName}]
    ORDER BY Id;
  `;

    const result = await pool.request().query(query);

    return result.recordset.map((row) => ({
        id: Number(row.id),
        title: row.title,
        description: row.description,
        category: row.category,
        price: Number(row.price),
        imageUrl: row.imageUrl
    }));
}

module.exports = {
    getCatalogItems
};
