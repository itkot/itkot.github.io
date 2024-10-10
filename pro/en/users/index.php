<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

$userStats = [];
if (!array_key_exists('user', $_POST))
    exit;

if (file_exists('userProgress/'.$_POST['user']))
    $userStats = json_decode(file_get_contents('userProgress/'.$_POST['user']), 1);




$today = (new DateTime())->format("y-n-j");
if (!array_key_exists($today, $userStats))
    $userStats[$today] = ['passed' => 0, 'points' => 0];

echo $today;


if (!array_key_exists('testPassed', $userStats))
    $userStats['testPassed'] = 0;


if (!array_key_exists('points', $userStats))
    $userStats['points'] = 0;


if ($_POST['success'] == 'true'){
    $userStats['points']++;
    $userStats[$today]['points']++;
}
    
$userStats['testPassed']++;
$userStats[$today]['passed']++;


file_put_contents('userProgress/'.$_POST['user'], json_encode($userStats));