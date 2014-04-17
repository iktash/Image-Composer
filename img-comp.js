var app = angular.module("image-composer", []);

app.controller('ComposerCtrl', function($scope, UploadImage) {
	$scope.images = [];

	$scope.uploadImages = function(e, el) {
		var promise = UploadImage.upload(e.target.files);
		promise.then(function(images) {
			$scope.images = $scope.images.concat(images);

			angular.element(el).val('');
		});
	}
});
