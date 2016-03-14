Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

// Template.registerHelper('likesCount', function(total){
// 	if(total > 0){
// 		return total;
// 	}else{
// 		return 0;
// 	}
// });