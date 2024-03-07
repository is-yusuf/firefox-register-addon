import { availability, details } from './config.js';

class ButtonChecker {
  constructor(querySelector) {
    this.querySelector = querySelector;
    this.signupButtons = document.querySelectorAll(this.querySelector);
  }

  checkSignupButtons() {
    this.signupButtons = document.querySelectorAll(this.querySelector);
    if (this.signupButtons.length === 0) {
      setTimeout(() => this.checkSignupButtons(), 10);
    } else {
      setTimeout(() => this.registerer(), 10);
    }
  }

  registerer() {
    this.signupButtons = document.querySelectorAll(this.querySelector);
    const enabledButtons = Array.from(this.signupButtons).filter(
      (button) => !button.disabled
    );

    if (enabledButtons.length > 0) {
      for (let i = 0; i < enabledButtons.length; i++) {
        let button = enabledButtons[i];
        let spans =
          button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(
            "span"
          );
        let starttime = spans[4].innerHTML;
        let endtime = spans[5].innerHTML;
        

        console.log(starttime, endtime);
        console.log(isWithinAvailability(availability, starttime, endtime));
        if (isWithinAvailability(availability, starttime, endtime)) {
          button.style.border = "5px solid black";
          button.click();
          const submit_button =
            document.querySelectorAll(".btn-signup-submit")[0];
          submit_button.click();

          setTimeout(() => {
            FormFiller.fillForm(
              details.comment,
              details.firstname,
              details.lastname,
              details.email
            );
          }, 800);
          return;
        }
      }
      enabledButtons[0].click();
      const submit_button = document.querySelectorAll(".btn-signup-submit")[0];
      submit_button.click();

      setTimeout(() => {
        FormFiller.fillForm(
          details.comment,
          details.firstname,
          details.lastname,
          details.email
        );
      }, 800);
    } else {
      registerer();
      console.log("No enabled buttons found.");
    }
  }
}

function isWithinAvailability(availability, string1, string2) {
  const availabilityInMinutes = availability.map((timeRange) => {
    return timeRange.split("-").map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + (minutes || 0);
    });
  });

  function timeStringToMinutes(timeString) {
    let [time, modifier] = timeString.split(/(am|pm)/);
    let [hours, minutes] = time.split(":").map(Number);
    if (hours === 12) hours = 0; // Convert 12am or 12pm to 0 hours for calculation
    if (modifier === "pm") hours += 12; // Convert pm times to 24-hour format
    return hours * 60 + (minutes || 0);
  }

  const startMinutes = timeStringToMinutes(string1);
  const endMinutes = string2 ? timeStringToMinutes(string2) : startMinutes;

  return availabilityInMinutes.some(([start, end]) => {
    return start <= startMinutes && endMinutes <= end;
  });
}
