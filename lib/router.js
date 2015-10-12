if(Meteor.isClient) {
  BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowRouter.go('/rooms');
  }
});

FlowRouter.route('/room/:roomId', {
  name: 'room',
  triggersEnter: [function () {
    Game.roomId.set(FlowRouter.getParam("roomId"));
  }],
  action: function () {
    BlazeLayout.render('layout', {
			main: 'rooms'
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
});
