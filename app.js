var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('./models/HelpingHands');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/helping_hands');


var app = express();
//angular route
app.use(express.static(path.join(__dirname, '/ang-helping-hands/dist')));
app.use(bodyParser.json());

// var indexRouter = require('./routes/index');

const StuffSchema = new mongoose.Schema({
    Name: {type: String, minlength: 3},
    Item_Name: {type: String, minlength:3},
    Item_Amount: {type: Number},
    Email: {type: String, minlength:3, pattern:"^\\S+@\\S+$"},      
})


const Stuff = mongoose.model('Stuff', StuffSchema)


//old path
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());

// app.use('/', indexRouter);
app.get('/', function(request,response){
    response.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/donations', function(request, response){
    Stuff.find({}, function(err, data){
        if(err){
            console.log('we got errors:');
            console.log(err);
        } else{
            response.json({data: data});
        }
    })
})


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));

// });

app.post('/donations', function(request, response){
    console.log("Got to Post In app.js")
    const customErrors = [];
    console.log(request.body);
    if(request.body.Name.length < 3){
        customErrors.push("Name Was Not Long Enough, Must Be More Than 3 characters")
    }
    if(request.body.Item_Name.length < 3){
        customErrors.push("Item Name Was Not Long Enough, Must Be More Than 3 characters")
    }
    if(request.body.Email.length < 3){
        customErrors.push("Email Was Not Long Enough, Must Be More Than 3 characters")
    }

    if(customErrors.length > 0){
        response.json({errorStatus: customErrors});
    }else{
        let newStuff = new Stuff(request.body);
        newStuff.save(function(err){
            if(err){
                console.log('error');
            }
        })
        response.json({status: 'everything went okay!'})
    }
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    //check the Angular redirect
    // res.render('error');
    res.redirect('/');
    // res.json({'message': 'error in navigation', 'error': err.status})

});


app.listen(8000, function (req, res) {
    console.log(`listening on 8000...`,);

});

module.exports = app;
module.exports.mongoose = mongoose;
