<?php

namespace App;

use Google\Cloud\Vision\V1\Feature\Type;
use Google\Cloud\Vision\V1\ImageAnnotatorClient;
use Google\Cloud\Vision\V1\Likelihood;



class CloudVisionClient
{
    public function annotateImage(string $imagePath): array {

        // return include 'faked-response.php';


        $imageResource = file_get_contents($imagePath);

        $client = new ImageAnnotatorClient();
        // $image = $client->createImageObject($imageResource);
        $labelResponse = $client->labelDetection($imageResource);
        $imagePropertiesResponse = $client->imagePropertiesDetection($imageResource);
        $textResponse = $client->textDetection($imageResource);

        return [
            'label' => $labelResponse->serializeToJsonString(),
            'imageProperties' => $imagePropertiesResponse->serializeToJsonString(),
            'text' => $textResponse->serializeToJsonString()
        ];

    }
}
