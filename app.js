let values = document.querySelectorAll("button");
let h1 = document.querySelector("#result");
let resultBtn = document.getElementById("#result-btn");
let firstValue = 0;
let awaitingNext = false;
let operatorValue = "";
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

let sendValue = (num) => {
  if (awaitingNext) {
    h1.textContent = num;
    awaitingNext = false;
  } else {
    let value = h1.textContent;
    h1.textContent = value === "0" ? num : value + num;
  }
};
let resetAll = () => {
  firstValue = 0;
  operatorValue = "";
  awaitingNext = false;
  h1.textContent = "0";
};
let addDecimal = () => {
  if (!h1.textContent.includes(".")) {
    h1.textContent = `${h1.textContent}.`;
  }
};
let sendOperator = (operand) => {
  let currentNumber = Number(h1.textContent);
  if (operatorValue && awaitingNext) {
    operatorValue = operand;
    return;
  }
  if (!firstValue) {
    firstValue = currentNumber;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentNumber);
    h1.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNext = true;
  operatorValue = operand;
};
values.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.length === 0) {
      sendValue(btn.value);
    } else if (btn.classList.contains("clear")) {
      resetAll();
    } else if (btn.classList.contains("operator")) {
      sendOperator(btn.value);
    } else if (btn.classList.contains("dot")) {
      addDecimal();
    }
  });
});
