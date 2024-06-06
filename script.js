let screen = document.getElementById('cScreen');
let screenValue = '0';
let pendingOperation = null;
let firstOperand = null;
let shouldResetScreen = false;

function inputDigit(digit) {
    if (shouldResetScreen) {
        screenValue = digit;
        shouldResetScreen = false;
    } else {
        screenValue = screenValue === '0' ? digit : screenValue + digit;
    }
    update();
}

function inputDecimal() {
    if (shouldResetScreen) {
        screenValue = '0.';
        shouldResetScreen = false;
    } else if (!screenValue.includes('.')) {
        screenValue += '.';
    }
    update();
}

function inputOperator(operator) {
    if (pendingOperation !== null) {
        calculateResult();
    }
    firstOperand = parseFloat(screenValue);
    pendingOperation = operator;
    shouldResetScreen = true;
}

function calculateResult() {
    if (pendingOperation === null || shouldResetScreen) return;
    let secondOperand = parseFloat(screenValue);
    switch (pendingOperation) {
        case '+':
            screenValue = (firstOperand + secondOperand).toString();
            break;
        case '-':
            screenValue = (firstOperand - secondOperand).toString();
            break;
        case '*':
            screenValue = (firstOperand * secondOperand).toString();
            break;
        case '/':
            screenValue = (firstOperand / secondOperand).toString();
            break;
    }
    pendingOperation = null;
    firstOperand = null;
    shouldResetScreen = true;
    update();
}

function calculateSquareRoot() {
    screenValue = Math.sqrt(parseFloat(screenValue)).toString();
    update();
}

function toggleSign() {
    screenValue = (parseFloat(screenValue) * -1).toString();
    update();
}

function clearAll() {
    screenValue = '0';
    firstOperand = null;
    pendingOperation = null;
    shouldResetScreen = false;
    update();
}

function clearEntry() {
    screenValue = '0';
    update();
}

function update() {
    screen.textContent = screenValue;
}
