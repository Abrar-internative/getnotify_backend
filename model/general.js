const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalSchema = new Schema({    
    avatar:{
        type:String,
        default:"avatar11"
    },
    firstName:{
        type:String,        
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    company:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    zipCode:{
        type:String,
    },
    country:{
        type:String,
    },
    language:{
        type:String,
    }
    ,timezone:{
        type:String,
    },
    currency:{
        type:String,
    }
});
module.exports = mongoose.model('General', generalSchema);