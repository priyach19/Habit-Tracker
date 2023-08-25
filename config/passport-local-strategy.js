//for authentication
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../model/user')

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback:true
      },
      async function (req, email, password, done) {
        try {
          // find the user and stablish the identity
          const user = await User.findOne({ email: email });
          console.log(user);
  
          if (!user || user.password != password) {
            console.log("Invalid username or password");
            return done(null, false);
          }
  
          return done(null, user);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
passport.serializeUser(function(user,done){
    done(null,user.id,);
})

passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log("Error in finding user --> passport");
      return done(err);
    }
  });

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('users/signIn')
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;