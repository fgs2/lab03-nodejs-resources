const productDAO = require('../db/productDAO');
const searchService = function(callback) {
    productDAO.findAll(function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("No products!");
        } else {
            callback(null, rows);
        }
    });
};
const searchIDService = function(reference, callback) {
    productDAO.findByID(reference, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length != 0) {
            callback(null, rows[0]);
        } else {
            console.log("Unknown product!");
            let product = null;
            callback(null, product);
        }
    });
};
const searchCategoryService = function(category, callback) {
    productDAO.findByCategory(category, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) { //no products
            console.log(`No product in category ${category}!`);
            callback(null, rows);
        } else {
            //return the rows
            callback(null, rows);
        }
    });
};
module.exports = {
    searchIDService,
    searchService,
    searchCategoryService
};