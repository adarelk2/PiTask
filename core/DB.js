const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'mysql-353956d6-adarelk2-4949.e.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_1Hl8MEZrYQ7L5PdBSeB',
  database: 'TaskPi',
  port: 15929,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = pool;
