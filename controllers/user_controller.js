//import model of db
const User = require('../model/user');
//render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signUp', {
        title: "Sign Up | Habbit Tracker"
    })
}

//get the sign up data or create User
module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    let user = User.findOne({ email: req.body.email })
       
        if (!user) {
           await User.create(req.body);
           return res.redirect('/users/signIn');
            
        } else {
            return res.redirect('/users/signUp');
        }
    }

//create a session for user after sign in
module.exports.createSession = (req, res) => {
    req.flash('success' , 'Logged In Sucessfully !')
    return res.redirect('/');
}

//render sign in page 
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('signIn', {
        title: "Sign In | Habbit Tracker"
    })
}

//logout session
module.exports.destroySession = (req, res , done) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    })
    return res.redirect('/users/signIn');
}

// forget password page
module.exports.forgetPassword = function(req, res){
    return res.render('forgetPassword',{
        title : 'Forget Password'
    });
}
// update the existing password, with the newly created password.
module.exports.changePassword = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/signIn');
    }
    return res.redirect('back');

}
