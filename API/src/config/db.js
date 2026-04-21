const sql = require('mssql');

const sqlConfig = {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true',
        trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE !== 'false'
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let poolPromise;

function getPool() {
    if (!poolPromise) {
        poolPromise = new sql.ConnectionPool(sqlConfig)
            .connect()
            .then((pool) => pool)
            .catch((error) => {
                poolPromise = null;
                throw error;
            });
    }

    return poolPromise;
}

module.exports = {
    sql,
    getPool
};
