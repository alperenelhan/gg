var WIDTH = 400;
var HEIGHT = 300;

Game = {
  windowId: Random.id(),
  roomId: new ReactiveVar(null),
  signaller: null,
  _depSignaller: new Tracker.Dependency(),

  isReady: new ReactiveVar(false),

  tracker: null,
  isTrackerRunning: new ReactiveVar(false),

  _localVid: null,
  _localCC: null,
  _remoteVid: null,
  _remoteCC: null,

  _currentTarget: new ReactiveVar(null),
  _localMax: 0,
  _remoteMax: 0,

  init: function () {
    var tracker = new CT.clm.tracker({useWebGL : true});
    tracker.init(CT.pModel);

    Game.tracker = tracker;
  },

  takeSS: function (vid, cc) {
    vid && cc && cc.drawImage(vid, 0, 0, WIDTH, HEIGHT);
  },

  updateSS: function () {
    Game.takeSS(Game._localVid, Game._localCC);
    Game.takeSS(Game._remoteVid, Game._remoteCC);
  },

  randomTarget: function () {
    Game._currentTarget.set(Random.choice(['angry', 'sad', 'surprised', 'happy']));
    Game._localMax = 0;
    Game._remoteMax = 0;
  },

  startTracker: function () {
    if(Game.isTrackerRunning.get()) {
      return;
    }
    var tracker = Game.tracker;
    var overlay = $('#tracker-overlay')[0];
    var context = overlay.getContext('2d');
    var vid = $('#local-stream video')[0];

    Game._localVid = vid;
    Game._remoteVid = vid;
    Game._localCC = $('#local-ss')[0].getContext('2d');
    Game._remoteCC = $('#remote-ss')[0].getContext('2d');

    tracker.start(vid);

    var ec = new CT.emotionClassifier();
		ec.init(CT.emotionModel);
		var emotionData = ec.getBlank();

    setInterval(function () {
      Game.randomTarget();
    }, 3000);

    Game.randomTarget();

    var drawLoop = function () {
      var currentTarget = Game._currentTarget.get();
      // console.log('position: ', tracker.getCurrentPosition());
			context.clearRect(0, 0, WIDTH, HEIGHT);
			//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
      // debugger
			if (tracker.getCurrentPosition()) {
				tracker.draw(overlay);
			}
			var cp = tracker.getCurrentParameters();

      if(currentTarget) {
        var er = ec.meanPredict(cp);
        if(er) {
          var r = _.findWhere(er, {
            emotion: currentTarget
          });

          if(r && r.value) {
            if(r.value >= Game._localMax) {
              Game._localMax = r.value;
              Game.takeSS(Game._localVid, Game._localCC);
            }

            if(r.value >= Game._remoteMax) {
              Game._remoteMax = r.value;
              Game.takeSS(Game._remoteVid, Game._remoteCC);
            }
          }
        }
      }

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

Tracker.autorun(function () {
  console.log('currentTarget: ', Game._currentTarget.get());
});

Template.registerHelper("Game", function () {
  return Game;
});
