Template.home.helpers({
	posts: function(){
		return Posts.find({},{sort:{createdAt:-1}});
	},
	isOwner: function(){
		return this.owner === Meteor.userId();
	}
});

Template.home.events({
	'submit .submit-posts': function(event){
		var newPost = event.target.newPost.value;
		Meteor.call("addPost",newPost, Meteor.userId());
		event.target.newPost.value = '';
		return false;
	},
	'click .toggle-checked': function(){
		var id = this._id;
		var setChecked = !this.checked;
		var task = Posts.findOne(this._id);
		var isItChecked = $(event.target).prop('checked');
		var newFollowedPosts = this.newPosts;
	
		Meteor.call('followPost', id, task, isItChecked, newFollowedPosts, setChecked );
	},
	'click .delete': function(){
		Meteor.call("deletePost", this._id);
	},
	'click .thumbs-up': function(){
		var owner = this.owner;
		var id = this._id;
		Meteor.call('thumbsUp', owner, id);
	},
	'click .thumbs-down': function(){
		var owner = this.owner;
		var id = this._id;
		Meteor.call('thumbsDown', owner, id);
	}
});