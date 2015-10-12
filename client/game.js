Game = {
  windowId: Random.id(),
  roomId: new ReactiveVar(null),
  signaller: null,
  _depSignaller: new Tracker.Dependency(),

  isReady: new ReactiveVar(false),

  tracker: null,
  isTrackerRunning: new ReactiveVar(false),

  init: function () {
    var tracker = new CT.clm.tracker({useWebGL : true});
    tracker.init(CT.pModel);

    Game.tracker = tracker;
  },

  startTracker: function () {
    if(Game.isTrackerRunning.get()) {
      return;
    }
    var tracker = Game.tracker;
    var overlay = $('#tracker-overlay')[0];
    var context = overlay.getContext('2d');
    var vid = $('#local-stream video')[0];

    var ec = new CT.emotionClassifier();
		ec.init(CT.emotionModel);
		var emotionData = ec.getBlank();

    var drawLoop = function () {
      console.log('drawing');
			context.clearRect(0, 0, 200, 150);
			//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
      // debugger
			if (tracker.getCurrentPosition()) {
				tracker.draw(overlay);
			}
			var cp = tracker.getCurrentParameters();

			var er = ec.meanPredict(cp);
			// if (er) {
			// 	updateData(er);
			// 	for (var i = 0;i < er.length;i++) {
			// 		if (er[i].value > 0.4) {
			// 			document.getElementById('icon'+(i+1)).style.visibility = 'visible';
			// 		} else {
			// 			document.getElementById('icon'+(i+1)).style.visibility = 'hidden';
			// 		}
			// 	}
			// }

      if(Game.isTrackerRunning.get()) {
        Game._trackerAnimId = requestAnimFrame(drawLoop);
      }
		}

		Game.isTrackerRunning.set(true);
    drawLoop();
  },

  stopTracker: function () {
    Game.isTrackerRunning.set(false);
  },

  setSignaller: function(channelId) {
    if(Game.signaller) {
      Game.signaller.stop();
    }

    var mediaConfig = {
      video: true
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

Meteor.startup(function () {
  Game.init();
});

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
