const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sweety@28',
    database: 'crimerecordsdb'
});

module.exports = db.promise();