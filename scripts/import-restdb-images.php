<?php

/**
 * This script downloads all images from restdb and stores them in `data/images-[date] directory`.
 *
 * Along with the images, a `map.json` file is created, that links all images with a specific restdb database record.
 *
 * Requirements:
 * - A `testdb-8e20_discs.json` file must be found in the `scripts` directory. It contains a list of all database records
 * found in the restdb database. This file is used for downloading images. This file can be downloaded form the restdb
 * admin page.
 */

$env = file_get_contents(__DIR__."/../.env");
$lines = explode("\n",$env);

foreach($lines as $line){
    preg_match("/([^#]+)\=(.*)/",$line,$matches);
    if(isset($matches[2])){
        putenv(trim($line));
    }
}

if (!getenv('SERVER_API_KEY') ) {
    die("Missing environment value SERVER_API_KEY\n");
}

$jsonFile = __DIR__ . '/testdb-8e20_discs.json';

if (!is_file($jsonFile)) {
    die("The input file testdb-8e20_discs.json is missing\n");
}

$d = new \DateTime();

$dataDir = __DIR__ . '/data';

$imageDir = $dataDir . sprintf('/images-%s', $d->format('Y-m-d'));

if (!is_dir($imageDir)) {
    mkdir($imageDir);
}
echo $imageDir;die;
$mapFile = $dataDir . '/map.json';

$mapJson = [];

$json = json_decode(file_get_contents($jsonFile), true);
$counts = [];


$i = 0;
foreach ($json as $item) {
  $i++;

  if ($i % 5 === 0) {
    echo sprintf("%d / %d\n", $i, count($json));
  }

  if (isset($item['image']) && !is_array($item['image'])) {
    $item['image'] = [$item['image']];
  }


  foreach ($item['image'] as $imageHash) {
    if (!$imageHash) {
      echo "No image hash provided\n";
      continue;
    }
      // get metadata

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, sprintf('https://testdb-8e20.restdb.io/media/%s/meta', $imageHash));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_HTTPHEADER, [
          sprintf('x-apikey: %x', getenv('SERVER_API_KEY'))
      ]);

      $metadataJson = curl_exec($ch);
      curl_close($ch);

    if ($metadataJson) {
      $metadata = json_decode($metadataJson, true);

      if (count($metadata)) {
        if ($metadata[0]['file']) {
          $imageName = $metadata[0]['file'];

          file_put_contents(
            sprintf('%s/%s', $imageDir, $imageName),
            file_get_contents(sprintf('https://testdb-8e20.restdb.io/media/%s', $imageHash))
          );

          $mapJson[$imageHash] = $imageName;
        } else {
          echo sprintf("No image name found for image hash %s", $imageHash);
          continue;
        }


      } else {
        echo sprintf("No valid metadata found for image hash %s", $imageHash);
        continue;
      }
    } else {
      echo sprintf("No metadata found for image hash %s\n", $imageHash);
      continue;
    }
  }

}

file_put_contents($mapFile, json_encode($mapJson));


