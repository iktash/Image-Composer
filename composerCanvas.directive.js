app.directive("composerCanvas", function($window, ImageCanvas) {
    var setSize = function(jcanvas) {
        jcanvas.css({
            'max-width': $window.innerWidth * 0.6 + 'px',
            'max-height': $window.innerHeight * 0.3 + 'px'
        });
    }

    return {
        restrict: "E",
        replace: true,
        templateUrl: "composerCanvas.template.html",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            var canvas = elem.find('canvas');
            var raw_canvas = canvas[0];

            setSize(canvas);

            if (attrs.resize) {
                angular.element($window).bind('resize', function() {
                    scope.$apply(function() {
                        setSize(canvas);
                    });
                });
            }

            elem.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'copy';

                return false;
            });

            canvas.bind('drop', function(e) {
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