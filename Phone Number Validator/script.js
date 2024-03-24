const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const form = document.getElementById("my-form");

let validOrInvalid = "";

const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

const isValidPhone = (button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (userInput.value === "") alert("Please provide a phone number");
    else {
      if (phoneRegex.test(userInput.value)) {
        validOrInvalid = "Valid";
      } else {
        validOrInvalid = "Invalid";
      }
    }
    const result = `<div id="results-div" style="visibility: visible;">
        <p>${validOrInvalid} US number: ${userInput.value}</p>
        </div>`;
    document.getElementById("results-div").innerHTML = result;
  });
};

const clearPhone = (button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    document.getElementById("results-div").innerHTML = "";
  });
};

isValidPhone(checkBtn);
clearPhone(clearBtn);
