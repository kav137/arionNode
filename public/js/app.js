"use strict"
//init charts and then bootstrap the app
//TODO: offline mode


/*polyfill (required??)*/
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
}

/**
* app Module
*
* aggregator for all the modules
*/
angular.module('app', [
		'ngRoute', 'pascalprecht.translate', 
		'app-core', 
		'app-editor', 
		'app-math', 
		'app-header',
		'app-i18n',
		'app-ui', 
		'app-utils', 
		'app-charts'])
	.run(['$log', '$rootScope', function ($log, $rootScope){
		$log.info('application initialized successfully');
		$rootScope.$broadcast('appInitialized')
	}])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/',
		{
			templateUrl : "templates/mainView.html"
		})
		.otherwise({
			redirectTo: '/'
		})
	}])

	.config(['$translateProvider', function($translateProvider) {
		
	}])


try{
	google.load('visualization', '1', {
		packages: ['corechart']
	});

	google.setOnLoadCallback(function() {
		console.info(`Online mode`);
		console.log("Charts initialized successfully")
		console.log("Starting the app...")
		angular.bootstrap(document.body, ['app']);
	})
}
catch (e){
	console.info(`offline mode`);
	setTimeout(function() {
		angular.bootstrap(document.body, ['app']);
	}, 500);
}
