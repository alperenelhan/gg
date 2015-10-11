if (Meteor.isClient) {
    Template.home.onCreated(function() {
        var signallingChannelName = "test1";

        var rtcPeerConnectionConfig = {};

        // Config passed to getUserMedia()
        //
        // Could be null, then no media will be requested, i.e., for when you only
        // want data channels, or one way video/audio calls.

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
            stream,
            signallingChannelName,
            'master',
            servers,
            config,
            mediaConfig
        );

        // Creates the rtcPeerConnection
        webRTCSignaller.start();

        this._webRTCSignaller = webRTCSignaller;

        window.testwebrtc = webRTCSignaller;

        this._webRTCSignaller.createOffer();
    });

    Template.home.onDestroyed(function() {
        this._webRTCSignaller.stop();
    });

    Template.home.helpers({
        localStream: function() {
            return Template.instance()._webRTCSignaller.getLocalStream();
        },

        remoteStream: function() {
            return Template.instance()._webRTCSignaller.getRemoteStream();
        }
    });
}
