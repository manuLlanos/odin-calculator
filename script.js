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


let numbers = [];
let operator = "";

let displayValue = "0";
const display = document.querySelector("#display");

function updateDisplay() {
    display.textContent = parseFloat(displayValue);
}

function clearDisplay() {
    displayValue = "0";
    updateDisplay();
}

function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
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
    clearDisplay();
    numbers = [];
    updateDisplay();
});

const operatorButtons = Array.from(document.querySelectorAll(".op-btn"));
for (let button of operatorButtons) {
    button.addEventListener("click", () => {
        if(numbers.length > 1) {
            numbers[0] = operate(operator, numbers[0], numbers[1]);
            numbers.pop();
        }
        numbers.push(parseFloat(displayValue));
        displayValue = "0";
        operator = button.textContent;
    })
}

const equalButton = document.querySelector("#equal-btn");
equalButton.addEventListener("click", () => {
    if(numbers.length === 0) {
        return;
    }
    numbers.push(parseFloat(displayValue));
    displayValue = operate(operator, ...numbers);
    updateDisplay();
    numbers = [];

});