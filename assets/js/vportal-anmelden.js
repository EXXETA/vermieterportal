---
---

function formDataValid(formData) {
    let isValid = formData['option'] != null &&
                  formData['price'] != null &&
                  formData['vorname'] != null &&
                  formData['name'] != null &&
                  formData['mail'] != null &&
                  formData['checkSupport'] != null;

    return isValid
  }

$(document).ready(function() {
  // at loading time get price and options to be send with ajax request
  var url = new URL(window.location.href);
  
  var formData = {
    'option': url.searchParams.get('option'),
    'price': url.searchParams.get('price'),
    'units': url.searchParams.get('units'),
    'vorname': url.searchParams.get('vorname'),
    'name': url.searchParams.get('name'),
    'mail': url.searchParams.get('mail'),
    'checkSupport': url.searchParams.get('checkSupport'),
    'site_id': '{{ site.version }}',
    'cookie': document.cookie
  }
  
  console.log(formData);

  if (formDataValid(formData)) {
    $.ajax({
      type: 'POST',
      url: 'https://j2u5rim2yl.execute-api.eu-central-1.amazonaws.com/dev/anmelden',
      data: JSON.stringify(formData),
      dataType: 'json',
      crossDomain: true,
      encode: true,
      success: function(responseData, textStatus, jqXHR) {
        console.log(responseData);
      },
      error: function(responseData, textStatus, errorThrown) {
        console.warn(responseData, textStatus, errorThrown);
      }
    });
  } else {
    console.log('No valid form data.');
  }

});
