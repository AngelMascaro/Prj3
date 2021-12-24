<?php
$url = $_SERVER['REQUEST_URI'];
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
$url = parseUrl($url);





$command_exec = 'python3 /var/www/html/Projecte3/python/wikiScrapping.py ca 6';
$planet_info = shell_exec($command_exec);
include './includes/game.php';
?>


<!-- <script>
  var labels = document.getElementsByClassName("infobox")[0].getElementsByClassName("infobox-label")

for (let label of labels){
  console.log(label.innerText)
}
</script> -->