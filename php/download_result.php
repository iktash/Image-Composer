<?php

require "config.php";

chdir($home_dir);

$filename = $_GET['name'];

$filepath = $images_path_dir . $filename;

removeFilesExcept($images_path_dir, "result*", $filepath);

$contents = file_get_contents($filepath);

header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");

header("Cache-Control: must-revalidate, post-check=0, pre-check=0");

header("Content-Transfer-Encoding: binary");
header("Content-Length: " . strlen($contents));
header("Content-Disposition: attachment; filename=resulting_image.jpg");

echo $contents;


function removeFilesExcept($dir, $rule, $except)
{
    $files = glob($dir . $rule);

    foreach ($files as $file) {
        if ($file == $except) {
            continue;
        }

        unlink($file);
    }
}