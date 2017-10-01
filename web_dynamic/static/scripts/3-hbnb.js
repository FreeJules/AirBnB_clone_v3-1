$(document).ready(function () {
  /* adding checked amenities to .amenities */
  let amensObj = {};
  let amensStr = '';
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      let id = $(this).attr('data-id');
      let name = $(this).attr('data-name');
      amensObj[id] = name;
    } else {
      let id = $(this).attr('data-id');
      delete amensObj[id];
    }
    amensStr = '';
    for (let key in amensObj) {
      amensStr = amensStr.concat(amensObj[key], ', ');
    }
    $('.amenities h4').text(amensStr.substring(0, amensStr.length - 2));
  });
  /* checking if status is ok for API */
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  /* fetching places */
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: "application/json",
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(data) {
      console.log(data);
      $.each(data, function(index, place) {
        $('<article id="' + place.id + '"></article>').appendTo('.places');
	let plIdStr = '.places #' + place.id
	$('<div><h2></h2><div></div></div>').appendTo(plIdStr);
	$(plIdStr + ' div').addClass('title');
	console.log(place.name);
	$(plIdStr + ' .title h2').text(place.name);
	$(plIdStr + ' .title div').addClass('price_by_night');
	console.log(place.price_by_night);
	$(plIdStr + ' .title .price_by_night').text(place.price_by_night);
/*
	$('<article id="' + place.id + '"></article>').appendTo('.places');
	let plIdStr = '.places #' + place.id
	$('<div><h2></h2><div></div></div>').appendTo(plIdStr);
	$(plIdStr + ' div').addClass('title');
	console.log(place.name);
	$(plIdStr + ' .title h2').text(place.name);
	$(plIdStr + ' div div').addClass('price_by_night');
	console.log(place.price_by_night);
	$('.price_by_night').text(place.price_by_night);
*/
      });
    },
    error: function(data) {
      console.log(data);
    }
  });
});
