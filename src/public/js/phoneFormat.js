// A function to format text to look like a phone number
function phoneFormat(input){
  // Strip all characters from the input except digits
  input = input.replace(/\D/g,'');
  
  // Trim the remaining input to ten characters, to preserve phone number format
  input = input.substring(0,10);

  // Based upon the length of the string, we add formatting as necessary
  var size = input.length;
  if(size == 0){
          input = input;
  }else if(size < 4){
          input = '('+input;
  }else if(size < 7){
          input = '('+input.substring(0,3)+') '+input.substring(3,6);
  }else{
          input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
  }
  return input; 
}

const phone = document.querySelector('#phone');

if (phone) {
  phone.value = phoneFormat(phone.value);
  phone.addEventListener('keyup', function(evt) {
    var phoneNumber = document.getElementById('phone');
    phoneNumber.value = phoneFormat(phoneNumber.value);
  });
}