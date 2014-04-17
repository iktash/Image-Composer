app.directive("dropzone", function(UploadImage) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            elem.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'copy';

                elem.addClass('bg--over');

                return false;
            });

            elem.bind('dragleave', function(e) {
                elem.removeClass('bg--over');
            });

            elem.bind('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                elem.removeClass('bg--over');

                var promise = UploadImage.upload(e.dataTransfer.files);
                promise.then(function(images) {
                    scope.images = scope.images.concat(images);
                });
            });
        }
    }
});