app.directive("composerImg", function($window) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "composer/composer-img.template.html",
        scope: {
            image: "=imgSrc"
        },
        controller: function($scope, ImageComposer) {
            $scope.setSize = function(jimg) {
                jimg.css({
                    'max-width': $window.innerWidth * 0.6 + 'px',
                    'max-height': $window.innerHeight * 0.3 + 'px'
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
            var img = elem.find('img');

            scope.setSize(img);

            if (attrs.resize) {
                angular.element($window).bind('resize', function() {
                    scope.$apply(function() {
                        scope.setSize(img);
                    });
                });
            }
        }
    }
});