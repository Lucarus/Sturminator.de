$(function() {
  $("#search_icon").on("click", function(e) {
    $("#my-suche-feld").toggleClass("my-searching");
    $("#headline").toggleClass("my-hide-on-mobile");
    $("#my-suche-feld").focus();
  });

  // convert Elements into....
  // ok ok ich geh was essen und dann schlafen. Vielleicht hab ich ne bessere Idee wie man das ganze lösen kann
  // vielleicht sollte das ganze am anfang garnicht so vom php script eingebunden werden
  // sondern vielleicht direkt alles per js und ajax laden
  // dann nach dem suchen nur die benötigten Elemente nachladen
  // ODER
  // man könnte auch einmal alle laden
  // und dann die nicht benötigten per display none deaktivieren
  // da es noch nicht so viele energys gibt ist das die einfachere und schnellere Idee
  //                                                                             Zitat: "mein Kopf" 3:43
  var energyDrinks = [];

  $(".energydrink").each(function(index, element) {
    var jelement = $(element);
    energyDrinks.push({node: jelement, tags: jelement.attr("data-tags"), name: jelement.attr("data-name"), comp: jelement.attr("data-hersteller")});
  });

  var options = {
    shouldSort: true,
    threshold: 0.8,
    location: 0,
    distance: 800,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    tokenize: true,
    keys: [
      "tags",
      "name",
      "comp"
    ]
  };

  var fuse = new Fuse(energyDrinks, options); // "list" is the item array
  var container = $("#energyContainer");

  $('#my-suche-feld').on("keyup", function(e) {
    container.empty();

    var result = fuse.search($('#my-suche-feld').val());

    if (result.length == 0) {
      $.each(energyDrinks, function(index, element) {
        container.append(element.node);
        $(element.node).click(function() {
          $(this).toggleClass("choosen");
          if ($(this).hasClass("choosen")) {
            $($(this).children('img')[1]).attr("src", "Images/Controls/yes.png");
          } else {
            $($(this).children('img')[1]).attr("src", "Images/Controls/no.png");
          }
          saveData();
        });
      });
    } else {
      $.each(result, function(index, element) {
        container.append(element.node);
        $(element.node).click(function() {
          $(this).toggleClass("choosen");
          if ($(this).hasClass("choosen")) {
            $($(this).children('img')[1]).attr("src", "Images/Controls/yes.png");
          } else {
            $($(this).children('img')[1]).attr("src", "Images/Controls/no.png");
          }
        });
      });
    }
  });
});
