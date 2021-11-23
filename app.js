const express = require('express');
const router = require('./apis/routes.js');
//creating app
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.post('api/register', function (req, res) {
    console.log(req.body);
});
//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
});