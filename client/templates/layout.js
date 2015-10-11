Meteor.startup(function () {
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
    'master',
    servers,
    config,
    mediaConfig
  );

  // Creates the rtcPeerConnection
  // webRTCSignaller.start();
  webRTCSignaller.startOnlyLocalStream();
});

Template.layout.helpers({
  localStream: function() {
    return webRTCSignaller.getLocalStream();
  },

  remoteStream: function() {
    return webRTCSignaller.getRemoteStream();
  }
});
