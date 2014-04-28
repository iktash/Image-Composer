<?php

require "config.php";

chdir($home_dir);

$postdata = file_get_contents("php://input");
$result = json_decode($postdata);

$result_img_src = $images_path_dir . "result" . time() . ".jpg";

$composer = new ImageComposer;
$composer->setInitialImage($result->initial_image);
$composer->addImageTo($result->side, $result->image, $result_img_src);

die($result_img_src);