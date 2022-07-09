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
        case "mult":
            return multiply(operandA, operandB);
        case "sum":
            return add(operandA, operandB);
        case "subt":
            return subtract(operandA, operandB);
        case "div":
            return divide(operandA, operandB);
    }
}

function clear() {
    screen.textContent = "0";
}

function inputMath() {
    if (screen.textContent == "0") {
        screen.textContent = this.textContent;
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