<?php
session_start();

if (isset($_SESSION['userid'])){
  chdir("Userdata");
  chdir($_SESSION['userid']);
  $userDataFile = fopen(getcwd() . "/selection.json", "w");

  $data = array();
  foreach ($_POST as $key => $value) {
    $data[$key] = (integer)$value;
  }

  $userData = array();
  $userData['drinks'] = $data;

  fwrite($userDataFile, json_encode($userData));
  fclose($userDataFile);
}
?>
