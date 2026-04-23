const useWindowsAuth = process.env.SQL_TRUSTED_CONNECTION === 'true';
const sql = useWindowsAuth ? require('mssql/msnodesqlv8') : require('mssql');
const odbcDriver = process.env.SQL_ODBC_DRIVER || 'ODBC Driver 17 for SQL Server';

const sqlConfig = useWindowsAuth
    ? {
        connectionString: `Driver={${odbcDriver}};Server=${process.env.SQL_SERVER};Database=${process.env.SQL_DATABASE};Trusted_Connection=Yes;`,
        options: {
            trustedConnection: true,
            encrypt: process.env.SQL_ENCRYPT === 'true',
            trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE !== 'false'
        },
        connectionTimeout: 15000,
        requestTimeout: 15000,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
    : {
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
