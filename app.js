//Ajouter 0 , POINT , CE , BACKARROW
///METTRE VIRGULE SI CHIFFRE + HAUT QUE 10 000
//Apres une equation (5+5) = 10..Si on repese sur EGALE tjr continuer avec le precedant OPERATOR (5+5) = 10..=15=20=25....
///Ajouter une section / bouton MEMOIRE

const body = document.querySelector("body");
const h2 = document.querySelector("h2");

///Hover ZOOM on H2///
const calculatorText = "Calculator";

for (let i = 0; i < calculatorText.length; i++) {
  const spanHeader = document.createElement("span");
  spanHeader.setAttribute("id", "letterHeader-" + i);
  spanHeader.innerText = calculatorText.charAt(i);
  h2.appendChild(spanHeader);
  document
    .getElementById("letterHeader-" + i)
    .addEventListener("mouseover", () => {
      document.getElementById("letterHeader-" + i).style.fontSize = "55px";
      document.getElementById("letterHeader-" + i).style.color = "#7595ec";
    });
  document
    .getElementById("letterHeader-" + i)
    .addEventListener("mouseout", () => {
      document.getElementById("letterHeader-" + i).style.fontSize = "48px";
      document.getElementById("letterHeader-" + i).style.color = "#547df0";
    });
}
///
///Object OPERATOR / NUMBER + VARIABLES
const calculator = {
  displayValue: "0",
  displayValueTop: "",
  firstNumber: null,
  secondNumber: null,
  isSecondNumber: false,
  operator: null,
};
let total = 0;
let equalButton = false;
let operatorButton = false;
let operatorRightAfterEqual = false;
///
///FUNCTION Create TEXT in SCREEN///
const digitScreenUp = document.getElementById("digitScreenUp");
const digitScreenDown = document.getElementById("digitScreenDown");

const updateDisplay = () => {
  digitScreenDown.innerText = calculator.displayValue;
};
const updateDisplayTop = () => {
  digitScreenUp.innerText = calculator.displayValueTop;
};
///UPDATE TOTAL///
const updateDisplayTotal = () => {
  if (total === 0) {
    if (calculator.operator === " + ") {
      total = Number(calculator.firstNumber) + Number(calculator.secondNumber);
    } else if (calculator.operator === " - ") {
      total = Number(calculator.firstNumber) - Number(calculator.secondNumber);
    } else if (calculator.operator === " x ") {
      total = Number(calculator.firstNumber) * Number(calculator.secondNumber);
    } else if (calculator.operator === " ÷ ") {
      total = Number(calculator.firstNumber) / Number(calculator.secondNumber);
    }
  } else {
    if (calculator.operator === " + ") {
      total = total + Number(calculator.displayValue);
    } else if (calculator.operator === " - ") {
      total = total - Number(calculator.displayValue);
    } else if (calculator.operator === " x ") {
      total = total * Number(calculator.displayValue);
    } else if (calculator.operator === " ÷ ") {
      total = total / Number(calculator.displayValue);
    }
  }
  digitScreenDown.innerText = total;
};
///
///FUNCTION///
///More Number display
const moreDigit = (digit) => {
  const value = calculator.displayValue;
  if (value === "0") {
    calculator.displayValue = digit;
  } else {
    calculator.displayValue = value + digit;
  }
};
///Reset Button C
const reset = () => {
  calculator.displayValue = "0";
  calculator.displayValueTop = "";
  calculator.firstNumber = null;
  calculator.secondNumber = null;
  calculator.isSecondNumber = false;
  calculator.operator = null;
  equalButton = false;
  total = 0;
  updateDisplay();
  updateDisplayTop();
};
///Reset Button CE
const resetScreen = () => {
  calculator.displayValue = "0";
  updateDisplay();
};
///Small Reset
const smallReset = () => {
  calculator["isSecondNumber"] = false;
  calculator["firstNumber"] = null;
  calculator["secondNumber"] = null;
};
///
///Start Calculator///
///
updateDisplay();
///On-Click Command///
const key = document
  .querySelector(".containerButton")
  .addEventListener("click", (event) => {
    const target = event.target;
    ///
    ///BACK REMOVE BUTTON///
    if (target.matches(".buttonBack") && calculator.displayValue !== "0") {
      calculator.displayValue = calculator.displayValue.slice(
        0,
        calculator.displayValue.length - 1
      );
      if (calculator.displayValue === "") {
        calculator.displayValue = "0";
      }
      updateDisplay();
    }
    ///
    ///FIRST NUMBER BUTTON///
    if (
      target.matches(".button") &&
      calculator.isSecondNumber === false &&
      equalButton === false
    ) {
      moreDigit(target.value);
      updateDisplay();
      calculator["displayValueTop"] = calculator.displayValueTop + target.value;
      operatorButton = true;
      ///
      ///SECOND NUMBER BUTTON///
    } else if (
      target.matches(".button") &&
      calculator.isSecondNumber === true
    ) {
      if (calculator.secondNumber === null) {
        calculator.displayValue = target.value;
        calculator.secondNumber = target.value;
        updateDisplay();
      } else {
        moreDigit(target.value);
        updateDisplay();
        calculator["secondNumber"] = target.value;
        calculator["isSecondNumber"] = true;
      }
      operatorButton = true;
    }
    ///
    ///OPERATOR BUTTON///
    if (operatorButton) {
      if (target.matches(".buttonOperator")) {
        if (
          calculator.operator !== null &&
          target.value === calculator.operator
        ) {
          calculator["secondNumber"] = calculator.displayValue;
          calculator["operator"] = target.value;
          updateDisplayTotal();
          smallReset();
          calculator["displayValueTop"] = total;
          calculator["displayValue"] = total;
          updateDisplay();
          equalButton = false;

          ///OPERATOR AFTER EQUAL BUTTON///
        } else if (calculator.operator === null && equalButton === true) {
          calculator["operator"] = target.value;
          calculator["firstNumber"] = total;
          equalButton = false;
          operatorRightAfterEqual = true;
          ///NUMBER TO ANOTHER OPERATOR///
        } else if (
          target.value !== calculator.operator &&
          calculator.operator !== null
        ) {
          calculator["secondNumber"] = calculator.displayValue;
          updateDisplayTotal();
          smallReset();
          calculator["operator"] = target.value;
          calculator["displayValueTop"] = total;
          calculator["displayValue"] = total;
        }
        if (operatorRightAfterEqual) {
          calculator["displayValueTop"] = total + calculator.operator;
          updateDisplayTop();
          operatorRightAfterEqual = false;
          calculator["isSecondNumber"] = true;
          operatorButton = false;
        } else {
          ///
          ///FIRST OPERATOR THAT WE CHOOSE///
          calculator["firstNumber"] = calculator.displayValue;
          calculator["displayValueTop"] =
            calculator.displayValue + target.value;
          calculator["operator"] = target.value;
          calculator["isSecondNumber"] = true;
          updateDisplayTop();
          operatorButton = false;
        }
      }
      ///OPERATOR TO ANOTHER OPERATOR RIGHT AFTER///
    } else if (
      operatorButton === false &&
      calculator.operator !== target.value &&
      target.matches(".buttonOperator")
    ) {
      calculator["operator"] = target.value;
      calculator.displayValueTop = total + calculator.operator;
      updateDisplayTop();
    }
    ///
    ///TOTAL BUTTON///
    if (
      target.matches(".buttonOperatorTotal") &&
      calculator.secondNumber !== null
    ) {
      if (!equalButton && operatorButton) {
        calculator["secondNumber"] = calculator.displayValue;
        calculator.displayValueTop =
          calculator.firstNumber +
          calculator.operator +
          calculator.secondNumber +
          " =";
        updateDisplayTotal();
        updateDisplayTop();
        smallReset();
        calculator.operator = null;
        equalButton = true;
        operatorButton = true;
      }
    }
    ///
    ///RESET C BUTTON///
    if (target.matches(".buttonReset")) {
      reset();
    }
    ///
    ///RESET CE BUTTON///
    if (target.matches(".buttonResetScreen")) {
      resetScreen();
    }
  });
