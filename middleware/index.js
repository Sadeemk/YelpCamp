const Campground = require('../models/campground'),
	Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		//check if current user owns the campground
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				res.redirect('back');
			} else {
				//does current own the campground they are trying to edit
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		//check if current user owns the comment
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect('back');
			} else {
				//does current own the comment they are trying to edit
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please Login First!');
	res.redirect('/login');
};

module.exports = middlewareObj;
