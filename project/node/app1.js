var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var connection = mysql.createConnection
({
   host     : 'localhost',
   user     : 'root',
   password : 'password',
   database : 'universe'
  });
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
connection.connect(function(err){
if(!err) {
           console.log("Database is connected...");
               }
else
      {           console.log("Error connecting database..."+err);
          }

app.get('/',function(req,res,next){
res.sendfile('temp/index.html');

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
});
app.listen(3000);
console.log('Example app listening at port - :3000');

});



