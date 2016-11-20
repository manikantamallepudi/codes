var express    = require("express");
var mysql      = require('mysql');
var fs = require('fs');
var bodyParser = require('body-parser');
var connection = mysql.createConnection
({
   host     : 'localhost',
   user     : 'root',
   password : 'password',
   database : 'multiplevalues'
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


app.all('/*.html', function (req, res) {
       console.log(req.url);
       var out = fs.readFileSync("temp" + req.url);
       res.set('content-type', 'text/html');
       res.send(out);
   });

app.post("/media",function(req,res){
		var name = req.body.name;
		var last = req.body.last;
		var mobile = req.body.mobile;
		var email = req.body.email;
		var password = req.body.password;
		var cpassword = req.body.cpassword;
                var values=[name,last,mobile,email,password,cpassword];
                res.send(name + '' + last + '' + mobile + '' + email + '' + password + '' + cpassword + '');
                connection.query('insert into registration values(?,?,?,?,?,?);',values,function(err,rows,fields){

                if(!err) {
                           console.log('inserted successfully');
                           req.send(JSON.stringify(rows));
                            }
                else {
                          console.log('error while inserting'+err);
                            }
                       req.end();
             
                         
    
 console.log(req.body);
  res.write(name + ' ' + last + ' ' + mobile + ' ' + email + '' +  password + '' + cpassword + '' );
	res.end();
});
});

app.listen(3000);
});