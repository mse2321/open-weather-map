angular.module('OWMApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/cities/:city', {
			templateUrl: 'city.html',
			controller: 'CityCtrl',
			resolve: {
				city: function(ownCities, $route, $location) {
					var city = $route.current.params.city;
					if(ownCities.indexOf(city) === -1) {
						$location.path('/error')
						return;
					}
					return city;
				}
			}
		})
		.when('/error',  {
			template: '<p>Error - Page Not Found</p>'
		})
		.run(function($routeScope, $location){
			$rootScope.$on('$routeChangeError', function() {
				$location.path('/error');
			})
		});
		
	}])
	.value('ownCities', ['New York', 'Dallas', 'Chicago'])
	.controller('HomeCtrl', ['$scope', function($scope){
		//empty for noew
	}])
	.controller('CityCtrl', ['$scope', function($scope, city){
		$scope.city = city;
	}]);