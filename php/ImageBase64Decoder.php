<?php

class ImageBase64Decoder
{
    public static function decode($image_base64_data)
    {
        $pos = strpos($image_base64_data, "base64,");
        $data = substr($image_base64_data, $pos + 7);

        return base64_decode($data);
    }
}