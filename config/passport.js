const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/User');

//Load User Model
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
    User.findOne({email: email})
      .then(user=>{
        if(!user){
          return done(null, false, {
            message: 'User Tidak Tersedia'
          });
        }

        //Compare User Input Password with User Database Password
        bcrypt.compare(password, user.password, (err, isMatch)=>{
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, {
              message: 'Password Tidak Cocok'
            });
          }
        });
      })
      .catch(err =>{
        console.log(err);
      });
  }));

  passport.serializeUser((user,done)=>{
    done(null, user.id);
  });  

  passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
      done(err,user);
    });
  });


}