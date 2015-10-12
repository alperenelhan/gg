Meteor.startup(function() {
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
        'test',
        'master',
        servers,
        config,
        mediaConfig
    );

    // Creates the rtcPeerConnection
    webRTCSignaller.start();
    //webRTCSignaller.startOnlyLocalStream();
});

Template.layout.helpers({
    localStream: function() {
        return webRTCSignaller.getLocalStream();
    },

    remoteStream: function() {
        return webRTCSignaller.getRemoteStream();
    }
});

if (Meteor.isClient) {
    Template.layout.events({
        'click a.round': function (e) {
            value = 3000;
            var self = $(e.currentTarget);
            self.css({
                'transition' : 'all 2s ease-in-out'
            });

            self.bind("transitionend", function  (){
                FlowRouter.go('/rooms');
            });

            self.css({
              '-webkit-transform' : 'scale(' + value + ')',
              '-moz-transform'    : 'scale(' + value + ')',
              '-ms-transform'     : 'scale(' + value + ')',
              '-o-transform'      : 'scale(' + value + ')',
              'transform'         : 'scale(' + value + ')'
            });
        }
    });
}
