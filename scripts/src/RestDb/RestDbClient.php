<?php

namespace App\RestDb;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

use GuzzleHttp\Client;

class RestDbClient
{
    private string $apiKey;

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function save(string $id, string $annotatedData): void {

        try {

            //$client = new Client(["base_uri" => "https://testdb-8e20.restdb.io/"]);
            //$client->request("GET", "rest/discs/63ede884e8f589520000ded0?apikey=601d569b14fdf85500ab3623959eb3932dab5");

            $client = HttpClient::create([
                'headers' => [
                    'cache-control' => 'no-cache',
                    'x-apikey' => $this->apiKey,
                    'content-type' => 'application/json'
                ]
            ]);
            $response = $client->request(
                'POST',
                "https://testdb-8e20.restdb.io/rest/image-annotations",
                 ['body' => ['disc_id' => $id, 'data' => $annotatedData]]

            );

            //print_r($response->getContent());


        } catch (\Exception $e) {

            die($e->getMessage() . ": " . $e->getTraceAsString());
        }

    }
}
