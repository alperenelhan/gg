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

FlowRouter.route('/:roomId?', {
  name: "room",
  action: function () {
    BlazeLayout.render('layout', {
      main: 'game1'
    });
  }
});
