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

var indexRouter = require('./routes/index');

//old path
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    //check the Angular redirect
    res.redirect('/');
});


app.listen(8000, function (req, res) {
    console.log(`listening on 8000...`,);

});

module.exports = app;
module.exports.mongoose = mongoose;
