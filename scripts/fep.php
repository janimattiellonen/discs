<?php


$fep = file_get_contents(__DIR__ . '/fep.json');

//print_r(json_decode($fep, true));


$file2 = file_get_contents(__DIR__ . '/data/2023-10-20/annotations/0160a30d16d47a6b004df49ca4e6379acloudbreaker-lightblue.jpg.json');
$dd = json_decode($file2, true);

print_r(json_decode($dd['label'], true));
