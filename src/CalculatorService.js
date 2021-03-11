export function calculate(input) {
    var allowedCharacters = /^[\d+*\-%/()\. ]+$/g
    if (!validateFormat(allowedCharacters, input)) {
        return {'successFlag' : false, 'message': 'Invalid Input.'}
    }
    return evaluate(input.replaceAll(' ', ''))
}

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
            textExp = textExp.replaceAll('('+innerExp+')', result.value)
            return evaluate(textExp)
        } else {
            return result;
        }
    }
}

function validateFormat (regex, testString) {
    return regex.test(testString);
}

function calculateSimpleExpression (simpleExp) {
    if (simpleExp.substring(1).search(/[*/%+\-]/) === -1) {
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
        for (var i=op-1; i >=0;i--) {
            if (simpleExp.charAt(i) === '+' || simpleExp.charAt(i) === '-') {
                if (i == 0 || (simpleExp.charAt(i-1) === '+' || simpleExp.charAt(i-1) === '-')) {
                    begin = i
                } else {
                    begin = i+1
                }
            break;
            }
        }
    }
    num1 = Number(simpleExp.substring(begin, op))
    for (var i=op+2; i < simpleExp.length; i++) {
        if (simpleExp.charAt(i) === '+' || simpleExp.charAt(i) === '-' || simpleExp.charAt(i) === '*'
            || simpleExp.charAt(i) === '%' || simpleExp.charAt(i) === '/') {
            end = i;
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

function performOperation (operator, val1, val2) {
    if (operator === '+') {
        return Number(val1) + Number(val2)
    } else if (operator === '-') {
        return Number(val1) - Number(val2)
    } else if (operator === '*') {
        return Number(val1) * Number(val2)
    } else if (operator === '%') {
        return Number(val1) % Number(val2)
    } else if (operator === '/') {
        return Number(val1) / Number(val2)
    }
}