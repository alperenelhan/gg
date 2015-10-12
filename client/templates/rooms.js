Template.rooms.helpers({
    availableRooms: function() {
        return Rooms.find({
            user2: null
        }, {
            sort : {"createdAt": -1}
        });
    }
});

Template.rooms.events({
    "click .btn-join": function(e, tpl) {
        Game.roomId.set(this._id);
        Rooms.update(this._id, {
            $set: {
                user2: Game.windowId
            }
        });
    },
    "submit #create-room-form": function (e) {
        e.preventDefault();

        var roomName = e.target.roomname.value;

        var id = Rooms.insert({
            "name": roomName,
            "user1": Game.windowId,
            "createdAt": new Date()
        });

        FlowRouter.go("/room/" + id);
    },
    "click .room-item": function (e) {
        FlowRouter.go("/room/" + this._id);
    }
})
