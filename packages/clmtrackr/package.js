Package.describe({
    name: 'kuke:clmtrackr',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript', 'client');
    api.addFiles('clmtrackr.js', 'client');
});

Package.onTest(function(api) {
    api.use('ecmascript', 'client');
    api.use('tinytest', 'client');
    api.use('kuke:clmtrackr', 'client');
    api.addFiles('clmtrackr-tests.js', 'client');
});
