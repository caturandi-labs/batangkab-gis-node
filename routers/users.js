const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

//Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
	res.render('users/login', {
		layout: null
	});
});

router.post('/login',(req,res,next)=>{
	passport.authenticate('local',{
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req,res,next);
});

// User Register
router.get('/register', (req, res) => {
	res.render('users/register', {
		layout: null
	});
});


//Register Form Post
router.post('/register', (req, res) => {
	let errors = [];

	if (req.body.password != req.body.password2) {
		errors.push({ text: "Password Do Not Match" });
	}

	if (!req.body.name) {
		errors.push({ text: "Name is Required" });
	}

	if (req.body.password.length < 8) {
		errors.push({ text: "Password Must be At least 8 Character" });
	}

	if (errors.length > 0) {
		res.render('users/register', {
			errors: errors,
			name: req.body.name,
			email: req.body.email,
			layout: null
		});
	} else {

		//Cek Email Apakah Sudah Mendaftar
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					req.flash('error_msg', 'E-mail Address Already Registered');
					res.redirect('/users/register');
				} else {
					//Objek User baru
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});

					//Generate Salt Password
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.save()
								.then(user => {
									req.flash('success_msg', 'You Are Now Registered and can Log in');
									res.redirect('/users/login');
								})
								.catch(err => {
									console.log(err);
									return;
								});
						});
					});
				}
			});
	}
});


//logout user
router.get('/logout', (req,res)=>{
	req.logout();
	req.flash('success_msg', "Berhasil Logout");
	res.redirect('/users/login');
});

module.exports = router;