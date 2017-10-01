$(document).ready(function () {
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
});
