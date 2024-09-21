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
let operator = null;
let displayValue = "0";

const display = document.querySelector("#display");

function updateDisplay() {
    let n = limitDigits(parseFloat(displayValue), 12);
    display.textContent = n;
}

function limitDigits(num, maxDigits) {
    let strValue = num.toString();

    const isNegative = strValue.startsWith("-");

    if (isNegative) {
        strValue = strValue.slice(1);
    }

    [whole, decimal] = strValue.split(".");

    if(whole.length > maxDigits) {
        return (isNegative ? "-" : "") + Number(strValue).toExponential(maxDigits - 1);
    }

    if (decimal && (whole.length + decimal.length) > maxDigits) {
        decimal = decimal.slice(0, maxDigits - whole.length);
    }

    let result = isNegative ? "-" + whole : whole;
    if(decimal) {
        result += "." + decimal;
    }

    return result;
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

function handleCalculations() {
    numbers[0] = operate(operator, numbers[0], numbers[1]);
    numbers.pop();

    displayValue = numbers[0];
    updateDisplay();
}


const numberButtons = Array.from(document.querySelectorAll(".number-btn"));

for (let button of numberButtons) {
    button.addEventListener("click", () => {
        displayValue += button.textContent;
        updateDisplay();
    });
}


const decimalButton = document.querySelector("#decimal-btn");
decimalButton.addEventListener("click", () => {
    if (displayValue.includes(decimalButton.textContent)) return;
    displayValue += decimalButton.textContent;
});

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

        if (numbers.length == 2) handleCalculations();

        operator = button.textContent;
        displayValue = "0";
    })
}

const equalButton = document.querySelector("#equal-btn");
equalButton.addEventListener("click", () => {
    if (numbers.length == 0 || operator === null) return;

    numbers.push(parseFloat(displayValue));
    handleCalculations();
    numbers = [];
    operator = null;

});


//debugging

for (let button of Array.from(document.querySelectorAll("button"))) {
    button.addEventListener("click", () => {
        console.log(displayValue, numbers);
    })
}