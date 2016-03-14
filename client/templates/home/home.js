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

		Posts.insert({
			newPosts: newPost,
			count: 0,
			createdAt: new Date(),
			owner: Meteor.userId()
		});
		event.target.newPost.value = '';
		return false;
	},
	'click .toggle-checked': function(){
		var task = Posts.findOne(this._id);
		console.log(task._id);
		Posts.update(this._id,{$set:{checked:!this.checked}});
		
		var isItChecked = $(event.target).prop('checked');
		console.log(isItChecked);
		if(isItChecked == true){
			Liked.insert({
				postId: this._id,
				likedBy: Meteor.userId(),
				newPosts:this.newPosts,
				createdAt: new Date()
			});
			
		}else{
				console.log(task._id);
				var doc = Liked.findOne({postId:task._id});
				Liked.remove({_id:doc._id});
				
			}
	},
	'click .liked': function(){

	},
	'click .delete': function(){
		Posts.remove(this._id);
	},
	'click .thumbs-up': function(){
		if(this.owner !== Meteor.userId()){
			Posts.update(this._id,{$inc:{count:+1}});
			event.target.classList.add('voted-up');
			
		}else{
			FlashMessages.sendWarning("You Can't Like Your Own Post");
		}
	},
	'click .thumbs-down': function(){
		if(this.owner !== Meteor.userId()){
			Posts.update(this._id,{$inc:{count:-1}});
			
		}else{
			FlashMessages.sendWarning("You Can't Like Your Own Post");
		}
	}
});