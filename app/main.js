require.config({
    baseUrl: '',
    paths: {
        'angular': 'lib/angular-1.3.0-beta.11/angular',
        'angular-route': 'lib/angular-1.3.0-beta.11/angular-route',
        'angularAMD': 'lib/angularAMD',
        'jquery': 'lib/jquery-2.1.1',
        'bootstrap': 'lib/bootstrap-3.1.1-dist'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular': ['jquery'],
        'bootstrap': ['jquery']
    },
    deps: ['app/app']
});