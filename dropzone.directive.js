app.directive("dropzone", function(UploadImage) {
    return {
        restrict: "A",
        scope: {callback: '&dropzone'},
        link: function(scope, elem, attrs) {
            elem.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'copy';

                if (attrs.overClass) {
                    elem.addClass(attrs.overClass);
                }

                return false;
            });

            if (attrs.overClass) {
                elem.bind('dragleave', function(e) {
                    elem.removeClass(attrs.overClass);
                });
            }

            elem.bind('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (attrs.overClass) {
                    elem.removeClass(attrs.overClass);
                }

                var callback = scope.callback();
                callback(e);
            });
        }
    }
});