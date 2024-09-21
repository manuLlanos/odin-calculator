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
    displayValue = "0";
    numbers = [];
    updateDisplay();
});

const operatorButtons = Array.from(document.querySelectorAll(".op-btn"));
for (let button of operatorButtons) {
    button.addEventListener("click", () => {
        numbers.push(parseFloat(displayValue));

        if (numbers.length == 2) {
            numbers[0] = operate(operator, numbers[0], numbers[1]);
            numbers.pop();

            displayValue = numbers[0];
            updateDisplay();
        }

        operator = button.textContent;
        displayValue = "0";
    })
}


//debugging

for (let button of Array.from(document.querySelectorAll("button"))) {
    button.addEventListener("click", () => {
        console.log(displayValue, numbers);
    })
}