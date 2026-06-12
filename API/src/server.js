require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');

const catalogRoutes = require('./routes/catalog.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api', catalogRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
