const Campground = require('../models/campground'),
	Comment = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		//check if current user owns the campground
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err || !foundCampground) {
				req.flash('error', 'Campground not found');
				res.redirect('back');
			} else {
				//does current own the campground they are trying to edit
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					eq.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		//check if current user owns the comment
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err || !foundComment) {
				req.flash('error', 'Comment not found');
				res.redirect('back');
			} else {
				//does current own the comment they are trying to edit
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
};

module.exports = middlewareObj;
