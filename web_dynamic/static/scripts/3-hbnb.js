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

  // Post places dynamically to index page

  let places = $('.places h1');

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    datatype: 'json',
    data: JSON.stringify(places),
    contentType: 'application/json',
    success: function (data) {
      $(data).each(function(index, place) {
        console.log(place);
        places.append('<article>');
	places.append('<div class="title"> <h2>' + place.name + '</h2>');
	places.append('<div class="price_by_night">' + place.price_by_nigh + '</div></div>');
	places.append('</article>');
      });
    },
    error: function (xhr, textStatus, error) {
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    }
  });
});
