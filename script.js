function add(summandA, summandB) {
    return summandA + summandB;
};

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
};

function multiply(factorA, factorB) {
    return factorA*factorB;
};

function divide(dividend, divisor) {
    return dividend/divisor;
};

function operate(operandA, operandB, operation) {
    switch (operation) {
        case "×":
            return multiply(operandA, operandB);
        case "+":
            return add(operandA, operandB);
        case "-":
            return subtract(operandA, operandB);
        case "÷":
            return divide(operandA, operandB);
    }
}

function clear() {
    screen.textContent = "0";
}

const mathSymbols = ["+", "-", "÷", "×"];

function isOperator(symbol) {
    return mathSymbols.some(operator => symbol == operator);
}

function inputMath() {
    const content = screen.textContent;
    if (content == "0") {
        if ("." == this.textContent) {
            screen.textContent += this.textContent;
        }
        else if (!isOperator(this.textContent)) {
            screen.textContent = this.textContent;
        }
    }
    else if (isOperator(content.slice(content.length - 1)) &&
        isOperator(this.textContent)) {
        screen.textContent = content.slice(0, content.length -1)
        + this.textContent;
    }
    else {
        screen.textContent += this.textContent;
    }
}

const screen = document.querySelector("#screen span");
const buttons = document.querySelectorAll(".printable");
buttons.forEach(button => button.addEventListener("click", inputMath))
const clearButton = document.querySelector("#clr");
clearButton.addEventListener("click", clear);