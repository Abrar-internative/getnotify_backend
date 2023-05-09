const General = require('../model/general');
const Preferences = require('../model/preferences');

const preferences = async (req, res) => {
  const {advance,read,link,attachment,send,notification,readCount,linkCount} = req.body
  
  await Preferences.updateOne({_id:'645a482465c8baf79fc9af8b'},
    {
    advance:advance,
    read:read,
    link:link,
    attachment:attachment,
    send:send,
    notification:notification,
    readCount:readCount,
    linkCount:linkCount
  })
    .then(()=>{
      console.log('Successfully updated preferences')      
      res.status(200).json({
        message: 'Successfully updated preferences'
      })
    })
} 
const userInfo = async (req, res) => {
  const {firstName,lastName,email,company,phone,address,state,zipCode,country,language,timezone,currency} = req.body

  await General.updateOne({_id:'645a4fd9a4be80530a5ea776'},
  {
    firstName: firstName,
    lastName: lastName,
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
    })
    .then(()=>{
      console.log('Successfully updated general information')      
      res.status(200).json({
        message: 'Successfully updated general information'
      })
    })
  
 
}

module.exports = {preferences,userInfo}