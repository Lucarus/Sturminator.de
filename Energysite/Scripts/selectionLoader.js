var yOffset = 60;

$(function() {
  // initial daten holen
  getData()
  $(".sidebar-nav").css({'height': $( window ).height() - yOffset})

  herstellerSelectionLoader();
});

function herstellerSelectionLoader() {
  var checkboxes = $(".checkboxes");

  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = $(checkboxes[i]);
    checkbox.change(function() {
      var this_cb = $(this);
      var items = $('*[data-hersteller="'+ this_cb.data("cbhersteller") +'"]');

      if(this.checked) {
        for (var x = 0; x < items.length; x++) {
          $(items[x]).show();
          console.log("Showing");
        }
      } else {
        for (var x = 0; x < items.length; x++) {
          $(items[x]).hide();
        }
      }
    });
  }
}

function getData() {
  let userID = $('#code').text();

  $.getJSON("/Userdata/" + userID + "/selection.json", function( data ) {
    for (var key in data['drinks']) {
      //console.log(key + " => " + data['drinks'][key]);
      if (data['drinks'][key]) {
        var energyElement = $(("#energynumero" + key));
        energyElement.toggleClass("choosen");
        if (energyElement.hasClass("choosen")) {
          $(energyElement.children('img')[1]).attr("src", "Images/Controls/yes.png");
        } else {
          $(energyElement.children('img')[1]).attr("src", "Images/Controls/no.png");
        }
      }
    }
  });
}

function transformHam(element) {
  $(element).toggleClass("change");
  $("#wrapper").toggleClass("toggled");
}

$(window).scroll(function() {
  if ($(window).scrollTop() < yOffset) {
    $("#sidebar-wrapper").css({'top': yOffset -  $(window).scrollTop() + 'px'});
    $(".sidebar-nav").css({'height': ($( window ).height() - yOffset + $(window).scrollTop()) + "px" });
  }
  if ($(window).scrollTop() >= yOffset) {
    $("#sidebar-wrapper").css({'top': '0px'});
    $(".sidebar-nav").css({'height': '100%'});
  }
});
