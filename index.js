var express = require('express'); // Use the express library. 
var app = express(); // Create our app. 
var http = require('http');
var Instagram = require('instagram-node-lib');
server = http.createServer(app);
port = process.env.PORT || 3000;


app.set('views', './views');
app.set('view-engine', 'ejs');
app.get('/', function(req, res) {
  res.send('hello server');
});

var io = require('socket.io')(server);

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.NSTAGRAM_CLIENT_SECRET);
// Instagram.set('callback_url', 'http://9e4a9293.ngrok.io');  

Instagram.tags.info({
  name: 'blue',
  complete: function(data){
    console.log(data);
  }
});


server.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
});

// io.on('connect', function(socket) {
// });

app.get('/subscribe', function(request, response){
  Instagram.subscriptions.handshake(request, response); 
});



Instagram.subscriptions.subscribe({ 
        object: 'tag',
        object_id: 'blue',
        aspect: 'media',
        callback_url: 'http://9e4a9293.ngrok.io/subscribe',
        type: 'subscription',
        id: '#'
});

app.use(bodyParser.json());

