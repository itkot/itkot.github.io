<?php
$url = 'http://itkot/pro/en/words';
$data = ['user' => '0', 'word' => 'house', 'success' => true];

$options = [
    'http' => [// use key 'http' even if you send the request to https://...
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === false) {
    /* Handle error */
}

echo $result;