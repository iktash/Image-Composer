app.directive("composerCanvas", function($window, ImageCanvas) {
    var resizeCanvas = function(canvas) {
        canvas.width = $window.innerWidth * 0.65;
        canvas.height = canvas.width * 0.5;
    }

    return {
        restrict: "E",
        replace: true,
        template: "<canvas></canvas>",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            raw_canvas = elem[0];

            resizeCanvas(raw_canvas);
            angular.element($window).bind('resize', function() {
                resizeCanvas(raw_canvas);
            });

            elem.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'copy';

                return false;
            });

            elem.bind('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                ImageCanvas.paintImage(raw_canvas, e.dataTransfer.getData('text/plain'));
                scope.$apply(function() {
                    ngModel.$setViewValue(ImageCanvas.getDownloadURL(raw_canvas));
                });
            });
        }
    }
});