<?php
require "config.php";
session_start();

$fileNotFoundError = false;
$herstellerNotFound = false;
$energyRegisteredError = false;

if(isset($_GET['addEnergy'])) {
  $name = $_POST['name'];
  $hersteller = $_POST['hersteller'];
  $tag = $_POST['tag'];
  $imagename = $_POST['imagename'];

  chdir('Images');
  chdir('Energy_Pictures');
  if (is_dir(getcwd()."\\".$hersteller)) {
    chdir($hersteller);
    $imagePath = getcwd() . "\\" . $imagename;

    if (file_exists($imagename)) {
      $pdo;
      initPDO();

      $statement = $pdo->prepare("SELECT * FROM energydrinks WHERE bildpfad = :bildpfad hersteller = :hersteller");
      $result = $statement->execute(array('bildpfad' => $imagename, 'hersteller' => $hersteller));
      $energy = $statement->fetch();

      if($energy !== false) {
        $energyRegisteredError = true;
      } else {
        $statement = $pdo->prepare("INSERT INTO energydrinks (name, hersteller, tags, bildpfad) VALUES (:name, :hersteller, :tags, :bildpfad)");
        $result = $statement->execute(array('name' => $name, 'hersteller' => $hersteller, 'tags' => $tag, 'bildpfad' => $imagename));
        echo "Added...";
      }
    } else {
      $fileNotFoundError = true;
    }
  } else {
    $herstellerNotFound = true;
  }
}

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Energyselector - Admindashboard</title>
</head>
<body>
  <?php
  if ($fileNotFoundError) {
    echo "Bild wurde nicht gefunden";
  }
  if ($energyRegisteredError) {
    echo "Energydrink bereits hinzugefügt";
  }
  if ($herstellerNotFound) {
    echo "Hersteller noch nicht hinzugefügt";
  }
  if (isset($_SESSION['username'])) {
    if (strcmp($_SESSION['username'], "adm") === 0) {
        // Now show loggin screen ?>
  <form action="?addEnergy=1" method="post">
    <h2>Energy drink hinzufügen:</h2>
    <input required type="text" size="40" maxlength="250" name="name" placeholder="Name"><br>
    <input required type="text" size="40" maxlength="250" name="hersteller" placeholder="Hersteller"><br>
    <input required type="text" size="40"  maxlength="250" name="tag" placeholder="Tags"><br>
    <input required type="text" size="40"  maxlength="250" name="imagename" placeholder="Bildname (FREEZE1.png)"><br>
    <input required type="submit" value="hinzufügen">
  </form>
  <?php } else { ?>
  <meta http-equiv="Refresh" content="0;url=forbidden.html">
  <?php }} else { // main show logik ?>
  <meta http-equiv="Refresh" content="0;url=forbidden.html">
  <?php } ?>
</body>
</html>
