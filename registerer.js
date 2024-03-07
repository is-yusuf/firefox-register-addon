var signupButtons = document.querySelectorAll(".btn-signup");
checkSignupButtons(); // Start checking
function checkSignupButtons() {
  signupButtons = document.querySelectorAll(".btn-signup");
  if (signupButtons.length === 0) {
    setTimeout(checkSignupButtons, 10); // Check again after 1 millisecond
  } else {
    registerer();
  }
}

function fillform(comment, firstname, lastname, email) {
  var form_firstname = document.querySelectorAll("#firstname")[0];
  var form_lastname = document.querySelectorAll("#lastname")[0];
  var form_email = document.querySelectorAll("#email")[0];
  var form_comment = document.querySelector('[data-ng-model="i.mycomment"]');
  var confirm = document.querySelectorAll(".btn-success")[0];

  checkinputs();
  function checkinputs() {
    form_firstname = document.querySelectorAll("#firstname")[0];
    form_lastname = document.querySelectorAll("#lastname")[0];
    form_email = document.querySelectorAll("#email")[0];
    form_comment = document.querySelector('[data-ng-model="i.mycomment"]');
    confirm = document.querySelectorAll(".btn-success")[0];
    if (!form_comment) {
      setTimeout(checkinputs, 10); // Check again after 1 millisecond
    } else {
      form_comment.value = comment;
      if (form_comment) {
        form_comment.dispatchEvent(
          new Event("change", {
            bubbles: true,
            cancelable: true,
          })
        );
        form_comment.removeAttribute("data-ng-disabled");
        form_comment.classList.remove("ng-pristine", "ng-empty");
        form_comment.classList.add(
          "ng-valid",
          "ng-valid-maxlength",
          "ng-touched",
          "ng-not-empty",
          "ng-dirty",
          "ng-valid-parse"
        );
      }
      confirm.click();
    }
  }
}
function registerer() {
  const enabledButtons = Array.from(signupButtons).filter(
    (button) => !button.disabled
  );

  if (enabledButtons.length > 0) {
    for (let i = 0; i < enabledButtons.length; i++) {
      let button = enabledButtons[i];
      let spans =
        button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
          "span"
        );
      starttime = spans[4].innerHTML;
      endtime = spans[5].innerHTML;
      if (starttime < 12 && spans[5].innerHTML < 5) {
        button.style.border = "5px solid black";
      }
    }
  } else {
    console.log("No enabled buttons found.");
  }
}
