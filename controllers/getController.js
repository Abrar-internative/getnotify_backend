const General = require('../model/general');
const Preferences = require('../model/preferences');

const preferences = async (req, res) => {
    await Preferences.findOne({_id:'645a482465c8baf79fc9af8b'})
    .then((result)=>{
        console.log(result);
        res.sendStatus(200);
    })
   
}
const userInfo = async (req, res) => {
    await General.findOne({_id:'645a4fd9a4be80530a5ea776'})
    .then((result)=>{
        console.log(result);
        res.sendStatus(200);
    })
}

module.exports = {preferences,userInfo}
