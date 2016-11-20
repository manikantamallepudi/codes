var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: 'root',
    password: 'password',
    host: 'localhost',
    database: 'universe'
}; 

sql.connect(config, function (err) {
    console.log(err);
})
var port = 5000;
var nav = [{
             Link: '/Books',
             Text: 'Books'
             }, {
            Link: '/Authors',
            Text: 'Authors'
            }];
var bookRouter = require('./src/routes/bookRoutes') (nav);
app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', '.ejs');


    app.use('/Books', bookRouter);

app.get('/', function(req,res) {
    res.render('index', {
        title: 'hello from render',
        nav: [{
        Link: '/Books',
        Text: 'Books'
        },  {
        Link: '/Authors',
        Text: 'Authors'
        }]
    });
});
app.listen(5000, function(err){
console.log('running server on port:' + port);
});