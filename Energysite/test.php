<?php
require "config.php";

$pdo = new PDO('mysql:host=localhost;dbname=energysite', 'energyADM', 'yxcvbnm123'); //dbo682495146  yXcVbnm123
$pdo->exec("SET NAMES 'utf8';");

$statement = $pdo->prepare("SELECT hersteller FROM energydrinks");
$result = $statement->execute();
$bundledHersteller = $statement->fetchAll();

#var_dump($herstellers[1][0]);

$herstellers = array();

foreach ($bundledHersteller as $hersteller) {
  if (!in_array($hersteller[0], $herstellers)) {
    array_push($herstellers, $hersteller[0]);
  }
}

var_dump($herstellers);

?>
