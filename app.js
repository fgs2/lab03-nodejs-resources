const express = require('express');
const router = require('./apis/routes.js');
const session = require('express-session');
//creating app
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: 'f28wp_lab_3'}));
app.use(router); 
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index'); 
    //no need for ejs extension
});
//route for contacts
app.get('/api/contacts', (req, res) => {
    res.render('contacts');
   });
//route for catalogue
app.get('/api/catalogue', (req, res) => {
    res.render('catalogue');
});
//route for article
app.get('/api/article', (req, res) => {
    res.render('article');
});
//route for register
app.get('/api/register', function (req, res) {
    res.render('register');
});
//route for login
app.get('/api/login', function (req, res) {
    res.render('login');
});
app.get('/api/login_success', function (req, res) {
    res.render('login_success');
});
app.get('/api/register_success', function (req, res) {
    res.render('register_success');
});
app.get('/api/clients', function (req, res) {
    res.render('clients');
});
app.get('/api/client', function (req, res) {
    res.render('client');
});
//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
});