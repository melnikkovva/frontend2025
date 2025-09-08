"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calc(inputString) {
    const tokens = inputString.split(" ").filter(token => token !== "");
    const stack = [];
    const outputLine = [];
    for (const token of tokens) {
        if (isNumber(token)) {
            outputLine.push(Number(token));
        }
        else if (isMathOperation(token)) {
            while (stack.length > 0) {
                const topOperation = stack[stack.length - 1];
                if (topOperation && isMathOperation(topOperation)) {
                    if (getPriority(topOperation) >= getPriority(token)) {
                        const operation = stack.pop();
                        if (operation) {
                            applyOperation(operation, outputLine);
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            stack.push(token);
        }
        else if (token === "(") {
            stack.push("(");
        }
        else if (token === ")") {
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                const operation = stack.pop();
                applyOperation(operation, outputLine);
            }
            if (stack.length === 0 || stack.pop() !== "(") {
                throw new Error("Ошибка со скобками: отсутствует открывающая скобка");
            }
        }
        else {
            throw new Error(`Неизвестный токен: ${token}`);
        }
    }
    while (stack.length > 0) {
        const operation = stack.pop();
        if (operation === "(") {
            throw new Error("Ошибка со скобками: отсутствует закрывающая скобка");
        }
        applyOperation(operation, outputLine);
    }
    const result = outputLine.pop();
    if (result === undefined || outputLine.length > 0 || stack.length > 0) {
        throw new Error("Некорректное выражение");
    }
    console.log(`calc("${inputString}") = ${result}`);
}
function isNumber(value) {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}
function isMathOperation(value) {
    return (value === "+") || (value === "-") || (value === "*") || (value === "/");
}
function getPriority(operation) {
    if (operation === "+" || operation === "-") {
        return 1;
    }
    else if (operation === "*" || operation === "/") {
        return 2;
    }
    return 0;
}
function applyOperation(operation, output) {
    if (output.length < 2) {
        throw new Error("Недостаточно чисел для операции");
    }
    const right = output.pop();
    const left = output.pop();
    switch (operation) {
        case "+":
            output.push(left + right);
            break;
        case "-":
            output.push(left - right);
            break;
        case "*":
            output.push(left * right);
            break;
        case "/":
            if (right === 0) {
                throw new Error("Деление на ноль");
            }
            output.push(left / right);
            break;
        default:
            throw new Error(`Неизвестная операция: ${operation}`);
    }
}
console.log("Результаты тестов:");
calc("+ 3 4");
calc("* ( - 5 6 ) 7");
calc("+ * 3 4 5");
calc("- 10 3");
//# sourceMappingURL=calculate.js.map