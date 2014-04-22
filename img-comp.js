var app = angular.module("image-composer", []);

app.controller('ComposerCtrl', function($scope, UploadImage) {
	$scope.images = [];

	$scope.uploadImages = function(e, el) {
		var files = e.target.files || e.dataTransfer.files;
		var promise = UploadImage.upload(files);
		promise.then(function(images) {
			$scope.images = $scope.images.concat(images);

			if (el) {
				angular.element(el).val('');
			}
		});
	}
});
