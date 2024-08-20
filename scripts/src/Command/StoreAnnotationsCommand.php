<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\RestDb\RestDbClient;

#[AsCommand(
    name: 'app:store-annotations',
    description: 'Stores annotation data',
    hidden: false,
)]
class StoreAnnotationsCommand extends Command
{
    protected function configure(): void
    {
        $this
            ->addArgument('annotation_dir', InputArgument::REQUIRED, 'Path to the directory containing annotated data')
            ->addArgument('map_file', InputArgument::REQUIRED, 'Path to the map file')
            ->addArgument('restdb_file', InputArgument::REQUIRED, 'Path to the file containing disc data exported from restdb')
        ;
    }

    protected function getRestDbImageId(string $restDbFileName, array $mapFileData): array | string | null {
        $items = array_filter(
            $mapFileData,
            function ($item) use ($restDbFileName) {
                return $item  === $restDbFileName;
            }
        );

        if (count($items) === 1) {
            return array_key_first($items);
        }

        return null;
    }

    /**
     * Most likely don't need this. I might
     * @param array $restDbData
     * @return array
     */
    protected function getRestDbItemProperties(array $restDbData): array {
        $properties = [];

        foreach ($restDbData as $item) {
            $keys = array_keys($item);

            foreach($keys as $key) {
                if (!in_array($key, $properties)) {
                    $properties[] = $key;
                }
            }
        }

        return $properties;
    }

    protected function getRestDbItem(string $restDbImageId, array $restDbData): array {
        $items = array_filter(
            $restDbData,
             function ($restDbItem) use ($restDbImageId) {
                if (!isset($restDbItem['image'])) {
                    return null;
                }

                if (is_array($restDbItem['image'])) {
                    return in_array($restDbImageId, $restDbItem['image']);
                }

                return $restDbItem['image'] === $restDbImageId;
             }
        );

        return count($items) ? $items[array_key_first($items)] : [];
    }

    protected function storeData(
        array $restDbItem,
        array $annotatedData
    ): void {
        /*
         * The big question: Where?
         *
         * - supabase
         * - restdb (add a new column (annotatedData) to existing discs record
         */

    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $annotationDir = $input->getArgument('annotation_dir');
        $mapFile = $input->getArgument('map_file');
        $restdbFile = $input->getArgument('restdb_file');

        if (!is_dir($annotationDir)) {
            $output->writeln(sprintf('Invalid path %s. The provided directory does not exist.', $annotationDir));
            return Command::FAILURE;
        }

        if (!is_file($mapFile)) {
            $output->writeln(sprintf('Invalid path %s.  The provided file does not exist.', $mapFile));
            return Command::FAILURE;
        }

        if (!is_file($restdbFile)) {
            $output->writeln(sprintf('Invalid path %s.  The provided file does not exist.', $restdbFile));
            return Command::FAILURE;
        }


        /*
         * bc9a2da38137ce073347ba9f8d068626hades-pm.jpg
         *
         *
         * map.json:
         *
         *  "65252a70359af8250000b1e2": "bc9a2da38137ce073347ba9f8d068626hades-pm.jpg",
         *  ...
         *  ...
         *  ...
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
         *   ...
         *   ...
         *   ...
         */

        $restDbClient = new RestDbClient(getenv('SERVER_API_KEY'));

        $mapFileData =  json_decode(file_get_contents($mapFile), true);
        $restDbData =  json_decode(file_get_contents($restdbFile), true);

        $restDbItemProperties = $this->getRestDbItemProperties($restDbData);

        $files = scandir($annotationDir);

        $filteredAnnnotationFiles = array_values(array_filter($files, function ($file) use ($annotationDir) {
            return is_file($annotationDir . '/' . $file) && $file !== '.DS_Store';
        }));

        array_map(
            function ($file) use ($annotationDir, $mapFileData, $restDbData, $restDbClient) {

                $imageFileName = str_replace('.json', '', $file);

                $restDbImageId = $this->getRestDbImageId($imageFileName, $mapFileData);
                $restDbItem = $this->getRestDbItem($restDbImageId, $restDbData);
                $annotatedData = file_get_contents($annotationDir . '/' . $file);

                $restDbClient->save($restDbItem['_id'], $annotatedData);

            },
            $filteredAnnnotationFiles
        );

        return Command::SUCCESS;
    }
}

// /var/www/discs-v2/scripts/data/2023-10-20/annotations
// /var/www/discs-v2/scripts/map.json
// /var/www/discs-v2/scripts/testdb-8e20_discs.json

/*
 * Restdb data properties:
 *
 *     [0] => _id
    [1] => manufacturer
    [2] => color
    [3] => material
    [4] => name
    [5] => glide
    [6] => stability
    [7] => speed
    [8] => weight
    [9] => image
    [10] => type
    [11] => fade
    [12] => price
    [13] => _created
    [14] => _changed
    [15] => _createdby
    [16] => _changedby
    [17] => _version
    [18] => additional
    [19] => sold
    [20] => collection_item
    [21] => own_stamp
    [22] => for_sale
    [23] => missing
    [24] => broken
    [25] => sold_for
    [26] => glow
    [27] => dyeing_costs
    [28] => profit
    [29] => huk
    [30] => hole_in_one
    [31] => donated
    [32] => favourite
    [33] => in_the_bag
    [34] => missing_description
    [35] => HIO date
    [36] => sold_at
    [37] => Donation description
    [38] => price_status
    [39] => HIO description
    [40] => sold_to
    [41] => _recent_changed
 */
