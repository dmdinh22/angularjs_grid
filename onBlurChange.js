angular.module('myApp').directive('onBlurChange', function ($parse) {
	return function(scope, element, attr) {
		var func = $parse(attr['onBlurChange']);
		var hasChanged = false;
		element.on('change', function(event) {
			hasChanged = true;
		});

		element.on('blur', function(event) {
			if (hasChanged) {
				scope.$apply(function() {
					func(scope, {$event: event});
				});
				hasChanged = false;
			}
		});
	};
});


