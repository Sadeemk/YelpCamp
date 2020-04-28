const express = require('express'),
	Campground = require('../models/campground'),
	router = express.Router();

router.get('/', (req, res) => {
	// get all campgrounds from db then render file
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds });
		}
	});
});

router.post('/', isLoggedIn, (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = { name: name, image: image, description: desc, author: author };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
	//find campgound with provided id
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;
