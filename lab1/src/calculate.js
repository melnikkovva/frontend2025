"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calc(inputString) {
    let cleanedString = '';
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (char !== '(' && char !== ')') {
            cleanedString += char;
        }
    }
    const tokens = cleanedString.split(' ').filter(token => token != '');
    const stack = [];
    let index = tokens.length - 1;
    for (index; index >= 0; index--) {
        let token = tokens[index];
        if (token == undefined) {
            break;
        }
        if (isNumber(token)) {
            stack.push(Number(token));
        }
        else {
            const a = stack.pop();
            const b = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    if (b != 0) {
                        stack.push(a / b);
                    }
                    else {
                        console.log('Ошибка: Деление на 0');
                    }
                    break;
            }
        }
    }
    ;
    const result = stack.pop();
    if (result === undefined || (stack.length > 0)) {
        console.log('Ошибка: Пустое выражение');
        return null;
    }
    return result;
}
function isNumber(str) {
    return !isNaN(Number(str));
}
console.log("Результаты тестов:");
console.log("+ 3 4 =", calc("+ 3 4"));
console.log("+ * 3 4 5 =", calc("+ * 3 4 5"));
console.log("* + 2 3 * 4 5 =", calc("* + 2 3 * 4 5"));
console.log("+ - * 2 3 4 / 6 2 =", calc("+ - * 2 3 4 / 6 2"));
console.log("* 5 6 =", calc("* 5 6"));
console.log("+ -5 3 =", calc("+ -5 3"));
console.log("- 10 -3 =", calc("- 10 -3"));
console.log("* -2 -4 =", calc("* -2 -4"));
console.log("/ -12 4 =", calc("/ -12 4"));
console.log("+ * -2 3 5 =", calc("+ * -2 3 5"));
console.log("+ 3.5 2.1 =", calc("+ 3.5 2.1"));
console.log("- 7.8 2.3 =", calc("- 7.8 2.3"));
console.log("* 1.5 4 =", calc("* 1.5 4"));
console.log("/ 9.6 2 =", calc("/ 9.6 2"));
console.log("+ / 10 4 * 1.5 2 =", calc("+ / 10 4 * 1.5 2"));
console.log("* -2.5 -0.4 =", calc("* -2.5 -0.4"));
console.log("- / -12 3 * 2.5 2 =", calc("- / -12 3 * 2.5 2"));
console.log('+ ( * 2.5 3 ) ( / -9 3 ) =', calc('+ ( * 2.5 3 ) ( / -9 3 )'));
console.log('* -4 5.5 =', calc('* -4 5.5'));
console.log('+ ( * (* 3 3) 3 ) ( / -9 3 ) =', calc('+ ( * (* 3 3) 3 ) ( / -9 3 ) '));
//# sourceMappingURL=calculate.js.map