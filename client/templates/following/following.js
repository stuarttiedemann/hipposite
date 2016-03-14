Template.following.helpers({
	posts: function(){
		return Liked.find({},{sort:{createdAt:-1}});
	}
});