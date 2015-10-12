Meteor.startup(function() {

});

Template.stream.onCreated(function () {
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

  webRTCSignaller = SingleWebRTCSignallerFactory.create(
    Stream,
    FlowRouter.getParam("roomId"),
    'master',
    servers,
    config,
    mediaConfig
  );

  // Creates the rtcPeerConnection
  webRTCSignaller.start();
  //webRTCSignaller.startOnlyLocalStream();
});

Template.stream.helpers({
  roomId: function () {
    return FlowRouter.getParam("roomId");
  },

  localStream: function() {
    return webRTCSignaller.getLocalStream();
  },

  remoteStream: function() {
    return webRTCSignaller.getRemoteStream();
  }
});
