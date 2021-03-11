/**
 * Calculates the Mathematical expression as String
 * @param {String} input math expression in String format
 * @returns result if the syntax is correct, error message in case of an error.
 */
export function calculate(input) {
    if (!input || !input.trim()) {
        return {'successFlag' : false, 'message': 'No Math string found in input area.'}
    }
    var allowedCharacters = /^[\d+*\-%/().\s]+$/g
    if (!validateFormat(allowedCharacters, input)) {
        return {'successFlag' : false, 'message': 'Invalid Input entered in the text field.'}
    }
    if (input.startsWith('+') ||input.startsWith('-')) {
        input = '0'+input
    }
    return evaluate(input.replace(/\s/g, ''))
}

/**
 * Evaluates the mathematical expression by calculating the 
 * inner expressions in parenthesis one at a time
 * @param {String} textExp Test Expression
 * @returns result if the syntax is correct, error message in case of an error.
 */
function evaluate (textExp) {
    var innerExpCheck = textExp.indexOf('(')
    if (innerExpCheck === -1) {
       var acceptedFormat = /^[+-]?((\.\d+)|\d+(\.\d+)?)\s?([+*%\-/]\s?[+-]?((\.\d+)|\d+(\.\d+)?)\s?)*$/g
        if (!validateFormat(acceptedFormat, textExp)) {
            return {'successFlag' : false, 'message': 'Syntax Error.'}
        }
        //To-Do implementation
        return calculateSimpleExpression(textExp)
    } else {
        var firstCloseExp = textExp.indexOf(')')
        if (firstCloseExp === -1) {
            return {'successFlag' : false, 'message': 'Syntax Error.'}
        }
        var priorOpenExp = textExp.substring(0, firstCloseExp).lastIndexOf('(')
        var innerExp = textExp.substring(priorOpenExp+1, firstCloseExp)
        var result = evaluate(innerExp);
        if (result.successFlag) {
            const targetStr = ('('+innerExp+')').replace(/[-/*+.()]/g, '\\$&')
            const regex = new RegExp(targetStr, 'g')
            textExp = textExp.replace(regex, result.value)
            return evaluate(textExp)
        } else {
            return result;
        }
    }
}

/**
 * Validates Format of the string
 * @param {String} regex Regular expression to be matched against
 * @param {String} testString String to be tested
 * @returns True if test string matched with the regular expression, otherwise false
 */
function validateFormat (regex, testString) {
    return regex.test(testString);
}

/**
 * Calculates the result of a mathematical expression without parenthesis
 * @param {String} simpleExp Simple mathematic expression with +, -, *, %, /
 * @returns calculated result
 */
function calculateSimpleExpression (simpleExp) {
    if (simpleExp.substring(1).search(/[*/%+-]/) === -1) {
        return {'successFlag' : true, 'value': simpleExp}
    }
    var op = -1
    var begin = 0
    var end = -1
    var num1 = 0
    var num2 = 0
    var p1 = simpleExp.search(/[*/%]/)
    if (p1 === -1) {
        for (var i=1; i <simpleExp.length;i++) {
            if (simpleExp.charAt(i) === '+' || simpleExp.charAt(i) === '-') {
                op = i;
                break;
            }
        }
    } else {
        op = simpleExp.search(/[*/%]/)
        for (var j=op-1; j >=0;j--) {
            if (simpleExp.charAt(j) === '+' || simpleExp.charAt(j) === '-') {
                if (j === 0 || (simpleExp.charAt(j-1) === '+' || simpleExp.charAt(j-1) === '-')) {
                    begin = j
                } else {
                    begin = j+1
                }
            break;
            }
        }
    }
    num1 = Number(simpleExp.substring(begin, op))
    for (var k=op+2; k < simpleExp.length; k++) {
        if (simpleExp.charAt(k) === '+' || simpleExp.charAt(k) === '-' || simpleExp.charAt(k) === '*'
            || simpleExp.charAt(k) === '%' || simpleExp.charAt(k) === '/') {
            end = k;
            break;
        }
    }
    if (end === -1) {
        end = simpleExp.length
    }
    num2 = Number(simpleExp.substring(op+1, end))
    var replaceString = simpleExp.substring(begin,end)
    var replaceValue = performOperation(simpleExp.substring(op, op+1), num1, num2)
    simpleExp = simpleExp.replace(replaceString, replaceValue)
    return calculateSimpleExpression(simpleExp)
}

/**
 * Performs Basic Arithmetic Operations
 * @param {String} operator (+, -, *, %, /) the operation needs to performed
 * @param {Number} val1 Value 1
 * @param {Number} val2 Value 2
 * @returns result based on the operator choosen
 */
function performOperation (operator, val1, val2) {
    if (operator === '+') {
        return val1 + val2
    } else if (operator === '-') {
        return val1 - val2
    } else if (operator === '*') {
        return val1 * val2
    } else if (operator === '%') {
        return val1 % val2
    } else if (operator === '/') {
        return val1 / val2
    }
}