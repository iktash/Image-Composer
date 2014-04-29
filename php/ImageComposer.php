<?php

class ImageComposer
{
    protected $initial_image;

    public function setInitialImage($image_path)
    {
        $this->initial_image = $image_path;
    }

    public function addImageTo($side, $image_path, $result_path)
    {
        $init_image = new GdImage($this->initial_image);
        $new_image = new GdImage($image_path);
        
        $min_height = self::getMin($init_image->height, $new_image->height);

        $init_image->resizeImageHeight($min_height);
        $new_image->resizeImageHeight($min_height);

        $res_image = new GdImage();
        $res_image->createImage($init_image->width + $new_image->width, $min_height);

        if ($side == "right") {
            $left_image = $init_image;
            $right_image = $new_image;
        } else {
            $left_image = $new_image;
            $right_image = $init_image;
        }

        $y = self::getMiddlePos($res_image->height, $left_image->height);
        if (! $res_image->copyImage($left_image, 0, $y)) {
            Error::respond("Can not copy left image in " . __FILE__);
        }

        $y = self::getMiddlePos($res_image->height, $right_image->height);
        if (! $res_image->copyImage($right_image, $left_image->width, $y)) {
            Error::respond("Can not copy right image in " . __FILE__);
        }

        $res_image->save($result_path);
    }

    public static function getMiddlePos($range, $distance)
    {
        return ($range - $distance) * 0.5;
    }

    public static function getMin($val1, $val2)
    {
        if ($val1 < $val2) {
            return $val1;
        } else {
            return $val2;
        }
    }
}