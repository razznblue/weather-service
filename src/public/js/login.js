const val = () => {
  let name = document.getElementById("username").value;
  let pass = document.getElementById("pass").value;
  let error = document.getElementById("error_message");
  let text;
  error.style.padding = "10px";

  if(name.length < 6){
    text = "Username must be more than 6 characters";
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