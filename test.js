stream = new Meteor.Stream('signaling');

if (Meteor.isServer) {
    var allowAll = function() {
        return true;
    };
    stream.permissions.read(allowAll);
    stream.permissions.write(allowAll);
}

if (Meteor.isClient) {



}
