$(function() {
  var searchContainer = Handlebars.compile($("#search_container").html());
  Handlebars.registerPartial("search", $("#search").html());

  $(document).on("keydown", function(event) {
    console.log("key down")
    if (event.which === 13) {
      console.log("start search")
      search();
    }
  });

  $("#random_button").on("click", () => randomSearch());

  function randomSearch() {
    var windowObjectReference,
        strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    window.open("http://en.wikipedia.org/wiki/Special:Random", "CNN_WindowName", strWindowFeatures);
  }

  function search() {
    var search_term = $("#search_box").val();
    $.ajax({
    url: 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + search_term,
    type: 'GET',
    dataType: 'jsonp',
    data: {param1: 'value1'},
    })
    .done(function(data) {
      console.log("search complete")
      renderSearches(data, search_term);
    })
    .fail(function() {
      console.log("error");
    })
  };

  function renderSearches(data, search_term) {
  var term = search_term[0],
      searches = [];

  for(var i = 0; i <= data[1].length; i++ ) {
    searches.push({title: data[1][i], body: data[2][i], link: data[3][i]})
  }
    $("#search_results").html(searchContainer({searches: searches, search_term: term}));
  }

});