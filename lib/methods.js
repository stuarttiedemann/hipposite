
thumbsUpClicked = false;
thumbsDownClicked =false;

Meteor.methods({
	addPost: function(newPost, owner){
		Posts.insert({
			newPosts: newPost,
			count: 0,
			createdAt: new Date(),
			owner: owner
		});
	},
	followPost: function(id, task,isItChecked, newFollowedPosts, setChecked){
		Posts.update(id,{$set:{checked:setChecked}});

		if(isItChecked == true){
			Liked.insert({
				postId: id,
				likedBy: Meteor.userId(),
				newPosts:newFollowedPosts,
				createdAt: new Date()
			});			
		}else{
				console.log(task._id);
				var doc = Liked.findOne({postId:task._id});
				Liked.remove({_id:doc._id});	
			}
	},
	thumbsUp: function(owner, id){
		if(owner !== Meteor.userId()){	 
		  Posts.update(id,{$inc:{count:+1}});	
		}else{
			FlashMessages.sendWarning("You Can't Like Your Own Post");
		}
	},
	thumbsDown: function(owner, id){
		if(owner !== Meteor.userId()){
		    Posts.update(id,{$inc:{count:-1}});	
		}else{
			FlashMessages.sendWarning("You Can't Like Your Own Post");
		}
	},
	deletePost: function(postId){
		var post = Posts.findOne(postId);
		if(post.owner !== Meteor.userId()){
			throw new Meteor.Error("Not-authorized");
		}
		Posts.remove(post._id);
	}
});