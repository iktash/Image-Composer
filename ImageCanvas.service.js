app.service("ImageCanvas", function() {
    this.paintImage = function(canvas, image_src) {
        var ctx = canvas.getContext("2d");
        
        var im = new Image();
        im.src = image_src;

        canvas.width = im.width;
        canvas.height = im.height;
        
        ctx.drawImage(im, 0, 0);
    }

    this.getDownloadURL = function(canvas) {
        return canvas.toDataURL();
    }
});