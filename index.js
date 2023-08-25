const express = require('express');
const app = express();
const path= require('path');
const port=8000;//assign port for running in local computer
const db=require('./config/mongoose');
const cookieParser= require('cookie-parser')
const bodyParser=require('body-parser');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
// for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flashMiddleware');

//connecting assets folder/static files
app.use(express.static('./assets'));
app.use(expressLayouts);

//for parsing request
app.use(express.json());
app.use(cookieParser());

//setting views and ejs engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));


//extracting styles and scripts from subpages to layout
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);

//to store session data
const MongoStore=require('connect-mongo')
app.use(session({
    name:'habits',
    secret:'habitstracker',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000* 60 * 600)
    },
    store:MongoStore.create(
        {
            mongoUrl:"mongodb+srv://riya:mongouser@cluster0.5jli1e7.mongodb.net/habitTracker?retryWrites=true&w=majority",
            autoRemove:'disabled'
        }
    )
   }));

app.use( bodyParser.urlencoded({extended:false}));
//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use('/' , require('./routes/index')); 
// directing the app in the given port
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`server is running on port ${port}`)
})
