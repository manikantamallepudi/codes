var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var bcrypt=require('bcrypt-nodejs');
var connection = mysql.createConnection
({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'universe'
  });

function Authenticate(username, password, fn) {
    var app = express();
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
     connection.connect(function(err){
             if(!err) {
                console.log("Database is connected...");
               }
        else
      {           console.log("Error connecting database..."+err);
          }
     });
     var user;
     connection.query('SELECT * from record1 where email = ' +
         connection.escape(email) + ' and password =' + connection.escape(password),
         function(err, rows) {
             user = rows[0].email;
         });
     if (!user) {
         return fn(new Error('cannot find user'));
     } else {
         return fn(null, user);
     }


}sss
app.get('/',function(req,res,next){
res.sendfile('temp/index2.html');
});

 app.post('/Login', function(req, res) {
    Authenticate(req.body.email, req.body.password, function(err, user) {
        if (user) {
            req.session.regenerate(function() {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user;
                res.redirect('Home');
            });
        } else {
            req.session.error = 'Authentication failed, please check your username and password.';
            res.redirect('Login');
        }
    });
})