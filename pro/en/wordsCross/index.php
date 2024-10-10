<?php
header('Access-Control-Allow-Origin: *');

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

$words = [];


if (file_exists('userProgress/'.$_POST['user']))
    $words = json_decode(file_get_contents('userProgress/'.$_POST['user']), 1);

if (!array_key_exists($_POST['word'], $words))
    $words[$_POST['word']] = 0;


if ($_POST['success'] == 'true')
    $words[$_POST['word']]++;
else
    $words[$_POST['word']]--;

file_put_contents('userProgress/'.$_POST['user'], json_encode($words));

echo 'ok';