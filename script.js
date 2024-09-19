function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


let numberA = 0;
let numberB = 0;
let operator = "";

let displayValue = "0";
const display = document.querySelector("#display");

function updateDisplay() {
    display.textContent = parseFloat(displayValue);
}

function operate(operator, a, b) {
    return operator(a, b);
}


const numberButtons = Array.from(document
    .querySelector("#numbers")
    .querySelectorAll("button")
);

for (let button of numberButtons) {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        updateDisplay();
    });
}


const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", () => {
    displayValue = "0";
    updateDisplay();
});