var createError = require('http-errors');
var http=require('http');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var indexj = require('./routes/index');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//sessions middleware
//sessions middleware
app.use(session({
    secret: "secret",
    proxy: true,
    resave: false,
    saveUninitialized: false
}));

app.use('/api', api);
app.use('/', indexj);


const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,

}
app.use(cors(corsOptions));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3000;
const server = app.listen(port);
module.exports = app;
