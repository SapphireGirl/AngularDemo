const { verifyAuthToken } = require('../services/auth.service');

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid authorization header.' });
        return;
    }

    const token = authHeader.slice('Bearer '.length).trim();
    const tokenPayload = verifyAuthToken(token);

    if (!tokenPayload) {
        res.status(401).json({ message: 'Invalid or expired authentication token.' });
        return;
    }

    req.auth = tokenPayload;
    next();
}

module.exports = {
    requireAuth
};