Game = {
  windowId: Random.id(),
  roomId: new ReactiveVar(),
  signaller: null,
  _depSignaller: new Tracker.Dependency(),

  updateSignaller: function() {
    if(Game.signaller) {
      Game.signaller.stop();
    }

    var mediaConfig = {
      video: true,
      audio: true
    };

    var servers = {
      iceServers: [{
        url: "stun:stun.1.google.com:19302"
      }]
    };

    var config = {};

    var signaller = SingleWebRTCSignallerFactory.create(
      Stream,
      Game.roomId.get(),
      'master',
      servers,
      config,
      mediaConfig
    );

    // Creates the rtcPeerConnection
    signaller.start();
    signaller.createOffer();
    
    Game.signaller = signaller;
    Game._depSignaller.changed();
  },

  getSignaller: function() {
    // depend on roomId
    Game._depSignaller.depend();
    return Game.signaller;
  }
};

Tracker.autorun(function() {
  var roomId = Game.roomId.get();
  if (roomId) {
    Game.updateSignaller();
  }
});

Template.registerHelper("Game", function () {
  return Game;
});
