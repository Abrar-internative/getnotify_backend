const express = require('express');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const fs = require('fs');
const app = express();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer,{
  cors:{
    origin: '*',
  }         
}); 
const PORT = 3002;

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

 function jsonReader(filePath, cb) {
  fs.readFileSync(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
const data = {
    general: {
    //   avatar: avatar11, 
      username: 'johndoe',
      fullName: 'John Doe',
      email: 'granger007@hogward.com',
      company: 'PIXINVENT'
    },
    info: {
      bio: '',
      dob: null,
      country: 'USA',
      website: '',
      phone: 6562542568
    },
    social: {
      socialLinks: {
        twitter: 'https://www.twitter.com',
        facebook: '',
        google: '',
        linkedIn: 'https://www.linkedin.com',
        instagram: '',
        quora: ''
      },
      connections: {
        twitter: {
        //   profileImg: avatar11,
          id: 'johndoe'
        },
        google: {
        //   profileImg: avatar3,
          id: 'luraweber'
        },
        facebook: {},
        github: {}
      }
    },
    notification: {
      commentOnArticle: true,
      answerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false 
    },
    preferences:{
      mode: true,
      events:[{read:true,link:false,attachment:true}],
      send: 'individually',
      notification: 'sms',
      emailReadCount: 3,
      linkClickedCount: 2,
    }
  }
app.use(logger) ;//log requests to console and logfile 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
//https://stormy-worm-scrubs.cyclic.app
const whitelist = ["http://localhost:3001","http://localhost:3000","https://getnotify.netlify.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  } 
}
app.use(cors({
  origin:'*',
  optionsSuccessStatus: 200,
}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.options('*',cors())
app.get('/noti',(req,res)=>{
  res.status(200).send("gotchya")
})
app.post('/noti',(req,res)=>{
  res.status(200).send("gotchya again")
})
app.post('/test', async (req,res)=>{
  // console.log(req.body)
  const {mode,read,link,attachment,send,notification,readCount,linkCount} = req.body

    const preferences = {
        mode: mode || false,
        read: read ? true : false,
        link: link || false,
        attachment: attachment || false,
        send: send || 'individually',
        notification: notification || 'sms',
        readCount: readCount || 3,
        linkCount: linkCount || 2,
    }
    await fs.open('./data/account.txt','r+',async function(err,fd){
      console.log(fd)
      await fs.readFile('./data/account.txt',(err,data)=>{
           console.log(JSON.parse(data))
           const result = JSON.parse(data)
           fs.writeFileSync('./data/account.txt',JSON.stringify({...result,preferences},null,2),(err,data)=>{
                  if(err) return res.status(500)
                  
                  return res.status(200).send('updated successfully')
                  
              })
         })
      return res.status(200).send('updated successfully')
    })
    //  await fs.readFile('./data/account.txt',(err,data)=>{
    //    console.log(JSON.parse(data))
    //    const result = JSON.parse(data)
    //    fs.writeFileSync('./data/account.txt',JSON.stringify({...result,preferences},null,2),(err,data)=>{
    //           if(err) return res.status(500)
              
    //           return res.status(200).send('updated successfully')
              
    //       })
    //  }) 
    
    // jsonReader('./data/account.txt', (err,result)=>{
    //   if(err) return res.status(500).send(err.message)
    //   fs.writeFileSync('./data/account.txt',JSON.stringify({...result,preferences},null,2),(err,data)=>{
    //       if(err) return res.status(500)
          
    //       return res.status(200).send('updated successfully')
          
    //   })
    // })
})

app.use('/update', require('./routes/update'));
app.get('/account', (req, res) => {
  fs.readFile('./data/account.txt','utf8',(err,data) => { 
    // console.log(data)
    res.status(200).send({data})
  })  
      
})

app.listen(PORT,()=>{ console.log(`Express server listening on port ${PORT}`) });