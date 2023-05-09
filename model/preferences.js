const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({    
    advance:{
        type:Boolean,
        default:false
    },
    read:{
        type:Boolean,
        default:true
    },
    link:{
        type:Boolean,
        default:false
    },
    attachment:{
        type:Boolean,
        default:false
    },
    send:{
        type:String,
        default:"individually"
    },
    notification:{
        type:String,
        default:"sms"
    },
    readCount:{
        type:Number,
        default:3
    },
    linkCount:{
        type:Number,
        default:2
    }
});
module.exports = mongoose.model('Preferences', preferencesSchema);