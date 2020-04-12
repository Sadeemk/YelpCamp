let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	let campgrounds = [
		{ name: 'Weeping Woods', image: 'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg' },
		{ name: 'Sunny Steps', image: 'https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg' },
		{ name: 'Lazy Lake', image: 'https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg' }
	];

	res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(3000, () => {
	console.log('YelpCamp server started on port 3000');
});
