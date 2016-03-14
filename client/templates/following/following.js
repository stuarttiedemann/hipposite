Template.following.helpers({
	isOwner: function(){
		return this.owner === Meteor.userId();
	},
	posts: function(){

		return Liked.find({likedBy:Meteor.userId()},{sort:{createdAt:-1}});
	}
});