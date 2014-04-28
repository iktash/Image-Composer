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

        $this->width = imagesx($this->image);
        $this->height = imagesy($this->image);
    }

    public function loadFromPath($image_path)
    {
        $this->image = imagecreatefromjpeg($image_path);

        $this->width = imagesx($this->image);
        $this->height = imagesy($this->image);
    }

    public function createImage($width, $height)
    {
        $this->image = imagecreatetruecolor($width, $height);

        $white = imagecolorallocate($this->image, 255, 255, 255);
        imagefill($this->image, 0, 0, $white);

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

    public function save($path)
    {
        $result = imagejpeg($this->image, $path, 100);

        if ($result) {
            chmod($path, 0777);
        }

        return $result;
    }
}