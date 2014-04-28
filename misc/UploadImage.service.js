app.service("UploadImage", function($q, $http) {
    this.upload = function(files) {
        var images = [];
        var deferred = $q.defer();
        var files_num = 0;

        for (var i = 0, f; f = files[i]; i++) {
            if (! f.type.match('image.*')) {
                continue;
            }

            files_num++;

            var reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);

                if (images.length == files_num) {
                    $http.post("php/upload_image.php", {data: images})
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(data) {
                            deferred.reject(data);
                        });
                }
            }
            reader.readAsDataURL(f);
        }

        return deferred.promise;
    }
});