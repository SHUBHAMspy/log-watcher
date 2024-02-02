const express = require('express');
const app = express();
const httpServer = require('http').createServer(app)
const {Server} = require('socket.io')
const path = require('path'); 
const Watcher = require('./watcher');
const generateLog = require('./utils/generateLogs')
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


let watcher = new Watcher("logfile.log");

watcher.start();

io.on('connection', function(socket){
  console.log(socket);
  console.log("new connection established:"+socket.id);

  watcher.on("process", function process(data) {
    socket.emit("update-log",data);
  });
  let data = watcher.getLogs();
  socket.emit("init",data);
});
// app.get('/log', (req, res) => {
//     console.log("request received");
// })



httpServer.listen(PORT, function(){
  console.log(`Server is running on port ${PORT}`);
});
