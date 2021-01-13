//Create Connection
const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.DB_IP_ADDR,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
module.exports = {
    con 
}