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

function deleteLast() {
    const content = screen.textContent;
    if (content != "0") {
        screen.textContent = content.slice(0, content.length - 1);
    }
}

const mathSymbols = ["+", "-", "÷", "×"];

function isOperator(symbol) {
    return mathSymbols.some(operator => symbol == operator);
}

function findLastOperator(array) {
    let index = array.reverse().findIndex(symbol => isOperator(symbol));
    const lastIndex = array.length - 1;
    !(index + 1) ? index = lastIndex : null;
    return lastIndex - index;
}

function allowPoint(array) {
    return Boolean(!array.find(symbol => symbol == "."))
}

function stripOperator(string) {
    return mathSymbols.find(symbol => symbol == string[0]) ? string.slice(1) : string;
}

function extractLastNumber(string) {
    const lastOperator = findLastOperator(string.split(""));
    return stripOperator(string.slice(lastOperator));
}

function inputMath() {
    const content = screen.textContent;
    const lastInput = content.slice(content.length - 1);
    const input = this.textContent;
    const lastNumber = extractLastNumber(content).split("");
    if (content == "0") {
        if (input == "." || isOperator(input)) {
            screen.textContent = "0" + input;
        }
        else if (!(input == 0)) {
            screen.textContent = input;
        }
    }
    else if (isOperator(lastInput)) {
        if (input == ".") {
            screen.textContent += "0."
        }
        else if (isOperator(input)) {
            screen.textContent = content.slice(0, content.length - 1) + input;
        }
        else {
            screen.textContent += input;
        }
    }
    else  {
        if (!allowPoint(lastNumber) && input == ".") {
            null;
        }
        else if (lastNumber == "0" && input  != ".") {
            screen.textContent = content.slice(0, content.length - 1) + "0";
        }
        else {
            screen.textContent += input;
        }
    }
}

const screen = document.querySelector("#screen span");
const buttons = document.querySelectorAll(".printable");
buttons.forEach(button => button.addEventListener("click", inputMath))
const clearButton = document.querySelector("#clr");
clearButton.addEventListener("click", clear);
const delButton = document.querySelector("#del");
delButton.addEventListener("click", deleteLast);