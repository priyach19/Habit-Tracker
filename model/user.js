const mongoose = require('mongoose');
//schema for user authentication
const userShema = new mongoose.Schema({
    name :{
        type : 'String',
        required : true
    },
    email : {
        type : 'String',
        require : true,
        unique : true
    },
    password : {
        type : 'String',
        require : true
    },
    date: {
        type: Date,
        default: Date.now
    },
    view: {
        type: String,
        default: 'daily'
    }
})

const User = mongoose.model("User" , userShema);
module.exports = User;