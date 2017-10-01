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

  // Post places dynamically with a click
  $('button').on('click', function () {
    // empty <div class='places'> and add <h1>Places</h1> again
    $('.places').empty();
    $('<h1>Places</h1>').appendTo('.places');

    // defining data to be passed to request
    let reqData = {};
    reqData['amenities'] = Object.keys(amensObj);

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      datatype: 'json',
      data: JSON.stringify(reqData),
      contentType: 'application/json',
      success: function (data) {
        $(data).each(function (index, place) {
          console.log(data);
          // Opening article tag
          let html = '';

          // Place - name/title and price portion
          html += '<article> <div class="title"> <h2>' + place.name + '</h2>';
          html += '<div class="price_by_night"> $' + place.price_by_night + '</div></div>';

          // Place - information portion (max guests and number of rooms)
          html += '<div class="information"> <div class="max_guest"><i class="fa fa-users fa-3x"aria-hidden="true"></i><br>' +
            place.max_guest + ' Guests' + '</div>';

          html += '<div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>' +
            place.number_rooms + ' Bedrooms' + '</div>';

          html += '<div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>' +
            place.number_bathrooms + ' Bathrooms' + '</div></div>';

          // User - Owner and description portion
          html += '<div class="user"> </div> <div class="description">' +
            place.description + '</div> </article>';

          // append all articles to .places tag
          $(html).appendTo('.places');
        });
      },
      error: function (xhr, textStatus, error) {
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
      }
    });
  });
});
