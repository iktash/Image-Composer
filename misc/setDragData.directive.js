app.directive("setDragData", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            elem.bind("dragstart", function(e) {
                e.dataTransfer.effectAllowed = 'copy';

                e.dataTransfer.setData("text/plain", attrs.setDragData);

                e.dataTransfer.setDragImage(elem[0], 0, 0);

                return true;
            });
        }
    }
});