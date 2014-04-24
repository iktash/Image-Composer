var app = angular.module("image-composer", []);

app.controller('ComposerCtrl', function($scope, UploadImage, ImageCanvas) {
	$scope.step2 = false;
	$scope.step3 = false;
	$scope.images = [];
	$scope.resulting_image_url = '';
	$scope.resulting_resolution = {};

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

			var im = new Image();
			im.src = new_value;
			$scope.resulting_resolution = {
				width: im.width,
				height: im.height
			}
		} else {
			$scope.step3 = false;
		}
	});

	var putFirstImageOnCanvas = function(image_src) {
		var canvases = document.getElementsByTagName('canvas');
		
		ImageCanvas.paintImage(canvases[0], image_src);

		$scope.resulting_image_url = ImageCanvas.getDownloadURL(canvases[0]);
	}

	$scope.uploadImages = function(e, el) {
		var files = e.target.files || e.dataTransfer.files;
		var promise = UploadImage.upload(files);

		promise.then(function(images) {
			$scope.images = $scope.images.concat(images);

			if (el) {
				angular.element(el).val('');
			}

			if (! $scope.step3) {
				putFirstImageOnCanvas($scope.images[0]);
			}
		});
	}

	$scope.openResultingImage = function() {
        url = $scope.resulting_image_url;
		window.open(url, '_blank');

		return false;
	}
});
