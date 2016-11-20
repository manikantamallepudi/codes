var express = require('express');

var bookRouter = express.Router();
var sql = require('mssql');
var router = function(nav){

    var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Less Miserables',
        genre: 'Historical Fiction',
        author: 'Phlips Hughes',
        read: false
    },
    {
        title: 'Life On The Mississippi',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
     {
        title: 'Game Of Thrones',
        genre: 'Historical Fiction and action',
        author: 'HBO',
        read: false
    },
     {
        title: 'Sydney Sheldon',
        genre: 'Drama',
        author: 'anderson',
        read: false
    },
     {
        title: 'Naa Istam',
        genre: 'Biography',
        author: 'Ram Gopal Varma',
        read: false
    }
]
bookRouter.route('/')
    .get(function (req, res){
        var request = new sql.Request();
        request.query('select * from user', function (err,recordset){
            console.log(recordset);
        })
        res.render('bookListView', {
        title: 'Books',
        nav: nav,
        books: books
    });
    });
    bookRouter.route('/:id')
    .get(function (req, res){
        var id = req.params.id;
        res.render('bookView', {
        title: 'Books',
        nav: nav,
        book: books[id]
    });
    });

return bookRouter;

}

    module.exports = router;
