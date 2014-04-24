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

    this.addImageTo = function(canvas, image_src, side) {
        var ctx = canvas.getContext("2d");

        var im = new Image();
        im.src = image_src;

        var id = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        if (side == "right") {
            var x = canvas.width;
            var old_x = 0;            
            canvas.width = canvas.width + im.width;
            if (canvas.height < im.height) {
                canvas.height = im. height;
            }
            var y = (canvas.height - im.height) * 0.5;
            var old_y = (canvas.height - id.height) * 0.5;
        } else if (side == "left") {
            x = 0;
            old_x = im.width;
            canvas.width = canvas.width + im.width;
            if (canvas.height < im.height) {
                canvas.height = im. height;
            }
            var y = (canvas.height - im.height) * 0.5;
            var old_y = (canvas.height - id.height) * 0.5;
        }

        ctx.putImageData(id, old_x, old_y);
        ctx.drawImage(im, x, y);
    }
});