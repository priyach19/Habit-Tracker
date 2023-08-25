//mongodb connection file using mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://riya:mongouser@cluster0.5jli1e7.mongodb.net/habitTracker?retryWrites=true&w=majority")

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error in connecting db"));

db.once('open',function(){
    console.log("connected to mongo database");
})

module.exports =db;