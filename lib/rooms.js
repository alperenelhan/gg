Rooms = new Mongo.Collection('rooms');


Meteor.methods({
	'removeRoom': function (id, windowId) {
		Rooms.remove({
			_id: id,
			user1: windowId
		});
	}
})