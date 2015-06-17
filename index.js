var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 
var http = require('http');
var Instagram = require('instagram-node-lib');
server = http.createServer(app);
port = process.env.PORT || 3000;


app.set('views', './views');
app.set('view-engine', 'ejs');

var io = require('socket.io')(server);


Instagram.set('client_id', 'YOUR-CLIENT-ID');
Instagram.set('client_secret', 'YOUR-CLIENT-SECRET');
Instagram.set('callback_url', 'http://46cffe1a.ngrok.io');

app.get('/', function(req, res) {
  res.send('hello server');
});

server.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
});

// io.on('connect', function(socket) {
// });


