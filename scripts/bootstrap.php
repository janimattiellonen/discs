#!/usr/bin/env php
<?php

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

require __DIR__.'/../vendor/autoload.php';

use Symfony\Component\Console\Application;

use App\Command\AnnotateImagesCommand;
use App\Command\GetDiscPropertiesCommand;
use App\Command\StoreAnnotationsCommand;

$application = new Application();

$application->add(new AnnotateImagesCommand());
$application->add(new GetDiscPropertiesCommand());
$application->add(new StoreAnnotationsCommand());

$application->run();
