const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	// get all campgrounds from db then render file
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds });
		}
	});
});

app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = { name: name, image: image, description: desc };
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
	//find campgound with provided id
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(3000, () => {
	console.log('YelpCamp server started on port 3000');
});
