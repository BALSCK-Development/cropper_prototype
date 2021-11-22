<?php
$post = file_get_contents('php://input');
$data = json_decode($post);

$filePath = "/var/www/html/root/heishi/images/";

$file = $filePath . md5(uniqid()) . $data->type;

$uri = substr($data->thumbnail, strpos($data->thumbnail, ","));

$result = file_put_contents($file, base64_decode($uri));

$response = array(
    "filePath" => $file,
    "result" => $result,
//    "status" => "data array empty",
//    "error" => true,
);
echo json_encode($response);
