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

    $image_path = $images_path_dir . hash("md5", $raw_data);
    if ($image->save($image_path)) {
        $saved_images[] = $image_path;
    }
}

die(json_encode($saved_images));
