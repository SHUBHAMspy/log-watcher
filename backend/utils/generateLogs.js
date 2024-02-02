const fs = require('fs');
const dateAndTime = require('./formatDate')
const { getQuote } = require("node-quotegen");

// Get a random quote
let quote = getQuote()

fs.appendFile("logfile.log",dateAndTime()+": "+ quote,(err) => {
  if(err) throw err;
  // console.log("log file initialized");
});

setInterval(() => {
  fs.appendFile("logfile.log","\n"+dateAndTime()+": "+ quote,(err) => {
  if(err) console.log(err);
  // console.log("log updated");
  });
    
  quote = getQuote()
},5000);