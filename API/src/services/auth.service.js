const crypto = require('crypto');

const tokenSecret = process.env.AUTH_TOKEN_SECRET || 'angular-demo-dev-secret-change-me';
const tokenTtlSeconds = Number(process.env.AUTH_TOKEN_TTL_SECONDS || 3600);

const authUser = {
    userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
    first: 'Justine',
    last: 'Alires',
    email: 'justinedeveloper@outlook.com',
    passwordHash: 'd9baab3830f4bc260d4f6990c860ffc90c2d97b086aad2df4a2d11ed5d9958e4c418cc3b9eb5ec7a7da97803aaf5a67cbbc4a2c46873f7779b03ffd84fbb1eb1',
    passwordSalt: 'angular-demo-auth-salt-v1',
    passwordIterations: 120000,
    classes: []
};

function hashPassword(password, salt, iterations) {
    return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
}

function encodeBase64Url(input) {
    return Buffer.from(input).toString('base64url');
}

function decodeBase64Url(input) {
    return Buffer.from(input, 'base64url').toString('utf8');
}

function signPayload(payloadSegment) {
    return crypto.createHmac('sha256', tokenSecret).update(payloadSegment).digest('base64url');
}

function buildToken(email) {
    const payload = {
        sub: authUser.userId,
        email,
        exp: Math.floor(Date.now() / 1000) + tokenTtlSeconds
    };

    const payloadSegment = encodeBase64Url(JSON.stringify(payload));
    const signatureSegment = signPayload(payloadSegment);
    return `${payloadSegment}.${signatureSegment}`;
}

function verifyAuthToken(token) {
    if (!token || typeof token !== 'string') {
        return null;
    }

    const [payloadSegment, signatureSegment] = token.split('.');
    if (!payloadSegment || !signatureSegment) {
        return null;
    }

    const expectedSignature = signPayload(payloadSegment);

    if (signatureSegment.length !== expectedSignature.length) {
        return null;
    }

    const signaturesMatch = crypto.timingSafeEqual(
        Buffer.from(signatureSegment),
        Buffer.from(expectedSignature)
    );

    if (!signaturesMatch) {
        return null;
    }

    let payload;
    try {
        payload = JSON.parse(decodeBase64Url(payloadSegment));
    } catch {
        return null;
    }

    if (!payload?.email || !payload?.exp) {
        return null;
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (nowSeconds >= Number(payload.exp)) {
        return null;
    }

    return payload;
}

async function authenticate(email, password) {
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const providedPassword = typeof password === 'string' ? password : '';

    if (normalizedEmail !== authUser.email) {
        return null;
    }

    const computedHash = hashPassword(providedPassword, authUser.passwordSalt, authUser.passwordIterations);
    const isValidPassword = crypto.timingSafeEqual(
        Buffer.from(computedHash, 'hex'),
        Buffer.from(authUser.passwordHash, 'hex')
    );

    if (!isValidPassword) {
        return null;
    }

    return {
        token: buildToken(authUser.email),
        user: {
            userId: authUser.userId,
            first: authUser.first,
            last: authUser.last,
            email: authUser.email,
            classes: [...authUser.classes]
        }
    };
}

module.exports = {
    authenticate,
    verifyAuthToken
};