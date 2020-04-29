const express = require('express'),
	Campground = require('../models/campground'),
	Comment = require('../models/comment'),
	router = express.Router({ mergeParams: true });

//Show new comment form
router.get('/new', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});

// Comments create
router.post('/', isLoggedIn, (req, res) => {
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//SHOW EDIT COMMENT
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
		}
	});
});

//Update the comment
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Delete a comment
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
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
}

module.exports = router;
