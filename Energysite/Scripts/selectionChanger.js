$(function() {
  let userID = $('#code').text();

  //klassen toggeln
  $('.energydrink').each(function(index, element) {
    $(element).click(function() {
      $(this).toggleClass("choosen");
      if ($(this).hasClass("choosen")) {
        $($(this).children('img')[1]).attr("src", "Images/Controls/yes.png");
      } else {
        $($(this).children('img')[1]).attr("src", "Images/Controls/no.png");
      }
      saveData();
    });
  });

  // alle 5 Sekunden speichern
  //setInterval(function() {
  //  saveData();
  //}, 5000);
});

$(window).on("unload", function() {
  saveData();
});

function saveData() {
  var data = {};
  $('.energydrink').each(function(index, element) {
    data[$(element).attr("data-energyid")] = $(element).hasClass("choosen") ? 1 : 0;
  });

  $.ajax({
    type: 'POST',
    url: 'savedata.php',
    data: data,
    success: function(response) {
      //console.log(response);
    }
  });
}
