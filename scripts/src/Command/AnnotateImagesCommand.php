<?php
/**
 * This script sends images to Cloud Vision Api for metadata retrieval
 *
 * Requirements:
 *
 * This script takes the following arguments:
 * - path to image directory, where the source images are located
 * - path to map file (json), that contains information on how image files are mapped to image data in restdb
 * - output directory, where the annotated data will be stored as json files
 */

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\CloudVisionClient;

#[AsCommand(
    name: 'app:annotate-images',
    description: 'Annotates images using CLoud Vision Api',
    hidden: false,
)]
class AnnotateImagesCommand extends Command
{
    protected static $defaultDescription = 'Annotates images using Cloud Vision Api';

    protected function configure(): void
    {
        $this
            ->addArgument('image_dir', InputArgument::REQUIRED, 'Path to the directory containing all images to be annotated')
            ->addArgument('map_file', InputArgument::REQUIRED, 'Path to the map file')
            ->addArgument('output_dir', InputArgument::REQUIRED, 'Path to the directory where to store the annotated data (as a json file')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $imageDir = $input->getArgument('image_dir');
        $outputDir = $input->getArgument('output_dir');

        if (!is_dir($outputDir)) {
            mkdir($outputDir);
        }

        // $client = new CloudVisionClient();

        $files = scandir($imageDir);

        $filtered = array_values(array_filter($files, function ($file) use ($imageDir) {
            return is_file($imageDir . '/' . $file) && $file !== '.DS_Store';
        }));

        array_map(function ($file) use ($imageDir, $outputDir) {
            $client = new CloudVisionClient();
            $response = $client->annotateImage($imageDir . '/' . $file);

            $metadataFile = "$file.json";

            /*
             * map.json:
             *
             *  "65252b2f359af8250000b1e6": "421876b682862f21707dda856b55669dhades-green-mcbeth-6x.jpg",
             *  "65252a70359af8250000b1e2": "bc9a2da38137ce073347ba9f8d068626hades-pm.jpg",
             *
             * testdb-8e20_discs.json:
             *   {
             *       "_id": "65252aa0359af8250000b1e4",
             *       "manufacturer": "Discraft",
             *       "color": "Turquoise",
             *       "material": "ESP",
             *       "name": "Hades",
             *       "glide": 6,
             *       "stability": -3,
             *       "speed": 12,
             *       "weight": 170,
             *       "image": [
             *         "65252a70359af8250000b1e2"
             *       ],
             *       "type": "Distance driver",
             *       "fade": "2",
             *       "price": "0",
             *       "_created": "2023-10-10T10:42:40.301Z",
             *       "_changed": "2023-10-10T10:42:40.301Z",
             *       "_createdby": "janimatti.ellonen@gmail.com",
             *       "_changedby": "janimatti.ellonen@gmail.com",
             *       "_version": 0
             *   },
             */


            file_put_contents(sprintf('%s/%s', $outputDir, $metadataFile), json_encode($response));
        }, $filtered);
/*
        //$response = $client->annotateImage($imageDir . '/' . $filtered[0]);
        //print_r($response);die;

        file_put_contents($outputDir . '/output-label.json', $response['label']);
        file_put_contents($outputDir . '/output-image-properties.json', $response['imageProperties']);
        file_put_contents($outputDir . '/output-text.json', $response['text']);



        //$output->writeln($response);

        //$output->writeln(sprintf('Hello %s', $input->getArgument('image_dir')));
        */
        return Command::SUCCESS;
    }
}
