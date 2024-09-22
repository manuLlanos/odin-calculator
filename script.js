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
let isNewInput = false;
let displayValue = "0";

const display = document.querySelector("#display");

function updateDisplay() {
    let n = limitDigits(parseFloat(displayValue), 12);
    display.textContent = n;
}

function limitDigits(num, maxDigits) {
    let strValue = num.toString();

    if (strValue.includes("e")) {
        //exponent can be 2 characters or more, like +4 or +247
        [coefficient, exponent] = strValue.split("e");

        const remainingDigits = maxDigits - 1 - exponent.length;

        return limitDigits(coefficient, remainingDigits) + `e${exponent}`;
    }

    const isNegative = strValue.startsWith("-");

    if (isNegative) {
        strValue = strValue.slice(1);
    }

    [whole, decimal] = strValue.split(".");

    if (whole.length > maxDigits) {
        return (isNegative ? "-" : "") + Number(strValue).toExponential(maxDigits - 1);
    }

    if (decimal && (whole.length + decimal.length) > maxDigits) {
        decimal = decimal.slice(0, maxDigits - whole.length);
    }

    let result = isNegative ? "-" + whole : whole;
    if (decimal) {
        result += "." + decimal;
    }

    return result;
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

function handleCalculations() {
    numbers[0] = operate(operator, numbers[0], numbers[1]);
    numbers.pop();

    displayValue = numbers[0];
    updateDisplay();
}


function clearVariables() {
    displayValue = "0";
    numbers = [];
}

const numberButtons = Array.from(document.querySelectorAll(".number-btn"));

for (let button of numberButtons) {
    button.addEventListener("click", () => {
        if (isNewInput) {
            displayValue = "0";
            isNewInput = false;
        }
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
    clearVariables();
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
    if (operator === "/" && parseFloat(displayValue) === 0) {
        display.textContent = ">:(";
        clearVariables();
        return;
    }

    numbers.push(parseFloat(displayValue));
    handleCalculations();
    isNewInput = true;
    numbers = [];
    operator = null;

});

const signButton = document.querySelector("#sign-btn");
signButton.addEventListener("click", () => {
    let displayStr = displayValue.toString();

    displayValue = displayStr.startsWith("-") ? displayStr.slice(1) : "-" + displayStr;

    updateDisplay();
});


const deleteButton = document.querySelector("#delete-btn");
deleteButton.addEventListener("click", () => {
    let displayStr = displayValue.toString();

    if(displayStr.length === 0) {
        return;
    }

    displayValue = displayStr.slice(0, -1);

    updateDisplay();
});