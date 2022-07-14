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
};

function clear() {
    screenSpan.textContent = "0";
};

function deleteLast() {
    const content = screenSpan.textContent;
    if (content.length != 1) {
        screenSpan.textContent = content.slice(0, content.length - 1);
    }
    else {
        screenSpan.textContent = "0";
    }
};

const mathSymbols = ["+", "-", "÷", "×"];

function isOperator(symbol) {
    return mathSymbols.some(operator => symbol == operator);
};

function findLastOperator(array) {
    let index = array.reverse().findIndex(symbol => isOperator(symbol));
    const lastIndex = array.length - 1;
    !(index + 1) ? index = lastIndex : null;
    return lastIndex - index;
};

function allowPoint(array) {
    return Boolean(!array.find(symbol => symbol == "."))
};

function stripOperator(string) {
    return mathSymbols.find(symbol => symbol == string[0]) ? string.slice(1) : string;
};

function extractLastNumber(string) {
    const lastOperator = findLastOperator(string.split(""));
    return stripOperator(string.slice(lastOperator));
};

function inputMath() {
    const content = screenSpan.textContent;
    const lastInput = content.slice(content.length - 1);
    const input = this.textContent;
    const lastNumber = extractLastNumber(content).split("");
    if (content == "0") {
        if (input == "." || isOperator(input)) {
            screenSpan.textContent = "0" + input;
        }
        else if (!(input == 0)) {
            screenSpan.textContent = input;
        }
    }
    else if (isOperator(lastInput)) {
        if (input == ".") {
            screenSpan.textContent += "0."
        }
        else if (isOperator(input)) {
            screenSpan.textContent = content.slice(0, content.length - 1) + input;
        }
        else {
            screenSpan.textContent += input;
        }
    }
    else  {
        if (!allowPoint(lastNumber) && input == ".") {
            null;
        }
        else if (lastNumber == "0" && input  != ".") {
            screenSpan.textContent = content.slice(0, content.length - 1) + "0";
        }
        else {
            screenSpan.textContent += input;
        }
    }
};

function findOperatorIndeces(charArray) {
    indeces = charArray.reduce((array, element, elementIndex) => {
        if (isOperator(element)) {
            array.push(elementIndex);
        }
        return array;
    }, [])
    return indeces;
};

function reduceString(charArray, precedence) {
    function isUnresolved() {
        operatorIndeces = findOperatorIndeces(charArray);
        switch (precedence) {
            case "first":
                nextIndexIndex = operatorIndeces.findIndex(index => /[×÷]/.test(charArray[index]));
                break;
            case "second":
                nextIndexIndex = operatorIndeces.findIndex(index => /[\+-]/.test(charArray[index]));
                break;
        }
        return nextIndexIndex != -1 ? true : false;
    }
    let operatorIndeces;
    let nextIndexIndex;
    while (isUnresolved()) {
        let previousOperatorIndex;
        let nextOperatorIndex;
        if (nextIndexIndex == 0) {
            previousOperatorIndex = 0 - 1;
        }
        else {
            previousOperatorIndex = operatorIndeces[nextIndexIndex - 1];
        }
        if (nextIndexIndex == operatorIndeces.length - 1) {
            nextOperatorIndex = charArray.length;
        }
        else {
            nextOperatorIndex = operatorIndeces[nextIndexIndex + 1];
        }
        const operatorIndex = operatorIndeces[nextIndexIndex];
        const operandA = parseFloat(charArray.slice(previousOperatorIndex + 1, operatorIndex).join(""));
        const operandB = parseFloat(charArray.slice(operatorIndex + 1, nextOperatorIndex).join(""));
        const operator = charArray[operatorIndex];
        const result = operate(operandA, operandB, operator);
        const newString = charArray.slice(0, previousOperatorIndex + 1).join("") +
            result +
            charArray.slice(nextOperatorIndex, charArray.length).join("");
        charArray = newString.split("");
    }
    return charArray;
}

function yieldResult() {
    let charArray = screenSpan.textContent.split("");
    charArray = reduceString(charArray, "first");
    charArray = reduceString(charArray, "second");
    newLine = document.createElement("span");
    newLine.textContent = charArray.join("");
    screen.appendChild(newLine);
};

const screen = document.querySelector("#screen");
const screenSpan = document.querySelector("#screen span");
const buttons = document.querySelectorAll(".printable");
buttons.forEach(button => button.addEventListener("click", inputMath))
const clearButton = document.querySelector("#clr");
clearButton.addEventListener("click", clear);
const delButton = document.querySelector("#del");
delButton.addEventListener("click", deleteLast);