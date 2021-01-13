//env setup
require('dotenv').config();
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
const conn = require('./db/conn.js');
const app = express();


// Connect to database
const conect = conn.con
conect.connect((err) =>{
  if(err) throw err;
  console.log('Database Connected...');
});

// Set views file & set view engine
const views_path = path.join(__dirname, './public/views');
app.set('views',views_path);
app.set('view engine', 'hbs');

// Set partial path
const partial_path = path.join(__dirname, './public/partial');
hbs.registerPartials(partial_path);

// Set Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set folder public as static folder for static file
const public_path = path.join(__dirname + '/public');
app.use(express.static(public_path));

const product = require('./src/router/product.js');
app.use('/product',product);

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conect.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conect.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.body.id;
  let query = conect.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  let query = conect.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is running at port '+port);
});
