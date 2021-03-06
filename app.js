var session = require('express-session');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose')
var app = express();

// Import the contollers for the different available entities.
var authRouter = require('./routes/auth');
var projectRouter = require('./routes/projects');
var ticketsRouter = require('./routes/tickets');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Map the parent routes to the imported controllers of the different available
// entities
app.use('/api/v1', authRouter);
app.use('/projects', projectRouter);
app.use('/projects/:project_id/tickets', ticketsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the database connection
mongoose.connect('mongodb://localhost:27017/loopy', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useFindAndModify: true, 
}).then(() => console.log('DB Connected'))
.catch(error => console.log('Error:', error));

module.exports = app;
