Template.layout.events({
  'click .start-game1': function () {
    var roomId = Random.id();
    FlowRouter.go('game1', {
      roomId: roomId
    });
  }
})
