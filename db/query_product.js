const conn = require('./conn.js')
var con = conn.con

const getAllProduct = (callback) => {
    let queryString = `SELECT * FROM product ORDER BY product_id ASC`;
    con.query(queryString, (err, res) => {
        if(err) {
            console.log("An error has occurred. Abort everything!");
            callback(err);
        }
        callback(err,res);        
    });
}

const getProductById = (id,callback) => {
    let queryString = `SELECT * FROM product WHERE product_id = "${id}"`;
    con.query(queryString, (err, res) => {
        if(err) {
            console.log("An error has occurred. Abort everything!");
            callback(err);
        }
        callback(err,res);        
    });
}
module.exports = {
    getAllProduct,
    getProductById
}