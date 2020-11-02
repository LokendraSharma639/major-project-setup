const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/user')
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
//find a user and stablish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user-->passport');
            return done(err);
        }
        if(!user||user.passport!=password){
            consolw.log('Invalid user name and password');
            return done(null,false);
        }
        return done(null,user);
    });
}
));

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user to decide which key is to be kept in the cookies

    passport.deserializeUser(function(id,done){
        User.findOne(id,function(err,user){
            if(err){
                console.log('error in finding user-->passport');
                return done(err);
            }
            return done(null,user);
        });
    });

    //check if user is authenticated
    passport.checkAuthentication=function(req,res,next){
        //if the user is sign in,then pass on the rquest to the next function(controllers action)
        if(req.isAuthenticated()){
            return next();
        }
        // if the user is not sign in
        return res.redirect('/user/sign-in');
    }

    passport.setAuthenticatedUser=function(req,res,next){
        if(req.isAuthenticated()){
            //req.user contains the current sign in user from the session cookies and we are just sending this to the local for the view
            res.local.user=req.user;
        }
        next();
    }

    module.exports=passport;





