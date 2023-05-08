const fs = require('fs');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
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

const preferences = async (req, res) => {
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
    
    jsonReader('./data/account.txt', (err,result)=>{
        fs.writeFile('./data/account.txt',JSON.stringify({...result,preferences},null,2),(err,data)=>{
            if(err) return res.status(500)
            res.status(200).send('updated successfully')
        })
    })
    
}
const userInfo = async (req, res) => {
  const {avatar,firstname,lastname,email,company,phone,address,state,zipCode,country,language,timezone,currency} = req.body

  const general = {
  avatar: avatar,
  firstname: firstname,
  lastname: lastname,
  email: email,
  company: company,
  phone: phone,
  address: address,
  state: state,
  zipCode: zipCode,
  country: country,
  language: language,
  timezone: timezone,
  currency: currency,
  }
  
  jsonReader('./data/account.txt', (err,result)=>{
      fs.writeFile('./data/account.txt',JSON.stringify({...result,general},null,2),(err,data)=>{
          if(err) return res.status(500)
          res.status(200).send('updated successfully')
      })
  })
  
}

module.exports = {preferences,userInfo}