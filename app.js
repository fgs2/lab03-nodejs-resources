const express = require('express');
const router = require('./apis/routes.js');
//creating app
const app = express();
app.use(express.static('public'));
app.use(router);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
 res.render('index'); //no need for ejs extension
});
//route for contacts
app.get('/contacts', (req, res) => {
    res.render('contacts');
   });
app.get('/register', (req, res) => {
    res.render('register');
   });
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/api/catalogue', (req, res) => {
    res.render('catalogue');
});
app.post('/api/register', function (req, res) {
    res.send("Register Test");
} );
app.get('/api/login', function (req, res) {
    res.send("Login Test");
} );
//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
 console.log(`Cart app listening at http://localhost:${port}`);
});