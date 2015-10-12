Game = {
  windowId: Random.id(),
  roomId: new ReactiveVar(null),
  signaller: null,
  _depSignaller: new Tracker.Dependency(),

  isReady: new ReactiveVar(false),

  setSignaller: function(channelId) {
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
      channelId,
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
  var isReady = Game.isReady.get();
  var channelId = roomId || Game.windowId;
  if(isReady) {
    Meteor.defer(function () {
      Game.setSignaller(channelId);
    });
  }
});

Template.registerHelper("Game", function () {
  return Game;
});
