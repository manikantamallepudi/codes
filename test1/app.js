var express    = require("express");
var mysql      = require('mysql');
var fs = require('fs');
var passport = require('passport');
var bodyParser = require('body-parser');
var router = require('router');
var LocalStrategy = require('passport-local').Strategy;
var port = 3000;
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


app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res) {
  res.sendfile('index.html');
});


app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(email, password, done) {
  process.nextTick(function() {
     UserDetails.findOne({
      'email': email, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));

app.listen(3000);
});