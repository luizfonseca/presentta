// Instantiate a new app object
app = {}
app.form      = $('form.chat');
app.chatbox   = $('div.responses');
 

// A function to push all data to the chat box
app.SendMessage = function(data) {
  console.log('received');
  console.log(data);
  app.chatbox.append(
    '<p><strong> ' +  data.from + '  sent: </strong> ' + data.msg + '</p>'
  );
};


var socket = io.connect( location.href.replace('http', 'ws') + 'messages' );
socket.on('msg_received', function(data) { app.SendMessage(data) });

app.form.submit(function(e){
  e.preventDefault();
  console.log('sent');

  var msg = $('input[name="msg"]', app.form);
  socket.emit('msg_sent', { msg: msg.val() }); 
  app.SendMessage({ from: 'you', msg: msg.val() });
  msg.val('');
});

