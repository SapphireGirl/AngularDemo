const express = require('express');
const { getCatalogCategories, getCatalogItemsByCategory } = require('../services/catalog.service');

const router = express.Router();

router.get('/catalog/categories', async (req, res) => {
    try {
        const categories = await getCatalogCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Failed to fetch catalog categories:', error);
        res.status(500).json({
            message: 'Failed to fetch catalog categories from SQL database.'
        });
    }
});

router.get('/catalog/categories/:categoryId/items', async (req, res) => {
    try {
        const categoryId = Number(req.params.categoryId);

        if (Number.isNaN(categoryId)) {
            res.status(400).json({ message: 'categoryId must be numeric.' });
            return;
        }

        const items = await getCatalogItemsByCategory(categoryId);
        res.status(200).json(items);
    } catch (error) {
        console.error('Failed to fetch catalog items by category:', error);
        const isProduction = process.env.NODE_ENV === 'production';
        res.status(500).json({
            message: 'Failed to fetch catalog items from SQL database.',
            detail: isProduction ? undefined : error.message
        });
    }
});

module.exports = router;
