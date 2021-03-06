'use strict';

require('jquery');
require('angular');
require('angular-route');
require('angular-animate');
require('angular-ui-bootstrap');
require('angulartics');
require('angulartics-piwik');
require('swfobject');
require('./common/filters/fileFilters.js');
require('./common/filters/stringFilters.js');
require('./common/directives/fileIcon.js');
require('./common/directives/progressBar.js');
require('./common/module.js');
require('./common/crypto.js');
require('./common/notifications.js');
require('./common/randomService.js');
require('./common/detectCrawlerService.js');
require('./common/dialog.js');
require('./common/loading.js');
require('./common/converterService.js');
require('./clipboard/module.js');
require('./clipboard/clipboardDirective.js');
require('./peering/peeringService.js');
require('./download/module.js');
require('./download/downloadController.js');
require('./download/downloadService.js');
require('./download/loadingIndicatorDirective.js');
require('./download/storageService.js');
require('./upload/module.js');
require('./upload/uploadController.js');
require('./upload/uploadService.js');
require('./upload/dropZoneDirective.js');
require('./static/module.js');
require('./static/static.js');
require('./static/slidingFileDirective.js');
require('./title/title.js');

var use = [
	'ngAnimate',
	'ngRoute',
	'upload',
	'static',
	'download',
	'titleController',
	'common',
	'angulartics',
	'angulartics.piwik'
];

angular.module('peertome', use, ['$compileProvider', function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|filesystem|blob):/);
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|filesystem|blob):|data:image\//);
}])
	// generated while bundling
	.constant('appEnv', APP_ENV)

	// generated while bundling
	.constant('config', APP_CONFIG)

	.config(['$routeProvider', '$locationProvider', '$analyticsProvider', 'appEnv', function ($routeProvider, $locationProvider, $analyticsProvider, appEnv) {
		$routeProvider
			.otherwise({
				templateUrl: 'html/static/page-404.html',
				controller: 'StaticCtrl'
			});

		$locationProvider.html5Mode(true);
		$analyticsProvider.virtualPageviews(false);
	}])
	.value('clipboardSwf', '/bower_components/reepio-paste-to-clipboard/bin/CopyToClipboard.swf')
	.value('clipboardExpressInstallSwf', '/bower_components/reepio-paste-to-clipboard/bin/expressInstall.swf')
	.run(['$rootScope', '$location', '$route', '$document', 'appEnv',
	function ($rootScope, $location, $route, $document, appEnv) {
		$rootScope.appEnv = appEnv;

		// init heise social share privacy plugin.
		var el = document.getElementById('socialshareprivacy');
		if(el){
			el.socialSharePrivacy({
				services : {
					facebook : {
						'perma_option' : 'off',
						'dummy_img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/dummy_facebook_en.png',
						'img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/facebook.png',
						'sharer': {
							'status': 	'on',
							'dummy_img':'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/dummy_facebook_share_en.png',
							'img' : 	'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/facebook_share_en.png'
						}
					},
					twitter : {
						'perma_option' : 'off',
						'dummy_img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/dummy_twitter.png',
						'img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/twitter.png'
					},
					gplus : {
						'perma_option' : 'off',
						'dummy_img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/dummy_gplus.png',
						'img' : 'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/gplus.png'
					}
				},
				'css_path'  : '',
				'lang_path' : 'bower_components/jquery.socialshareprivacy/lang/',
				'language'  : 'en',
				'uri'		: 'https://reep.io',
				'perma_orientation' : 'top'
			});
		}

		$rootScope.getIsPageActive = function (page) {
			if(page === '/d')
				return $location.path() === (page + '/' + $rootScope.downloadId);

			return $location.path() === page;
		};

		$rootScope.running = true;
}]);
