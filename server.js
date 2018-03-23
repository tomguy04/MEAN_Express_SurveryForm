// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));

//require session
var session = require('express-session');
//use session
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})

// post route for adding a user
app.post('/result', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user to the database
    // Then redirect to the root route

    //In this case I store the user data to session.
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    console.log(`name ${req.session.name}`);
    console.log(`location ${req.session.location}`);
    console.log(`language ${req.session.language}`);
    console.log(`comment ${req.session.comment}`);
    res.redirect('/result');
})

app.get('/result',function(req,res){
    console.log(`********************name ${req.session}`);
    //trying something else
    var users_array = [
        {name: req.session.name, location: req.session.location, language : req.session.language, comment : req.session.comment}
    ];
    res.render('results', {info: users_array});
    //res.render("results",{info: req.session});   
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
