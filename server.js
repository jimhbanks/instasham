var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var instagram = require('instagram-node-lib');
var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

instagram.set('callback_url', 'http://9e4a9293.ngrok.io/callback');
instagram.set('maxSockets', 50);

var tags = ['clown', 'london', 'football', 'wally', 'waldo'];

for (var i = 0; i < tags.length; i++) {
  instagram.subscriptions.subscribe({ 
    object: 'tag', 
    object_id: tags[i]
  });
};

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/callback', function(req, res) {
  instagram.subscriptions.handshake(req, res); 
});

app.post('/callback', function(req, res) {
  console.log(req.body);

  var notification = req.body;

  io.sockets.emit('instagram', notification);
});

server.listen(port, function() {
  console.log('tj is cool!');
});