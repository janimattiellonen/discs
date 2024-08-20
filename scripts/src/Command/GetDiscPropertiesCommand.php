<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:get-disc-properties',
    description: 'Gets all disc properties found in the restdb data file',
    hidden: false,
)]
class GetDiscPropertiesCommand extends Command
{
    protected function configure(): void
    {
        $this
            ->addArgument('restdb_file', InputArgument::REQUIRED, 'Path to the file containing disc data exported from restdb')
        ;


    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $restdbFile = $input->getArgument('restdb_file');

        if (!is_file($restdbFile)) {
            $output->writeln(sprintf('Invalid path %s.  The provided file does not exist.', $restdbFile));
            return Command::FAILURE;
        }

        $contents = json_decode(file_get_contents($restdbFile), true);

        $properties = [];

        foreach ($contents as $item) {
            $keys = array_keys($item);

            foreach($keys as $key) {
                if (!in_array($key, $properties)) {
                    $properties[] = $key;
                }
            }
        }

        print_r($properties);

        return Command::SUCCESS;
    }
}
