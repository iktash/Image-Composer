app.directive("composerCanvas", function($window, ImageCanvas) {
    var setSize = function(jcanvas) {
        jcanvas.css({
            'max-width': '70%',
            'max-height': $window.innerHeight * 0.6 + 'px'
        });
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

            setSize(elem);

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