Stream = new Meteor.Stream('signaling');

if (Meteor.isServer) {
    var allowAll = function() {
        return true;
    };
    Stream.permissions.read(allowAll);
    Stream.permissions.write(allowAll);
}
