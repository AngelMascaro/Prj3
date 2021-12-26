<?php
// Defined constants
// 
define("SUPPORTED_LANG", array(
  "en",
  "ca"
));
// Variables
// 
// Set language, default is "en"
if (isset($_GET["lang"])) 
  $lang = $_GET["lang"];
elseif (isset($_COOKIE["lang"])) 
  $lang = $_COOKIE["lang"];
if(!in_array($lang,SUPPORTED_LANG, true)) $lang = "en";

// Functions
function parseUrl($url)
{
  // Parses URL parts into an associative array
  $parsedUrl = parse_url($url);
  // Removes the leading slash
  $parsedUrl["path"] = ltrim($parsedUrl["path"], "/");
  // Removes white-spaces around the address
  $parsedUrl["path"] = trim($parsedUrl["path"]);
  // Splits the address by slashes
  $explodedUrl = explode("/", $parsedUrl["path"]);
  return $explodedUrl;
}
// Parse url 
$url = parseUrl($_SERVER['REQUEST_URI']);
