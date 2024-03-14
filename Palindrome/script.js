const checkBTN = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

isPalindrome(checkBTN, result);

function isPalindrome(button, hidenText) {
  button.addEventListener("click", () => {
    //     let reversetextWithoutCharsPermit;

    //     var textContend = textInput.value;
    //     let textWithoutCharsPermit = textContend.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    //     const lengthOftextWithoutCharsPermit = textWithoutCharsPermit.length;

    //     if (textContend === "") {
    //       alert("Please input a value");
    //     }
    //     else if (lengthOftextWithoutCharsPermit % 2 !== 0 && lengthOftextWithoutCharsPermit > 1)
    //     {
    //         let positionToRemove = Math.floor(lengthOftextWithoutCharsPermit / 2);

    //         textWithoutCharsPermit = textWithoutCharsPermit.split("");

    //         textWithoutCharsPermit.splice(positionToRemove, 1);

    //         reversetextWithoutCharsPermit = [...textWithoutCharsPermit].reverse();

    //         var foundDifference = false;

    //         for (let i = 0; i < textWithoutCharsPermit.length; i++) {
    //             if (textWithoutCharsPermit[i] !== reversetextWithoutCharsPermit[i]) {
    //                 foundDifference = true;
    //             };
    //         };

    //         if(foundDifference)
    //         {
    //             hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
    //             <p>${textContend} is not a palindrome</p>
    //         </div>`;
    //         }
    //         else
    //         {
    //             hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
    //             <p>${textContend} is a palindrome</p>
    //         </div>`;
    //         };
    //     }
    //     else if(lengthOftextWithoutCharsPermit === 1)
    //     {
    //         hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
    //             <p>${textContend} is a palindrome</p>
    //         </div>`;
    //     }
    //     else
    //     {
    //         textWithoutCharsPermit = textWithoutCharsPermit.split("");
    //         reversetextWithoutCharsPermit = [...textWithoutCharsPermit].reverse();
    //         var foundDifference = false;

    //         for (let i = 0; i < textWithoutCharsPermit.length; i++) {
    //             if (textWithoutCharsPermit[i] !== reversetextWithoutCharsPermit[i]) {
    //                 foundDifference = true;
    //             };
    //         };

    //         if(foundDifference)
    //         {
    //             hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
    //             <p>${textContend} is not a palindrome</p>
    //         </div>`;
    //         }
    //         else
    //         {
    //             hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
    //             <p>${textContend} is a palindrome</p>
    //         </div>`;
    //         };

    //     };

// 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000//
// ******************* I think my code could be optimized this was the result*********************************** //
// 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000//

    var textContend = textInput.value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    if (textContend === "") {
      alert("Please input a value");
    } else {
      const textContendArr = textContend.split("").reverse();
      const reverseTextContend = textContendArr.join("");

      if (reverseTextContend === textContend) {
        hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
                <p>${textInput.value} is a palindrome</p>
            </div>`;
      } else {
        hidenText.innerHTML = `<div class="result" id="result" style="visibility: visible;height: auto;">
                <p>${textInput.value} is not a palindrome</p>
            </div>`;
      }
    }
  });
}
