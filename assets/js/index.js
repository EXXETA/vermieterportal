---
---
if (document.cookie.indexOf("sessiontag=") >= 0) {
  console.log('Hi again.');
} else {
  document.cookie="sessiontag=" + Math.trunc(Math.random() * 10000000) + "; expires=1";
}

$(document).ready(function() {

  // Set the price with a 50/50 chance fot both sets
  
  if (Math.random() >= 0.5) {
    var price = 10;
    var option = 'A';
  } else {
    var price = 20;
    var option = 'B';
  }

  $('.price').text(price);
  $('#anmelden').data('price', price);

  $('#anmelden').on('click', function(event) {
    gtag_report_conversion('https://vermieterix.com/vportal-anmelden.html');

    var formData = {
      'site_id': '{{ site.version }}',
      'price': $(event.target).data('price').toString(),
      'option': option,
      'cookie': document.cookie
    };
    
    console.log(formData);

    // activate spiner
    $(this).find('.spinner-border').toggleClass('d-none')

    $.ajax({
      type: 'POST',
      url: 'https://j2u5rim2yl.execute-api.eu-central-1.amazonaws.com/prod/activity',
      data: JSON.stringify(formData),
      dataType: 'json',
      crossDomain: true,
      encode: true,
      success: function(responseData, textStatus, jqXHR) {
        console.log(responseData);
        window.location.href = 'vportal-anmelden.html?option=' + option + '&price=' + formData['price'];
      },
      error: function(responseData, textStatus, errorThrown) {
        console.warn(responseData, textStatus, errorThrown);
        window.location.href = 'vportal-anmelden.html?option=' + option + '&price=' + formData['price'];
      }
    });
  });

  $('#units').on('input', function(event) {
    units = $('#units').val();
    $('#units-label').text(units);
    $('#price-estimate').text(units * price);
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
      url: 'https://j2u5rim2yl.execute-api.eu-central-1.amazonaws.com/prod/activity',
      data: JSON.stringify(formData),
      dataType: 'json',
      crossDomain: true,
      encode: true,
      success: function(responseData, textStatus, jqXHR) {console.log(responseData);},
      error: function(responseData, textStatus, errorThrown) {console.warn(responseData, textStatus, errorThrown);}
    });
  });  

});
