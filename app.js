const express = require('express');
const router = require('./apis/routes.js');
//creating app
const app = express();
app.use(express.static('public'));
app.use(router);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index'); 
    //no need for ejs extension
});
//route for contacts
app.get('/contacts', (req, res) => {
    res.render('contacts');
   });
//route for contacts
app.get('/register', (req, res) => {
    res.render('register');
   });
//route for contacts
app.get('/login', (req, res) => {
    res.render('login');
});
//route for contacts
app.get('/api/catalogue', (req, res) => {
    res.render('catalogue');
});
//route for contacts
app.get('/api/article', (req, res) => {
    res.render('article');
});
//route for contacts
app.post('/api/register', function (req, res) {
    res.send("Register Test");
} );
//route for contacts
app.get('/api/login', function (req, res) {
    res.send("Login Test");
} );
//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
});