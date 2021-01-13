var express = require('express');
var router = express.Router();
const con = require('../../db/query_product');

router.get('/show',(req,res)=>{
    con.getAllProduct((err,hasil)=>{        
        if (err) {
            console.log(err);
        }else {
            console.log(hasil);
            res.render('product_view',{
                results: hasil
            });
        }                    
    });
    
});

router.get('/show/:id',(req,res)=>{
    con.getProductById(req.params.id, (err,hasil)=>{        
        if (err) {
            console.log(err);
        }else {
            console.log(hasil[0]);
            res.render('product_detail', {
                ...hasil[0]
            });
        }                    
    });
    
});

module.exports = router;

