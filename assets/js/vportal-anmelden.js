$(document).ready(function() {
  $('#anmelden').on('click', function(event) {
    var formData = {
      'mail': $('input[name=email]').val(),
      'site_id': '{{ site.version }}',
      'cookie': document.cookie
    };

    console.log(formData);

    $.ajax({
      type: 'POST',
      url: 'https://j2u5rim2yl.execute-api.eu-central-1.amazonaws.com/prod/anmelden',
      data: JSON.stringify(formData),
      dataType: 'json',
      crossDomain: true,
      encode: true,
      success: function(responseData, textStatus, jqXHR) {
        console.log(responseData);
        $('#success').removeClass('d-none');
        setTimeout(function() {$("#success").addClass('d-none')} , 5000);
      },
      error: function(responseData, textStatus, errorThrown) {
        console.warn(responseData, textStatus, errorThrown);
        alert('CORS failed - ' + textStatus);
      }
    });
  });

  // CHECK IF PASSWORDS MATCH
  $('#InputPasswordCheck').on('focusout', function(event) {
    console.log('Lost Focus');
    // get password
    if ($('#InputPassword').val() != $('#InputPasswordCheck').val()) {
      alert('THIS SHIT MESSED UP DAWG!');
    } else {
      alert('COOL!');
    }
  });

  function all_fields_are_filled() {
    $('#SignUp .form-control').each(function(id, element) {
      if ($(element).val() == "") {
        return false;
      }
    })
    return true;
  }

  // CHECK FORM VALIDITY
  $('#SignUp').on('change', function(event) {
    formIsValid = $('#CheckTOS').is(':checked') && all_fields_are_filled();

    if (formIsValid) {
      $('#anmelden').removeAttr('disabled');
      console.log('enabling');
    } else {
      $('#anmelden').attr('disabled', true);
      console.log('disabling');
    }
  });

  // add loading time get price and options to be send with ajax request
  // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
  // var url = new URL(url_string);
  // var c = url.searchParams.get("c");
  // console.log(c);
});
