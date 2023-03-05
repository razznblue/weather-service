const val = () => {
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let pass = document.getElementById("pass").value;
  let error = document.getElementById("error_message");
  let text;
  error.style.padding = "10px";

  if(name.length < 6){
    text = "Username must be more than 6 characters";
    error.innerHTML = text;
    return false;
  }
  if (email.length > 0 && (email.indexOf("@") == -1 || email.length < 6)){
    text = "Your email is invalid";
    error_message.innerHTML = text;
    return false;
  }
  if (phone.length !== 10) {
    text = 'Phone Number must have 10 digits';
    error.innerHTML = text;
    return false;
  }
  if (!/^\d+$/.test(phone)) {
    text = 'Phone Number must only include numbers';
    error.innerHTML = text;
    return false;
  }
  if (pass.length < 8){
    text = "Password must be more than 8 characters";
    error.innerHTML = text;
    return false;
  }

  let frm = document.getElementById("registerForm");
  frm.style.display = 'none';
  let hid = document.getElementById("hid");
  hid.style.display = 'none';
  let disp = document.getElementById("success");
  disp.style.display = 'block';
  error.style.padding = "0px";
  return false;
}