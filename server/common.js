Meteor.publish('posts', function(){
	return Posts.find();
});

Meteor.publish('liked', function(){
	return Liked.find();
});
