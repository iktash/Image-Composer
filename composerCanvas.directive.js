app.directive("composerCanvas", function($window, ImageCanvas) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "composerCanvas.template.html",
        scope: {
            result: "="
        },
        controller: function($scope, $element) {
            $scope.setSize = function(jcanvas) {
                jcanvas.css({
                    'max-width': $window.innerWidth * 0.6 + 'px',
                    'max-height': $window.innerHeight * 0.3 + 'px'
                });
            }

            var raw_canvas = $element.find('canvas')[0];

            $scope.updateResultingImage = function() {
                $scope.$apply(function() {
                    $scope.result = ImageCanvas.getDownloadURL(raw_canvas);
                });
            }

            var droppedTo = function(side, e) {
                var image_src = e.dataTransfer.getData('text/plain');
                ImageCanvas.addImageTo(raw_canvas, image_src, side);
                $scope.updateResultingImage();
            }

            $scope.droppedLeft = function(e) {
                droppedTo('left', e);
            }
            $scope.droppedRight = function(e) {
                droppedTo('right', e);
            }
        },
        link: function (scope, elem, attrs) {
            var canvas = elem.find('canvas');
            var raw_canvas = canvas[0];

            scope.setSize(canvas);

            if (attrs.resize) {
                angular.element($window).bind('resize', function() {
                    scope.$apply(function() {
                        scope.setSize(canvas);
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
                scope.updateResultingImage();
            });
        }
    }
});