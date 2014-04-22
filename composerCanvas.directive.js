app.directive("composerCanvas", function($window) {
    var resizeCanvas = function(canvas) {
        canvas[0].width = $window.innerWidth * 0.7;
        canvas[0].height = canvas[0].width * 0.5;
    }

    var placeText = function(canvas, text) {
        var ctx = canvas[0].getContext("2d");
        
        var canvasWidth = canvas[0].width;
        var canvasHeight = canvas[0].height;

        ctx.font = "1em serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "White";
        ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
    }

    return {
        restrict: "E",
        replace: true,
        template: "<canvas></canvas>",
        link: function (scope, elem, attrs) {
            var initCanvas = function() {
                resizeCanvas(elem);
                if (attrs.text) {
                    placeText(elem, attrs.text);
                }
            }

            initCanvas();
            angular.element($window).bind('resize', function() {
                initCanvas();
            });

            
        }
    }
});