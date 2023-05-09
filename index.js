require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const {logger} = require('./middleware/logEvents');
const app = express();

const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer,{
  cors:{
    origin: '*',
  }         
}); 
const PORT = process.env.PORT || 3002;
connectDB();
io.on('connection',socket=>{
  console.log(socket.id)
  socket.on('new',()=>{
    // console.log('notification')
    socket.emit('notification',{  
      name:"AB",
      sub:'Your email was just opened',
      color:'light-success',
      title:'Hello'

    })
  }) 
}
)
httpServer.listen(5500)

app.use(logger) ;//log requests to console and logfile 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
//https://stormy-worm-scrubs.cyclic.app

app.use(cors({
  origin:'*',
  optionsSuccessStatus: 200,
}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/update', require('./routes/update'));
app.use('/get', require('./routes/get'));
app.get('/account', (req, res) => {
  fs.readFile('./data/account.txt','utf8',(err,data) => { 
    // console.log(data)
    res.status(200).send({data})
  })  
      
})

mongoose.connection.once('open', ()=>{
  console.log('Connected to MongoDB');
  app.listen(PORT,()=>{ console.log(`Express server listening on port ${PORT}`) });
})