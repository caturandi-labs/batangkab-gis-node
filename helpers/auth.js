module.exports = {
  ensureAuthenticated: function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Anda Tidak Diinjinkan Masuk');
    res.redirect('/users/login');
  }
}