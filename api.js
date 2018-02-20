// using Restangular, ajax requests to /api/states and /api/customers?{filtercriteria}
angular.module('myApp')
	.factory('api', function(Restangular) {
		// prepend /api before making ajax request with Restangular
		RestangularProvider.setBaseUrl('/api');
		return {
			states: function () {
				return Restangular.all("states").getList();
			},
			customers: {
				search: function (query) {
					return Restangular.all('customers').getList(query);
				}
			},
		};
	});
