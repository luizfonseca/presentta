
/**
 * Module dependencies.
 */

var express   = require('express');
var routes    = require('./routes');
var user      = require('./routes/user');
var http      = require('http');
var path      = require('path');

var app = express();
var server    = http.createServer(app);
var io        = require('socket.io').listen(server); 


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('MYAWESOMECOOKIESECRET'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Setting up the routes
app.get('/', routes.index);
app.get('/users', user.list);




// Start the server on the env PORT or the default port
// Output it to console
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// Setting up a simple chat room using websockets
io
.of('/messages') // We set up an exclusive path to receive messages
.on('connection', function(socket){ // On 'connection' event, trigger an action
  socket.on('msg_sent', function(data){
    socket.broadcast.emit('msg_received', { from: 'visitor', msg: data.msg });
  });

});




