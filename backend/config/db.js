const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        database: process.env.PGDATABASE || 'task_management',
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres'
      }
);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;