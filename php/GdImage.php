<?php

class GdImage
{
    public $image;
    public $width;
    public $height;

    public function __construct($image_path = '')
    {
        if ($image_path) {
            $this->loadFromPath($image_path);
        }
    }

    public function loadFromString($image_string)
    {
        $this->image = imagecreatefromstring($image_string);

        if (! $this->image) {
            Error::respond("Can not load an image from string in " . __FILE__);
        }

        $this->setSize();
    }

    public function loadFromPath($image_path)
    {
        $this->image = imagecreatefromjpeg($image_path);

        if (! $this->image) {
            Error::respond("Can not load an image from file " . __FILE__);
        }

        $this->setSize();
    }

    public function setSize()
    {
        $this->width = imagesx($this->image);
        $this->height = imagesy($this->image);
    }

    public function createImage($width, $height)
    {
        $this->image = imagecreatetruecolor($width, $height);

        if (! $this->image) {
            Error::respond("Can not create new image in " . __FILE__);
        }

        $this->width = $width;

        $this->height = $height;
    }

    public function copyImage(GdImage $src_im, $x, $y)
    {
        return imagecopy(
            $this->image,
            $src_im->image,
            $x,
            $y,
            0,
            0,
            $src_im->width,
            $src_im->height
        );
    }

    public function resizeImageHeight($height)
    {
        $ratio = $this->height / $height;

        $new_image = imagecreatetruecolor($this->width / $ratio, $height);

        if (imagecopyresized(
            $new_image,
            $this->image,
            0,
            0,
            0,
            0,
            $this->width / $ratio,
            $height,
            $this->width,
            $this->height
        )) {
            $this->image = $new_image;

            $this->setSize();
        } else {
            Error::respond("Can not resize an image in " . __FILE__);
        }
    }

    public function save($path)
    {
        $result = imagejpeg($this->image, $path, 100);

        if ($result) {
            chmod($path, 0777);
        }

        return $result;
    }
}