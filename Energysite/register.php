<?php
require "config.php";
// Error Reporting komplett abschalten
error_reporting(0);

session_start();

$pdo;
initPDO();

// Variables
$userExists = false;
$redirect = false;
$commonError = false;

// Form submited
if(isset($_GET['register'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
  $result = $statement->execute(array('username' => $username));
  $user = $statement->fetch();

  if($user !== false) {
    $userExists = true;
  }

  if(!$userExists) {

    // generate user ID (also automatically logs user in when redirected to index)
    do {
      $userID = intval( "0" . rand(1,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) );

      $statement = $pdo->prepare("SELECT * FROM users WHERE userid = :userid");
      $result = $statement->execute(array('userid' => $userID));
      $user = $statement->fetch();
    } while ($user !== false);

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $statement = $pdo->prepare("INSERT INTO users (userid, username, password) VALUES (:userid ,:username, :password)");
    $result = $statement->execute(array('userid' => $userID, 'username' => $username, 'password' => $password_hash));

    if($result) {
      $redirect = true;
      // direkt anmelden
      $_SESSION['userid'] = $userID;
      $_SESSION['username'] = $username;
      $_SESSION['usercode'] = $userID;

      // Ordner erstellen
      // Json datei erstellen
      chdir("Userdata");
      mkdir($userID);
      chdir($userID);
      //$userDataFile = fopen(getcwd() . "\\selection.json", "w");
      $userDataFile = fopen(getcwd() . "/selection.json", "w");

      $statement = $pdo->prepare("SELECT * FROM energydrinks");
      $result = $statement->execute();
      $energyDrinks = $statement->fetchAll();

      $energyDrinksJSON = array();
      foreach ($energyDrinks as $energyDrink) {
        $energyDrinksJSON[(string)$energyDrink['id']] = 0;
      }

      $userData = array();
      $userData['drinks'] = $energyDrinksJSON;

      fwrite($userDataFile, json_encode($userData));
      fclose($userDataFile);

    } else {
      $commonError = true;
    }
  }
}
?>
<!DOCTYPE html>
<html>
<head>
  <?php if ($redirect || isset($_SESSION['userid'])) { ?>
  <meta http-equiv="Refresh" content="0;url=index.php">
  <?php } ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Energyselector</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

  <link rel="stylesheet" href="/Styles/layout.css">
  <script src="Scripts/validate.js" charset="utf-8"></script>
</head>
<body>
  <div class="my-header-login text-center">
    <h2>Mah Energy</h2>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-xs-12 my-centered-col">
        <form name="register" action="?register=1" method="post" onsubmit="return validateRegister()">
          <h3 class="my-text-normal text-center">Registrieren</h3>

          <?php $errorCode = "";
          if ($userExists) {
            $errorCode = "has-danger";
          } ?>

          <div id="username-formgroup" class="form-group <?php echo $errorCode ?>">
            <input class="form-control" type="text" maxlength="20" name="username" placeholder="Nutzername">
            <div class="form-control-feedback">Nutzername bereits vorhanden</div>
            <div class="my-margin-bottom-tiny"></div>
          </div>
          <div id="password-formgroup" class="form-group">
            <input class="form-control my-margin-bottom-tiny" type="password" maxlength="30" name="password" placeholder="Passwort">
            <input class="form-control" type="password" maxlength="30" name="password2" placeholder="Passwort">
            <div class="form-control-feedback"></div>
            <div class="my-margin-bottom-tiny"></div>
          </div>

          <div class="my-small-text my-darker-color my-margin-bottom-normal">
            Die Passwörter werden nur Gehasht auf dem Server gespeichert.
            Trotzdem solltest du nie ein Passwort zweimal verwenden!
            Ich garantiere nicht, dass Paswörter nicht abhanden kommen.
          </div>

          <input class="form-control btn btn-outline-success" type="submit" value="Registrieren">
        </form>
      </div>
    </div>
  </div>

  <div class="my-footer-login">
    <div class="container text-right">
      <a href="impressum.html">Impressum</a>
    </div>
  </div>

</body>
</html>
