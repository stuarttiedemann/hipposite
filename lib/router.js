
FlowRouter.route('/',{
	action(){
		BlazeLayout.render('mainlayout',{main: 'home'});
	},
	name: 'home'
});

FlowRouter.route('/about',{
	action(){
		BlazeLayout.render('mainlayout',{main: 'about'});
	},
	name: 'about'
});

FlowRouter.route('/following',{
	action(){
		BlazeLayout.render('mainlayout',{main: 'following'});
	},
	name: 'following'
});

