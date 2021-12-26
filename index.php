<?php
if (!isset($_SESSION)) session_start();
require './declarations.php';

if(empty($url[0])) {
  readfile('./html/game.html');
}
elseif ($url[0] === "api"){
  if ($url[1] === "scrapper")
    require './api/scrapper.php';
  if($url[1] === "leaderboard")
    require './api/leaderboard.php';
}
