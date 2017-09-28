$(document).ready(function () {
  $("input:checkbox").change(function() {
    if($(this).is(':checked')) {
      name = $(this).attr('data-name');
      $('.amenities h4').append(name);
    }
    else {
	alert("Nope");
    }
  });
});
