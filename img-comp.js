var app = angular.module("image-composer", []);

app.filter("pure_name", function() {
    return function(input) {
        input = input || '';

        var parts = input.split("/");

        return parts[parts.length - 1];
    }
});

app.controller('ComposerCtrl', function($scope, UploadImage) {
	$scope.step2 = false;
	$scope.step3 = false;
	$scope.images = [];
	$scope.resulting_image_url = '';

	$scope.$watch('images.length', function(new_value) {
		if (new_value > 0) {
			$scope.step2 = true;
		} else {
			$scope.step2 = false;
		}
	});

	$scope.$watch('resulting_image_url', function(new_value) {
		if (new_value != '') {
			$scope.step3 = true;
		} else {
			$scope.step3 = false;
		}
	});

	$scope.uploadImages = function(e, el) {
		var files = e.target.files || e.dataTransfer.files;
		var promise = UploadImage.upload(files);

		promise.then(function(images) {
			$scope.images = $scope.images.concat(images);

			if (el) {
				angular.element(el).val('');
			}

			if (! $scope.step3) {
				$scope.resulting_image_url = $scope.images[0];
			}
		});
	}

	$scope.openResultingImage = function() {
        url = $scope.resulting_image_url;
		window.open(url, '_blank');

		return false;
	}
});
