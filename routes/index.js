const express = require('express'),
	passport = require('passport'),
	User = require('../models/user'),
	router = express.Router();

//route route
router.get('/', (req, res) => {
	res.render('landing');
});

// ===========
// AUTH ROUTES
// ===========

// show register form
router.get('/register', (req, res) => {
	res.render('register');
});
//handle sign-up logic
router.post('/register', (req, res) => {
	let newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			return res.render('register', { error: err.message });
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Welcome to YelpCamp ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

//show login form
router.get('/login', (req, res) => {
	res.render('login');
});
//login logic
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

//logout route
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'Logged you out');
	res.redirect('/campgrounds');
});

module.exports = router;
