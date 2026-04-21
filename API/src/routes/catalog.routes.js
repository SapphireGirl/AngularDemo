const express = require('express');
const { getCatalogItems } = require('../services/catalog.service');

const router = express.Router();

router.get('/catalog', async (req, res) => {
    try {
        const items = await getCatalogItems();
        res.status(200).json(items);
    } catch (error) {
        console.error('Failed to fetch catalog items:', error);
        res.status(500).json({
            message: 'Failed to fetch catalog items from SQL database.'
        });
    }
});

module.exports = router;
