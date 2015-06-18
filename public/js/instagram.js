var socket = io('http://9e4a9293.ngrok.io/');
var photos = [];

socket.on('connect', function() {
  console.log('Connected!');
});

socket.on('instagram', function(object) {
  console.log(object);
  $.ajax({
    url: 'https://api.instagram.com/v1/tags/' +  object[0].object_id + '/media/recent?client_id=30493fdb2ba24aeb91b45bdbd45bf3a6',
    dataType: 'jsonp'
  }).done(function(response) {
    console.log(response);
    if(photos.indexOf(response.data[0].id) === -1) {
      $('#photo-container').prepend('<li class="animated bounceInLeft"><img src="' + response.data[0].images.standard_resolution.url + '"></li>');
      photos.push(response.data[0].id);
    } else {
      console.log('duplicate');
    }
  })
});
