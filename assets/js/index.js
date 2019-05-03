---
---
if (document.cookie.indexOf("sessiontag=") >= 0) {
  console.log('Hi again.');
} else {
  document.cookie="sessiontag=" + Math.trunc(Math.random() * 10000000) + "; expires=1";
}

$(document).ready(function() {

  // Set the price with a 50/50 chance fot both sets
  rnd = Math.random();

  if (rnd >= 0.33 && rnd < 0.66) {
    var price = 5;
    var option = 'A';
  } else if (rnd >= 0.66) {
    var price = 10;
    var option = 'B';
  } else {
    var price = 20;
    var option = 'C';
  }

  $('.price').text(price);
  $('#anmelden').data('price', price);
  $('#price-estimate').text( $('#units-label').text() * price )


  $('#anmelden').on('click', function(event) {
    gtag_report_conversion('https://vermieterix.com/vportal-anmelden.html');

    var formData = {
      'vorname': $('input[name=vorname]').val(),
      'name': $('input[name=name]').val(),
      'mail': $('input[name=email]').val(),
      'checkSupport': $('input[name=checkSupport]').is(':checked'),
      'site_id': '{{ site.version }}',
      'cookie': document.cookie
    };
    
    console.log(formData);

    // activate spiner
    $(this).find('.spinner-border').toggleClass('d-none')

    window.location.href = 'vportal-anmelden.html?option=' + option
                                              + '&price=' + price
                                              + '&units=' + $('#units').val()
                                              + '&vorname=' + formData['vorname']
                                              + '&name=' + formData['name']
                                              + '&mail=' + formData['mail']
                                              + '&checkSupport=' + formData['checkSupport'];

  });

  $('#units').on('input', function(event) {
    units = $('#units').val();
    $('#units-label').text(units);
    $('#price-estimate').text(units < 30 ? units * price : 30 * price + (units - 30) * price * 0.5);
  });

  $('#units').on('change', function(event) {
    var formData = {
      'site_id': '{{ site.version }}',
      'price': price.toString(),
      'option': option,
      'cookie': document.cookie,
      'units': $('#units').val()
    };
    
    console.log(formData);

    $.ajax({
      type: 'POST',
      url: 'https://j2u5rim2yl.execute-api.eu-central-1.amazonaws.com/{{site.env}}/activity',
      data: JSON.stringify(formData),
      dataType: 'json',
      crossDomain: true,
      encode: true,
      success: function(responseData, textStatus, jqXHR) {console.log(responseData);},
      error: function(responseData, textStatus, errorThrown) {console.warn(responseData, textStatus, errorThrown);}
    });
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
      if ($(element).val().length == 0) {
        valid = false;
      }
    });
    return valid;
  }

  // CHECK FORM VALIDITY
  $('#SignUp').on('input', function(event) {
    formIsValid = all_fields_are_filled() && email_is_valid();

    if (formIsValid == true) {
      $('#anmelden').removeAttr('disabled');
      console.log('enabling');
    } else {
      $('#anmelden').attr('disabled', true);
      console.log('disabling');
    }
  });

});
