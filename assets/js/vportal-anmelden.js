---
---
$(document).ready(function() {
  $('#anmelden').on('click', function(event) {
    var formData = {
      'mail': $('input[name=email]').val(),
      'password': $('input[name=password]').val(),
      'checkTOS': $('input[name=checkTOS]').is(":checked"),
      'checkSupport': $('input[name=checkSupport]').is(":checked"),
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

  function passwordsMatch() {
    return $('#InputPassword').val() == $('#InputPasswordCheck').val();
  }

  // CHECK IF PASSWORDS MATCH
  $('#InputPasswordCheck').on('focusout', function(event) {
    if (passwordsMatch()) {
      $('#missmatch').hide();
    } else {
      $('#missmatch').show();
      // setTimeout(function(){$('#missmatch').toggle()}, 5000);
    }
  });

  function email_is_valid() {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/.test($('#inputEmail').val()));
  }

  $('#inputEmail').on('focusout', function(event) {
    if (email_is_valid()) {
      $('#emailInvalid').hide();
    } else {
      $('#emailInvalid').show();
      // setTimeout(function(){$('#emailInvalid').toggle()}, 5000);
    }
  });

  function all_fields_are_filled() {
    var valid = true;
    res = $('#SignUp .form-control').each(function(id, element) {
      if ( $(element).val().length == 0) {
        valid = false;
      }
    });
    return valid;
  }

  // CHECK FORM VALIDITY
  $('#SignUp').on('change', function(event) {
    formIsValid = $('#CheckTOS').is(':checked') && all_fields_are_filled() && passwordsMatch() && email_is_valid();

    if (formIsValid == true) {
      $('#anmelden').removeAttr('disabled');
      console.log('enabling');
    } else {
      $('#anmelden').attr('disabled', true);
      console.log('disabling');
    }
  });

  // at loading time get price and options to be send with ajax request
  // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
  // var url = new URL(url_string);
  // var c = url.searchParams.get("c");
  // console.log(c);
});
