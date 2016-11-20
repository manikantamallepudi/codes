var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
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
res.sendfile('temp/index1.html');
});

app.post('/myaction', function(req, res) {
console.log('req.body');
console.log(req.body);
res.write('You sent the name "' + req.body.name+'".\n');
res.write('You sent the Email "' + req.body.email+'".\n');
res.write('You sent the Password "' + req.body.password+'".\n');
res.write('You sent the City "' + req.body.city+'".\n');
res.write('You sent the Pincode "' + req.body.pincode+'".\n');
res.end();

connection.query("Insert into user(name,email,password,city,pincode) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','"+req.body.city+"','"+req.body.pincode+"')",function(err, rows)      
{                                                      
     if(!err) {
                           console.log('inserted successfully');
                           req.send(JSON.stringify(rows));
                            }
                else {
                          console.log('error while inserting'+err);
                            }
                       req.end();
});
});


app.put('/update/:id', function(req, res) {
  var name = req.param('name');
  var email = req.param('email');
  var password = req.param('password');
  var city = req.param('city');
  var pincode = req.param('pincode');
  var userid = req.param('id');

  var VALUES = [name,email,password,city,pincode,userid];
connection.query("update user SET name = ?,email = ?,password = ?,city = ?,pincode = ? WHERE userid = ?",VALUES, function(err, rows,fields){

  if(!err) {
                           console.log('updated successfully');
                           res.send(JSON.stringify(rows));
                           console.log('Record Updated ' + result.changedRows + ' rows');
                            }
                else {
                          console.log('error while updating'+err);
                            }
                       res.end();
});
});

app.get('/delete/:id', function(req, res) {
var userid = req.param('id');
var VALUES = [userid];
 connection.query("DELETE FROM user WHERE userid = ?",VALUES, function(err, rows,fields){

  if(!err) {
                           console.log('deleted successfully');
                           res.send(JSON.stringify(rows));
                           console.log('Record deleted ' + result.changedRows + ' rows');
                            }
                else {
                          console.log('error while deleting'+err);
                            }
                       res.end();
});
});

app.listen(3000);
console.log('Example app listening at port - :3000');

});



