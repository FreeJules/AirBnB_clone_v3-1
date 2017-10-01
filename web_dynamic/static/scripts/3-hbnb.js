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
        $('<div class="title"></div>').appendTo(plIdStr);
	$('<div class="information"></div>').appendTo(plIdStr);
	$('<div class="user"></div>').appendTo(plIdStr);
	$('<div class="description"></div>').appendTo(plIdStr);
	/*
	adding name and price
	class='title' and class='price_by_night'
	*/
	$(plIdStr + ' .title').append('<h2>' + place.name + '</h2>');
	$(plIdStr + ' .title').append('<div class="price_by_night">$' + place.price_by_night + '</div>');
        /*
        getting second div with class+'information'
        classes: 'max_guest', 'number_bathrooms', 'nhumber_rooms'
        */
        $(plIdStr + ' .information').append('<div class="max_guest"></div>');
	$(plIdStr + ' .information .max_guest').
	      append('<i class="fa fa-users fa-3x" aria-hidden="true"></i>');
	$(plIdStr + ' .information .max_guest').append('<br />');
        $(plIdStr + ' .information .max_guest').append(place.max_guest + ' Guests');

	$(plIdStr + ' .information').append('<div class="number_rooms"></div>');
        $(plIdStr + ' .information .number_rooms').
              append('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>');
        $(plIdStr + ' .information .number_rooms').append('<br />');
        $(plIdStr + ' .information .number_rooms').append(place.number_rooms + ' Rooms');

        $(plIdStr + ' .information').append('<div class="number_bathrooms"></div>');
        $(plIdStr + ' .information .number_bathrooms').
              append('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>');
        $(plIdStr + ' .information .number_bathrooms').append('<br />');
        $(plIdStr + ' .information .number_bathrooms').append(place.number_bathrooms + ' Bathrooms');
      });
    },
    error: function(data) {
      console.log(data);
    }
  });
});
