Template.rooms.helpers({
  availableRooms: function () {
    return Rooms.find({
      user2: null
    });
  }
});

Template.rooms.events({
  "click .btn-join": function (e, tpl) {
    Game.roomId.set(this._id);
    Rooms.update(this._id, {
      $set: {
        user2: Game.windowId
      }
    });
  }
})
