var signupButtons = document.querySelectorAll(".btn-signup");
checkSignupButtons(); 
function checkSignupButtons() {
  signupButtons = document.querySelectorAll(".btn-signup");
  if (signupButtons.length === 0) {
    setTimeout(checkSignupButtons, 500);
  } else {
    const buttonChecker = new ButtonChecker(".btn-signup");
    buttonChecker.checkSignupButtons(); 
  }
}
