function validateRegister() {
  $('#username-formgroup').removeClass("has-danger");
  $('#password-formgroup').removeClass("has-danger");

  var isOK = true;

  if (document.forms["register"]["password"].value !== document.forms["register"]["password2"].value) {
    $('#password-formgroup').children('.form-control-feedback').html("Passwörter müssen identsich sein!");
    $('#password-formgroup').addClass("has-danger");

    isOK = false;
  } else if (document.forms["register"]["password"].value.length < 7) {
    $('#password-formgroup').children('.form-control-feedback').html("Passwort müss minimum 7 Zeichen haben!");
    $('#password-formgroup').addClass("has-danger");

    isOK = false;
  }

  if (document.forms["register"]["password"].value.length == 0 || document.forms["register"]["password2"].value.length == 0) {
    $('#password-formgroup').children('.form-control-feedback').html("Passwort darf nicht leer sein!");
    $('#password-formgroup').addClass("has-danger");

    isOK = false;
  }

  if (document.forms["register"]["username"].value.length < 4 ) {
    $('#username-formgroup').children('.form-control-feedback').html("Nutzername muss länger als 3 Zeichen sein!");
    $('#username-formgroup').addClass("has-danger");

    isOK = false;
  }

  if (document.forms["register"]["username"].value.length == 0 ) {
    $('#username-formgroup').children('.form-control-feedback').html("Nutzername darf nicht leer sein!");
    $('#username-formgroup').addClass("has-danger");

    isOK = false;
  }

  return isOK;
}

function validateLogin() {
  $('#errorFieldLogin').removeClass("has-danger");
  $('#errorFieldCode').removeClass("has-danger");

  if (document.forms["login"]["username"].value.length > 0) {
    if (document.forms["login"]["password"].value.length <= 0) {
      $('#errorFieldLogin').addClass("has-danger");
      $('#errorFieldLogin').children('.form-control-feedback').html("Passwort darf nicht leer sein!");
      return false;
    }
  } else if (document.forms["login"]["code"].value.length > 0) {
    if (document.forms["login"]["code"].value.length != 10) {
      $('#errorFieldCode').addClass("has-danger");
      $('#errorFieldCode').children('.form-control-feedback').html("Code muss 10 Zeichen lang sein");
      return false;
    } else if (document.forms["login"]["code"].value.length == 10) {
      if (!(/^\d+$/.test(document.forms["login"]["code"].value))) {
        $('#errorFieldCode').addClass("has-danger");
        $('#errorFieldCode').children('.form-control-feedback').html("Code darf nur aus Zeichen bestehen");
        return false;
      }
      document.forms["login"].action = "login.php?code=1";
      //
    }
  } else {
    $('#errorFieldLogin').addClass("has-danger");
    $('#errorFieldLogin').children('.form-control-feedback').html("Mit Nutzername oder Code anmelden");
    $('#errorFieldCode').addClass("has-danger");
    $('#errorFieldCode').children('.form-control-feedback').html("Mit Nutzername oder Code anmelden");
    return false;
  }
}
