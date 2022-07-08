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