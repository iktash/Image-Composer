app.directive("composerImg", function($window) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "composer/composer-img.template.html",
        scope: {
            image: "=imgSrc"
        },
        controller: function($scope, $element, ImageComposer) {
            $scope.setSize = function(resize_width, resize_height) {
                var img = $element.find("img");
                img.css({
                    'max-width': $window.innerWidth * resize_width + 'px',
                    'max-height': $window.innerHeight * resize_height + 'px'
                });
            }

            var droppedTo = function(side, e) {
                var image_src = e.dataTransfer.getData('text/plain');

                ImageComposer.addImageTo(side, $scope.image, image_src)
                    .then(function(new_src) {
                        $scope.image = new_src;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

            $scope.droppedLeft = function(e) {
                droppedTo("left", e);
            }
            $scope.droppedRight = function(e) {
                droppedTo("right", e);
            }
        },
        link: function (scope, elem, attrs) {
            var resize_width = 0.7;
            if (attrs.resizeWidth) {
                resize_width = Number(attrs.resizeWidth);
            }

            var resize_height = 0.4;
            if (attrs.resizeHeight) {
                resize_height = Number(attrs.resizeHeight);
            }

            scope.setSize(resize_width, resize_height);

            if (attrs.resize) {
                angular.element($window).bind('resize', function() {
                    scope.$apply(function() {
                        scope.setSize(resize_width, resize_height);
                    });
                });
            }
        }
    }
});