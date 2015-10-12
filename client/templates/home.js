Template.layout.events({
    'click a.round': function (e) {
        value = 3000;
        var self = $(e.currentTarget);
        self.css({
            'transition' : 'all 2s ease-in-out'
        });

        Game.isReady.set(true);

        self.bind("transitionend", function  (){

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
