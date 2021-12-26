<?php

header("Content-Type:application/json");
// Parameters set
if(isset($_GET['checkpoint']) AND isset($_GET["lang"])){

    $checkpoint = $_GET['checkpoint'];
    $lang = $_GET["lang"];
    // Parameters within contraints
	if(in_array($checkpoint, range(0,7)) AND in_array($lang, SUPPORTED_LANG)){
        header($_SERVER["SERVER_PROTOCOL"] . " 200 Checkpoint Found"); // Send http success code
        $args = $lang . " " . $checkpoint;
        $command_exec = 'python3 /var/www/html/Projecte3/python/wikiScrapping.py ' . $args; //Prepare command
        $data = shell_exec($command_exec); // Execute scrapper
        echo $data; // Print JSON string
	}else
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Checkpoint Not Found"); // Send http not found error code
	
}else
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Broken Query"); // Send http invalid params error code
