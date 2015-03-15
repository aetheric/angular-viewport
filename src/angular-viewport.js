(function() {
	'use strict';

	var VIEWPORT_WIDTH = 'width';
	var VIEWPORT_WIDTH_DEVICE = 'device-width';
	var VIEWPORT_SCALE_MIN = 'minimum-scale';
	var VIEWPORT_SCALE_MAX = 'maximum-scale';
	var VIEWPORT_SCALE_INIT = 'initial-scale';
	var VIEWPORT_SCALE_USER = 'user-scalable';

	function construct(angular) {

		var module = angular.module('angular-viewport', []);

		module.provider('viewport', [
			function() {

				this.$get = [
					'$rootScope',
					function($rootScope) {

						var $scope = $rootScope.createScope();


						return {

							bounce: function() {
								$scope[VIEWPORT_SCALE_USER] = 'no';
								$scope[VIEWPORT_SCALE_MAX] = '1';
								$timeout(function() {
									$scope[VIEWPORT_SCALE_USER] = 'yes';
									$scope[VIEWPORT_SCALE_MAX] = null;
								}, 100);
							}

						};

					}
				];

			}
		]);

		module.directive('meta', [
			function() {

				return {
				};
			}
		]);

		module.run([
			'$rootScope', 'viewport',
			function($rootScope, viewport) {

				$rootScope.$on('$stateChangeStart', viewport.bounce);
				$rootScope.$on(viewport.EVENT_BOUNCE, viewport.bounce);

			}
		]);

	}
	
	if (require && module) {
		return construct(require('angular'));
	}
	
	if (define) {
		return define('angular', construct);
	}

	return construct(window.angular);

})();
