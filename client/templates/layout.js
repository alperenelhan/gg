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
