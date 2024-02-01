const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path'); 
const Watcher = require('./watcher');
const generateLog = require('./utils/generateLogs')
const PORT = process.env.PORT || 5000;

 
let watcher = new Watcher("logfile.log");

watcher.start();


app.get('/log', (req, res) => {
    console.log("request received");
    io.on('connection', function(socket){
      // console.log(socket);
      //console.log("new connection established:"+socket.id);
  
      watcher.on("process", function process(data) {
        socket.emit("update-log",data);
      });
      let data = watcher.getLogs();
      socket.emit("init",data);
    });
})



http.listen(PORT, function(){
  console.log(`Server is running on port ${PORT}`);
});
