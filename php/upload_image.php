<?php

require 'config.php';

chdir($home_dir);

$postdata = file_get_contents("php://input");
$result = json_decode($postdata);

$saved_images = [];
foreach ($result->data as $image_data) {
    $raw_data = ImageBase64Decoder::decode($image_data);

    $image = new GdImage;
    $image->loadFromString($raw_data);

    $image_path = $images_path_dir . hash("md5", $raw_data) . ".jpg";
    if ($image->save($image_path)) {
        $saved_images[] = $image_path;
    } else {
        Error::respond("Can not save an image in " . __FILE__);
    }
}

die(json_encode($saved_images));
