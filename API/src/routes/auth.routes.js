const express = require('express');
const { authenticate } = require('../services/auth.service');

const router = express.Router();

router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        const authResult = await authenticate(email, password);
        if (!authResult) {
            res.status(401).json({ message: 'Invalid login.' });
            return;
        }

        res.status(200).json(authResult);
    } catch (error) {
        console.error('Failed to authenticate user:', error);
        res.status(500).json({ message: 'Failed to authenticate user.' });
    }
});

module.exports = router;