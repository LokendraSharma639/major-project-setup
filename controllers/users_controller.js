const User=require('../models/user')

module.exports.profile=function(req,res){
   if(req.cookies.user_id){
      User.findById(req.cookies.user_id,function(err,user){
         if(user){
            return res.render('user_profile',{
               title:"User profile",
               user:user
            })
         }else{
            return  res.redirect('/users/sign-in');
         }
      });
   }else{
      return res.redirect('/users/sign-in');
   }
}
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('users/profile');
   }
   return res.render('user_sign_up',{
      title:"Codiel|Sign Up"
   })
}
module.exports.signIn=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('users/profile');
   }

   return res.render('user_sign_in',{
      title:"Codiel|Sign IN"
   })
}
//get the sign up data
module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
      return res.render('back');
   }
User.findOne({email:req.body.email},function(err,user){
   if(err){console.log('error in finding user in signIng up');return}

   if(!user){
      User.create(req.body,function(err,user){
         if(err){console.log('error in creating user while signup');return}

         return res.redirect('/users/sign-in');
      })
   }else{
      return res.redirect('back');
   }
});
}
// sign in creat session for user
module.exports.createSession=function(req,res){
   //later 
   //find the user
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log('error in finding user in signIng up');return}

      if(user){
         //handle user found  
         if(user.password!=req.body.password){
            return res.redirect('back');
         }
         // handle session creation
         res.cookie('user_id' , user.id);

      }else{
               //handle user not found
               return res.redirect('back');
      }
   });
   

   //handle user found h

   //handle password which don't match

   //handle session creation

   //handle user not found
}

module.exports.createSession=function(req,res){
   return res.redirect('/');
}

module.exports.destroySession=function(req,res){
      req.logout();

   return res.redirect('/');
}



