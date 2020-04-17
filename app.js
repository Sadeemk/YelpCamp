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
	image: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

Campground.create(
	{
		name: 'Sunny Steps',
		image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg'
	},
	function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			console.log('NEWLY CREATED CAMPGROUND: ');
			console.log(campground);
		}
	}
);

let campgrounds = [
	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' },
	{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
	{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
	{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' }
];

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

app.listen(3000, () => {
	console.log('YelpCamp server started on port 3000');
});
