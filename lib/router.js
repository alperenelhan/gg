if(Meteor.isClient) {
  BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
  name: 'home',
  action: function () {
    BlazeLayout.render('layout', {
      main: 'home'
    });
  }
});

FlowRouter.route('/rooms', {
	name: 'rooms',
	action: function() {
		BlazeLayout.render('layout', {
			main: 'rooms'
		});
	}
})
