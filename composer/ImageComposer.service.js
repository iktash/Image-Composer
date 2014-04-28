app.service("ImageComposer", function($q, $http) {
    this.addImageTo = function(side, init_src, src) {
        var def = $q.defer();

        var data = {
            "side": side,
            "initial_image": init_src,
            "image": src
        };

        $http.post("php/add_image_to.php", data)
            .success(function(new_src) {
                console.log(new_src);
                def.resolve(new_src);
            })
            .error(function(error) {
                def.reject(error);
            });

        return def.promise;
    }
});