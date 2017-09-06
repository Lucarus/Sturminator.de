<?php
require "config.php";
session_start();

$pdo;
initPDO();

if (isset($_GET['code'])) {
  session_unset();
  $code = $_GET['code'];

  $statement = $pdo->prepare("SELECT * FROM users WHERE userid = :userid");
  $result = $statement->execute(array('userid' => $code));
  $user = $statement->fetch();

  if ($user !== false) {
    $_SESSION['usercode'] = $code;
    $_SESSION['username'] = $user['username'];
  } else {
    $_GET['invalidcode'] = 1;
  }
} ?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" href="www.sturminator.de/favicon.png"/>
  <link rel="icon" href="www.sturminator.de/favicon.png" type="image/png">
  <title>Energyselector</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="/Styles/layout.css">
  <link rel="stylesheet" href="/Styles/overviewStyle.css">
  <link rel="stylesheet" href="/Styles/simple-sidebar.css">


  <?php
  if (isset($_SESSION['usercode'])) { ?>
  <script src="Scripts/selectionLoader.js" charset="utf-8"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fuse.js/2.6.1/fuse.min.js" crossorigin="anonymous"></script>
  <script src="Scripts/search.js" charset="utf-8"></script>
  <?php
  if (isset($_SESSION['userid'])) { ?>
  <script src="Scripts/selectionChanger.js" charset="utf-8"></script>
  <?php } } else { ?>
  <script src="Scripts/validate.js" charset="utf-8"></script>
  <?php }?>
</head>
<body>
  <?php if (isset($_SESSION['usercode'])) { ?>
  <div class="my-header-login text-center">
    <div style="padding-left: 5px" class="float-left my-ham-container" onclick="javascript:transformHam(this)">
      <div class="my-ham-div bar1"></div>
      <div class="my-ham-div bar2"></div>
      <div class="my-ham-div bar3"></div>
    </div>
    <h2 id="headline">Mah Energy</h2>
    <img id="search_icon" src="Images/Controls/search.png" style="display: inline-block; width: 35px; margin-right: 5px;" class="float-right">
    <input id="my-suche-feld" class="float-right form-control" type="text" name="searchInput" placeholder="Suchen....">
  </div>
  <?php } else { ?>
  <div class="my-header-login text-center">
    <h2>Mah Energy</h2>
  </div>
  <?php } ?>

  <div id="wrapper">
    <?php if (isset($_SESSION['usercode'])) { ?>
    <div id="sidebar-wrapper">
      <!-- Navigation bar -->
      <div class="sidebar-nav">
        <!-- Markenselector -->
        <div>
          Marken
          <div style="padding-left: 10px;">
            <?php

            $statement = $pdo->prepare("SELECT hersteller FROM energydrinks");
            $result = $statement->execute();
            $bundledHersteller = $statement->fetchAll();

            $herstellers = array();
            foreach ($bundledHersteller as $hersteller) {
              if (!in_array($hersteller[0], $herstellers)) {
                array_push($herstellers, $hersteller[0]);
              }
            }

            foreach ($herstellers as $hersteller) {
              echo '<div class="md-checkbox">';
              echo '<input id="cb_'. $hersteller .'" class="checkboxes" data-cbhersteller="'.$hersteller.'" checked type="checkbox">';
              echo '<label for="cb_'. $hersteller .'" class="">'. $hersteller .'</label>';
              echo '</div>';
            }

            ?>
            <!--<div class="md-checkbox">
              <input id="cb_Rockstar" checked type="checkbox">
              <label for="cb_Rockstar" class="">Rockstar</label>
            </div>
            <div class="md-checkbox">
              <input id="cb_Monster" checked type="checkbox">
              <label for="cb_Monster" class="">Monster</label>
            </div>
            <div class="md-checkbox">
              <input id="cb_Redbull" checked type="checkbox">
              <label for="cb_Redbull" class="">Redbull</label>
            </div>-->
          </div>
        </div>

        <!-- Navfooter -->
        <div class="my-fix-bottom">
          <a class="my-impressum" href="impressum.html">Impressum</a><br>

          <?php
          if (isset($_SESSION['userid'])) {
            echo ("Mein Code<br>");
          } else {
            echo ($_SESSION['username'] . "'s Code<br>");
          }
          echo ('<span id="code">'.$_SESSION['usercode'].'</span><br>');?>

          <input type="button" class="btn btn-outline-danger" onclick="javascript:document.location.href = 'logout.php';" value="Ausloggen">
        </div>
      </div>
    </div>

    <?php } ?>

    <div id="page-content-wrapper">
      <div class="container">
        <div id="energyContainer" class="row">

          <?php if (!isset($_SESSION['usercode'])) { ?>

          <div class="col-lg-4 col-xs-12 my-centered-col">
            <form name="login" action="login.php?login=1" method="post" onsubmit="return validateLogin()">
              <h3 class="text-center my-text-normal">Anmelden</h3>

              <?php $errorClass = "";
              if(isset($_GET['invalidcredentials'])) {
                $errorClass = "has-danger";
              } ?>

              <div id="errorFieldLogin" class="form-group <?php echo $errorClass?>">
                <input class="form-control my-margin-bottom-tiny" type="text" size="40" maxlength="250" name="username" placeholder="Nutzername">
                <input class="form-control" type="password" size="40"  maxlength="250" name="password" placeholder="Passwort">
                <div class="form-control-feedback">Nutzername oder Passwort falsch!</div>
              </div>

              <h3 class="text-center my-text-normal">oder</h3>

              <?php $errorClass = "";
              if(isset($_GET['invalidcode'])) {
                $errorClass = "has-danger";
              } ?>

              <div id="errorFieldCode" class="form-group my-margin-bottom-large <?php echo $errorClass?>">
                <input class="form-control" type="text" size="40"  maxlength="10" name="code" placeholder="Code">
                <div class="form-control-feedback">Code nicht vorhanden oder falsch!</div>
                <div class="my-margin-bottom-large"></div>
              </div>
              <input class="form-control btn btn-outline-success my-margin-bottom-tiny" type="submit" value="Auf gehts">
              <input class="form-control btn btn-secondary btn-sm" type="button" value="Registrieren" onclick="javascript:document.location.href = 'register.php';">
            </form>
          </div>

          <?php } ?>

          <!-- -->
          <!-- Angemeldete Nutzer -->
          <!-- -->

          <?php if (isset($_SESSION['usercode'])) { // main show logik ?>
          <!--div class="card-deck" <div id="energyContainer"></div>-->

          <?php
            $statement = $pdo->prepare("SELECT * FROM energydrinks");
            $result = $statement->execute();
            $energyDrinks = $statement->fetchAll();

            chdir("Images");
            chdir("Energy_Pictures");

            foreach ($energyDrinks as $energyDrink) {

              $imagePath = "/Images/Energy_Pictures";
              $imagePath .= "/".$energyDrink['hersteller'];
              $imagePath .= "/".$energyDrink['bildpfad'];

              //card
              echo '<div class="energydrink my-center my-energy-card" id="energynumero'.$energyDrink['id'].'" data-tags="'.$energyDrink['tags'].'" data-name="'.$energyDrink['name'].'" data-hersteller="'.$energyDrink['hersteller'].'" data-energyid="'.$energyDrink['id'].'">';
              echo '<h4 class="card-title my-center-text">'.$energyDrink['name'].'</h4>';
              echo '<img class="card-img-top my-energy-image my-center-img" src='.$imagePath.'>';
              echo '<img class="card-img-bottom indicator my-center-img" src="Images/Controls/no.png">';
              echo '</div>';

            } ?>

          </div>
          <?php } ?>
        </div>
      </div>
    </div>

    <?php if (!isset($_SESSION['usercode'])) { ?>
      <div style="padding-bottom: 80px; width:100%;"></div>
      <div class="my-footer-login">
        <div class="container text-right">
          <a href="impressum.html">Impressum</a>
        </div>
      </div>
    <?php } ?>
  </div>
</body>
</html>
