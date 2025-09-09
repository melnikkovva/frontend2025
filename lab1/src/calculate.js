"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calc(inputString) {
    let State;
    (function (State) {
        State[State["START"] = 0] = "START";
        State[State["NUMBER"] = 1] = "NUMBER";
        State[State["OPERATOR"] = 2] = "OPERATOR";
        State[State["ERROR"] = 3] = "ERROR";
    })(State || (State = {}));
    ;
    let state = State.START;
    let currentNumber = '';
    let outputStack = [];
    let operatorStack = [];
    let i = 0;
    while (i < inputString.length) {
        let char = inputString[i];
        if (char === undefined) {
            break;
        }
        switch (state) {
            case State.START:
                if (isNumber(char)) {
                    state = State.NUMBER;
                    currentNumber = char;
                }
                else if (isOperator(char)) {
                    state = State.OPERATOR;
                    operatorStack.push(char);
                }
                else if (isAcceptableCharacters(char)) {
                    state = State.START;
                }
                else {
                    state = State.ERROR;
                }
                break;
            case State.NUMBER:
                if (isNumber(char)) {
                    currentNumber += char;
                }
                else {
                    outputStack.push(Number(currentNumber));
                    currentNumber = '';
                    if (isOperator(char)) {
                        state = State.OPERATOR;
                        operatorStack.push(char);
                    }
                    else if (isAcceptableCharacters(char)) {
                        state = State.START;
                    }
                    else {
                        state = State.ERROR;
                    }
                }
                break;
            case State.OPERATOR:
                if (isOperator(char)) {
                    performOperation();
                    operatorStack.push(char);
                    state = State.OPERATOR;
                }
                else if (isNumber(char)) {
                    state = State.NUMBER;
                    currentNumber = char;
                }
                else if (isAcceptableCharacters(char)) {
                    state = State.START;
                }
                else {
                    state = State.ERROR;
                }
                break;
            case State.ERROR:
                throw new Error("Ошибка в выражении");
        }
        i++;
    }
    if (currentNumber !== '') {
        outputStack.push(Number(currentNumber));
    }
    while (operatorStack.length > 0) {
        performOperation();
    }
    if (outputStack.length !== 1) {
        throw new Error("ошибка в выражении");
    }
    const result = outputStack[0];
    console.log(`calc("${inputString}") = ${result}`);
    function performOperation() {
        if (operatorStack.length === 0 || outputStack.length < 2) {
            throw new Error("Недостаточно операндов для операции");
        }
        const operator = operatorStack.pop();
        const right = outputStack.pop();
        const left = outputStack.pop();
        switch (operator) {
            case "+":
                outputStack.push(left + right);
                break;
            case "-":
                outputStack.push(left - right);
                break;
            case "*":
                outputStack.push(left * right);
                break;
            case "/":
                if (right === 0) {
                    throw new Error("Деление на ноль");
                }
                outputStack.push(left / right);
                break;
            default:
                throw new Error(`Неизвестная операция: ${operator}`);
        }
    }
}
function isNumber(char) {
    return char >= '0' && char <= '9';
}
function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}
function isAcceptableCharacters(char) {
    const acceptableCharacters = ["(", ")", " "];
    return acceptableCharacters.includes(char);
}
console.log("Результаты тестов:");
calc("+ 3 4");
calc("* ( - 5 6 ) 7");
calc("+ * 3 4 5");
calc("- / * 10 2 5 3");
calc("+ ( * 2 3 ) ( / 8 4 )");
calc("+ * 2 3 * 4 5");
calc("+ - * 2 3 4 / 6 2");
calc("* -4 -3");
calc("* ( + -2 5 ) 3");
//# sourceMappingURL=calculate.js.map