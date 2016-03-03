// TODO: fix it so that the more button can come up after clicking and going to another query
// TODO: cancel all requests if it is blank, or search box has been focused. (the problem was it was loading the dictionary, even after the search box had been pressed.)
  Waves.attach('.button.flat', 'waves-dark');
Waves.init();
var currentQuery;
var oldQueries = [];
var $cache = false;
var $allCards = ".soundsLike, .definition, .relatedWords, .rhymes"
var switchWordTo = function(query) {
  window.scrollTo(0, 0);
  if (query != "") { //if it is not blank
    query = query
      .split("+").join(" ")
      .split("%20").join(" ");
    if (query !== currentQuery) {
      $(".searchbox").val(query);
      loadWord(query);
      window.location.hash = query;
      oldQueries.unshift(query);
      currentQuery = query;
    } else { //the query is the same as it was last time, so show the data
      $($allCards).removeAttr("style");
    }
  } else { //is blank, so go to reset mode
    $($allCards).css({ marginTop:200, opacity:0, visibility:"hidden" });
  }
}
var getRelatedWords = function(query, limit) {
  $.ajax({
    url: 'https://api.datamuse.com/words?ml=' + query + "&max=" + limit,
    type: 'get',
    dataType: 'json',
    cache: $cache,
    success: function(data) {
      var $list = [];
      $(data).each(function(index, value) {
        $list.push("<p><a href='#" + value.word + "'>" + value.word + "</a></p>");
      });
      if ($list.length > 0) {
        $(".relatedWords .text").html($list)
        $(".relatedWords").removeAttr("style");
      } else {
        $(".relatedWords .text").html("Can't find related words");
        $(".relatedWords").removeAttr("style");
      }
    }
  });
}
var getSimilarSoundingWords = function(query, limit) {
  $.ajax({
    url: 'https://api.datamuse.com/words?sl=' + query + "&max=" + limit,
    type: 'get',
    dataType: 'json',
    cache: $cache,
    success: function(data) {
      var $list = [];
      $(data).each(function(index, value) {
        $list.push("<a href='#" + value.word + "'>" + value.word + "</a>");
      });
      if ($list.length > 0) {
        $(".soundsLike .text").html("<p>" + $list.join(", ") + "</p>")
        $(".soundsLike").removeAttr("style");
      } else {
        $(".soundsLike .text").html("Can't find find similar-sounding words");
        $(".soundsLike").removeAttr("style");
      }
    }
  });
}
var getRhymingWords = function(query, limit) {
  $.ajax({
    url: 'https://api.datamuse.com/words?rel_rhy=' + query + "&max=" + limit,
    type: 'get',
    dataType: 'json',
    cache: $cache,
    success: function(data) {
      var $list = [];
      $(data).each(function(index, value) {
        $list.push("<p><a href='#" + value.word + "'>" + value.word + "</a></p>");
      });
      if ($list.length > 0) {
        $(".rhymes .text").html($list)
        $(".rhymes").removeAttr("style");
      } else {
        $(".rhymes .text").html("Can't find find rhyming words")
        $(".rhymes").removeAttr("style");
      }
    }
  });
}
var getDefinition = function(query, limit) {
  $.ajax({
    url: 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + query + "&limit=" + limit,
    type: 'get',
    dataType: 'json',
    cache: $cache,
    success: function(data) {
      var $list;
      $list = [];
      //each result
      $(data.results).each(function(index, value) {
        //get part of speech
        var partOfSpeech = value.part_of_speech;
        $list.push("<li><p><em>" + partOfSpeech + "</em> " + value.senses[0].definition + "</p></li>");
      });
      if ($list.length > 0) {
        $(".definition .text").html("<ol></ol>");
        $(".definition .text ol").html($list);
        $(".definition").removeAttr("style");
      } else {
        $(".definition .text").html("Can't find definitions");
        $(".definition").removeAttr("style");
      }
    }
  });
}
var loadWord = function(query) {
  //slide down and out
  $($allCards).css({ marginTop:200, opacity:0, visibility:"hidden" });
  getRelatedWords(query, 10);
  getSimilarSoundingWords(query, 10);
  getRhymingWords(query, 10);
  getDefinition(query, 3);

}
$.fn.pressEnter = function(fn) {
  return this.each(function() {
    $(this).on('enterPress', fn);
    $(this).keyup(function(e) {
      if (e.keyCode == 13) {
        $(this).trigger("enterPress");
      }
    });
  });
};
$(".searchbox").focus(function() {
  $($allCards).css({ marginTop:200, opacity:0, visibility:"hidden" });
});

$(".searchbox").on("focus keyup", function(){
  var empty = $(".searchbox").val() == "";
  if ($(".searchbox").siblings().size() == 0) { //if div does not exist after search box, add it
    $(".searchbox").after("<div></div>");
  }
  if (!empty) { //field is not blank
    $(".searchbox + div").empty();
    $.ajax({ //load suggestions
      url: 'https://api.collinsdictionary.com/api/v1/dictionaries/english/search/didyoumean?start=0&entrynumber=3&page=1&limit=25&q=' + $(".searchbox").val(),
      type: 'get',
      dataType: 'json',
      cache: $cache,
      headers: {
        'Accept': 'application/json',
        'accessKey': "Jqvg9iAG0Wzpre5dNEB1Cl3Xmw9cFY4AQD9wqNmEPPCovxeHJDfLKTiKkWZgp42Q"
      },
      success: function(data) {
        var $list = [];
        $(data).each(function(index, value) {
          $list.push("<a href='#" + value.word + "'>" + value.word + "</a>");
        });
        $(".searchbox + div").html($list);
      }
    });
  } else { //field is blank
    var queries = [];
    $.each(oldQueries, function(index, value){
      queries.push("<a href='#" + value + "'class='old'>" + value + "</a>")
    });
    $(".searchbox + div").html(queries);
  }
});
$(".searchbox + div").on("mousedown", "a", function() {
  $(".searchbox").val($(this).html()).blur();
})
$(".searchbox").pressEnter(function() {
  $(this).blur();
});
$(".searchbox").blur(function() {
  switchWordTo($(".searchbox").val());
});
window.onhashchange = function() {
  switchWordTo(window.location.hash.substring(1));
};
$(".relatedWords .button").on("click", function() {
  $(".relatedWords .actions").remove();
  $(".relatedWords").css({ marginTop:200, opacity:0, visibility:"hidden" });
  getRelatedWords(currentQuery, 100);
});
$(".definition .button").on("click", function() {
  $(".definition .actions").remove();
  $(".definition").css({ marginTop:200, opacity:0, visibility:"hidden" });
  getDefinition(currentQuery, 10);
});
$(".soundsLike .button").on("click", function() {
  $(".soundsLike .actions").remove();
  $(".soundsLike").css({ marginTop:200, opacity:0, visibility:"hidden" });
  getSimilarSoundingWords(currentQuery, 100);
});
$(".rhymes .button").on("click", function() {
  $(".rhymes .actions").remove();
  $(".rhymes").css({ marginTop:200, opacity:0, visibility:"hidden" });
  getRhymingWords(currentQuery, 100);
});
$(document).ready(function() {
  switchWordTo(window.location.hash.substring(1));
});
