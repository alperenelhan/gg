Template.layout.onCreated(function() {
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

  var webRTCSignaller = SingleWebRTCSignallerFactory.create(
    'master',
    servers,
    config,
    mediaConfig
  );

  // Creates the rtcPeerConnection
  // webRTCSignaller.start();
  webRTCSignaller.startOnlyLocalStream();

  this._webRTCSignaller = webRTCSignaller;

  window.testwebrtc = webRTCSignaller;

  // this._webRTCSignaller.createOffer();
});

Template.layout.helpers({
  localStream: function() {
    return Template.instance()._webRTCSignaller.getLocalStream();
  },

  remoteStream: function() {
    return Template.instance()._webRTCSignaller.getRemoteStream();
  }
});
