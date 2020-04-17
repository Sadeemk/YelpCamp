const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Schema setup for mongodb
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Sunny Steps',
// 		image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg',
// 		description: 'This is a campground on a step with amazing sunlight. No water, no bathrooms!'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('NEWLY CREATED CAMPGROUND: ');
// 			console.log(campground);
// 		}
// 	}
// );

// let campgrounds = [
// 	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
// 	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
// 	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
// 	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
// 	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
// 	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
// 	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
// 	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
// 	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' }
// ];

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
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(3000, () => {
	console.log('YelpCamp server started on port 3000');
});
