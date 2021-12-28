<?php
$HTTP_protocol = $_SERVER["SERVER_PROTOCOL"];
header("Content-Type:application/json");
// Parameters set
if (isset($_GET['checkpoint']) and isset($_GET["lang"])) {

        $checkpoint = $_GET['checkpoint'];
        $lang = $_GET["lang"];
        // Parameters within contraints
        if (in_array($checkpoint, range(0, 7)) and in_array($lang, SUPPORTED_LANG)) {
                header($HTTP_protocol . " 200 Checkpoint Found"); // Send http success code
                $args = $lang . " " . $checkpoint;
                $command_exec = 'python3 /var/www/html/Projecte3/python/wikiScrapping.py ' . $args; //Prepare command
                $data = shell_exec($command_exec); // Execute scrapper
                if (is_null($data)) header($HTTP_protocol . " 404 Checkpoint Not Found");
                echo $data; // Print JSON string
        } else
                header($HTTP_protocol . " 418 Invalid Query"); // Send http not found error code

} else
        header($HTTP_protocol . " 400 Missing Args"); // Send http invalid params error code
