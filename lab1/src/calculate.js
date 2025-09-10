"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calc(inputString) {
    let State;
    (function (State) {
        State[State["START"] = 0] = "START";
        State[State["NUMBER"] = 1] = "NUMBER";
        State[State["OPERATOR"] = 2] = "OPERATOR";
        State[State["WHITESPACE"] = 3] = "WHITESPACE";
        State[State["ERROR"] = 4] = "ERROR";
    })(State || (State = {}));
    ;
    let state = State.START;
    let currentNumber = '';
    let outputStack = [];
    let operatorStack = [];
    let i = 0;
    const chars = inputString.split('');
    while (i < chars.length) {
        let char = chars[i];
        if (char === undefined) {
            break;
        }
        switch (state) {
            case State.START:
                if (isNumber(char) || (char === '-' && i + 1 < chars.length && isNumber(chars[i + 1]))) {
                    state = State.NUMBER;
                    currentNumber = char;
                }
                else if (isOperator(char)) {
                    state = State.OPERATOR;
                    operatorStack.push(char);
                }
                else if (char === '(' || char === ')') {
                    state = State.START;
                }
                else if (char === ' ') {
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
                    else if (char === '(' || char === ')') {
                        state = State.START;
                    }
                    else if (char === ' ') {
                        state = State.START;
                    }
                    else {
                        state = State.ERROR;
                    }
                    continue;
                }
                break;
            case State.OPERATOR:
                if (isOperator(char)) {
                    performOperation();
                    operatorStack.push(char);
                }
                else if (isNumber(char) || (char === '-' && i + 1 < chars.length && isNumber(chars[i + 1]))) {
                    state = State.NUMBER;
                    currentNumber = char;
                }
                else if (char === '(' || char === ')') {
                    state = State.START;
                }
                else if (char === ' ') {
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
        throw new Error("Ошибка в выражении");
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
console.log("Результаты тестов:");
calc("+ 3 4"); // 7
calc("* ( - 5 6 ) 7"); // -7
calc("+ * 3 4 5"); // 17
calc("- / * 10 2 5 3"); // 1
calc("+ ( * 2 3 ) ( / 8 4 )"); // 8
calc("+ * 2 3 * 4 5"); // 26
calc("+ - * 2 3 4 / 6 2"); // 5
calc("* -4 -3"); // 12
calc("* ( + -2 5 ) 3"); // 9
//# sourceMappingURL=calculate.js.map