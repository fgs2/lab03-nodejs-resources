const loginControl = (request, response) => {
    const clientServices = require('../services/clientServices');

    let username = request.body.username;
    let password = request.body.password;
    console.log(username);
    console.log(password);
    if (!username || !password) {
        response.send('login failed');
        response.end();
    } else {
        if (request.session && request.session.user) {
            response.send("Already logged in");
            response.end();
        } else {
            clientServices.loginService(username, password, function(err, dberr, client) {
                console.log("Client from login service :" + JSON.stringify(client));
                if (client === null) {
                    console.log("Authentication problem!");
                    response.send('login failed'); //invite to register
                    response.end();
                } else {
                    console.log("User from login service :" + client[0].num_client);
                    //add to session
                    request.session.user = username;
                    request.session.num_client = client[0].num_client;
                    request.session.admin = false;
                    response.send(`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
                    <html>
                    
                    <head>
                        <title>Webstore</title>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <link rel="stylesheet" type="text/css" href="/hwu.css" title="HWU">
                        <link rel="shortcut icon" href="hwu.png">
                        <meta http-equiv="pragma" content="no-cache" />
                    </head>
                    
                    <body>
                        <div class="banner">
                            <div class="logo">
                                <a href='http://www.hw.ac.uk' target="top">
                                    <img src="/hwu.png" width="64" height="64" alt="Logo HWU" />
                                </a>
                            </div>
                    
                            <div class="title">
                                <H1>WEBSTORE</H1>
                            </div>
                        </div>
                    
                        <div class="menu">
                            <table class='tmenu'>
                                <thead>
                                    <th id='th'> </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href="/">Home</a></td>
                                        <td>
                                            <a href="/api/catalogue">Catalog</a></td>
                                        <td>
                                            <a href="/api/clients">Clients</a></td>
                                        <td>
                                            <a href="/api/contacts">Contacts</a></td>
                    
                                        <td>
                                            <a href="controller.php?action=6">Cart</a>
                                        </td>
                                        <td>
                                            <a href="/api/login">Login</a>
                                        </td>
                                        <td>
                                            <a href="/api/register">Register</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <div class='content'>
                    <H1 ID="welcome">Login (${username}, ID.${client[0].num_client}) successful!</H1>
                    </div>
                    <br>
<div id="foot">
    <p>Copyright &copy; (2021) - H W U</p>
</div>
</body>

</html>
`
            );
                    response.end();
                }
            });
        }
    }
};


const registerControl = (request, response) => {
    const clientServices = require('../services/clientServices');
    const clientCreate = require('../models/entities');

    let username = request.body.username;
    let password = request.body.password;
    let society = request.body.society;
    let contact = request.body.contact;
    let addres = request.body.address;
    let zipcode = request.body.zipcode;
    let city = request.body.city;
    let phone = request.body.phone;
    let fax = request.body.fax;
    let max_outstanding = request.body.max_outstanding;
    let client = new clientCreate.Client (username, password, 0, society, contact, addres, zipcode, city, phone, fax, 0);

    clientServices.registerService(client, function(err, exists, insertedID) {
        console.log("User from register service :" + insertedID);
        if (exists) {
            console.log("Username taken!");
            response.send(`registration failed. Username (${username}) already taken!`); //invite to register
        } else {
            client.num_client = insertedID;
            console.log(`Registration (${username}, ${insertedID}) successful!`);
            response.send(`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
            <html>
            
            <head>
                <title>Webstore</title>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" type="text/css" href="/hwu.css" title="HWU">
                <link rel="shortcut icon" href="hwu.png">
                <meta http-equiv="pragma" content="no-cache" />
            </head>
            
            <body>
                <div class="banner">
                    <div class="logo">
                        <a href='http://www.hw.ac.uk' target="top">
                            <img src="/hwu.png" width="64" height="64" alt="Logo HWU" />
                        </a>
                    </div>
            
                    <div class="title">
                        <H1>WEBSTORE</H1>
                    </div>
                </div>
            
                <div class="menu">
                    <table class='tmenu'>
                        <thead>
                            <th id='th'> </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="/">Home</a></td>
                                <td>
                                    <a href="/api/catalogue">Catalog</a></td>
                                <td>
                                    <a href="/api/clients">Clients</a></td>
                                <td>
                                    <a href="/api/contacts">Contacts</a></td>
            
                                <td>
                                    <a href="controller.php?action=6">Cart</a>
                                </td>
                                <td>
                                    <a href="/api/login">Login</a>
                                </td>
                                <td>
                                    <a href="/api/register">Register</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div class='content'>
                <H1 ID="welcome">Successful registration ${client.contact} (ID.${client.num_client})!</H1>
            </div>
            <br>
<div id="foot">
    <p>Copyright &copy; (2021) - H W U</p>
</div>
</body>

</html>
`
            );
        }
        response.end();
    });
};

const getClients = (request, response) => {
    const clientServices = require('../services/clientServices');
    clientServices.searchService(function(err, rows) {
        response.render('clients', {clients: rows});
        response.end();
    });
};

const getClientByNumclient = (request, response) => {
    const clientServices = require('../services/clientServices');
    let num_client = request.params.num_client;
    clientServices.searchNumclientService(num_client, function(err, rows) {
        response.render('client', {client: rows});
        response.end();
    });
};

module.exports = {
    loginControl,
    registerControl,
    getClients,
    getClientByNumclient
};