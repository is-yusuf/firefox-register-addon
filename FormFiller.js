class FormFiller {
  static fillForm(comment, firstname, lastname, email) {
    // If not logged in, uncomment
    // const form_firstname = document.querySelector("#firstname");
    // const form_lastname = document.querySelector("#lastname");
    // const form_email = document.querySelector("#email");
    let form_comment = document.querySelector('[data-ng-model="i.mycomment"]');
    const confirm = document.querySelector(".btn-success");

    FormFiller.checkInputs(form_comment, confirm, comment);
  }

  static checkInputs(form_comment, confirm, comment) {
    if (!form_comment) {
      setTimeout(
        () => FormFiller.checkInputs(form_comment, confirm, comment),
        10
      );
    } else {
      form_comment.value = comment;
      form_comment.dispatchEvent(
        new Event("change", { bubbles: true, cancelable: true })
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
      confirm.click();
    }
  }
}
