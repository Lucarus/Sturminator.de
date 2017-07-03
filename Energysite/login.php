<!DOCTYPE html>
<html>
<?php
require "config.php";
session_start();

$pdo;
initPDO();

if(isset($_GET['login'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
  $result = $statement->execute(array('username' => $username));
  $user = $statement->fetch();

  //Überprüfung des Passworts
  if ($user !== false && password_verify($password, $user['password'])) {
    $_SESSION['userid'] = $user['userid'];
    $_SESSION['usercode'] = $user['userid'];
    $_SESSION['username'] = $user['username'];
    ?><meta http-equiv="Refresh" content="0;url=index.php"><?php
  } else {
    ?><meta http-equiv="Refresh" content="0;url=index.php?invalidcredentials=1"><?php
  }
} else if (isset($_GET['code'])) {
  $code = $_POST['code'];

  $statement = $pdo->prepare("SELECT * FROM users WHERE userid = :userid");
  $result = $statement->execute(array('userid' => $code));
  $user = $statement->fetch();

  if ($user !== false) {
    $_SESSION['usercode'] = $code;
    $_SESSION['username'] = $user['username'];
    ?><meta http-equiv="Refresh" content="0;url=index.php"><?php
  } else {
    ?><meta http-equiv="Refresh" content="0;url=index.php?invalidcode=1"><?php
  }

} else {
  ?><meta http-equiv="Refresh" content="0;url=forbidden.html"><?php
}
?>
</html>
