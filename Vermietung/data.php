<?php

$pdo = new PDO('mysql:host=db682495146.db.1and1.com;dbname=db682495146', 'dbo682495146', 'yXcVbnm123');
$pdo->exec("SET NAMES 'utf8';");

$statement = $pdo->prepare("SELECT * FROM vermietung_netflix");
$result = $statement->execute();
$dataArray = $statement->fetchAll();

echo ('{');

$firstTime = 1;
foreach ($dataArray as $data) {
	if ($firstTime) {
		$firstTime = 0;
	} else {
		echo(",");
	}
	echo('"'.$data['name'].'": '.$data['bisMonat']);
}

echo ('}');

?>