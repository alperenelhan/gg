if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        FlowRouter.go('/rooms');
    }
});

FlowRouter.route('/room/:roomId', {
    name: 'room',
    action: function() {
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

if (Meteor.isClient) {
    Meteor.startup(function() {
        Tracker.autorun(function() {
            var roomId = FlowRouter.getParam("roomId");
            Meteor.defer(function() {
                Game.roomId.set(roomId);
            });
        });
    })
}
