export function calculate(input) {
    var acceptedFormat = /^[\d+*\-%/(). ]+$/g
    if (!validateFormat(acceptedFormat, input)) {
        return {'successFlag' : false, 'message': 'Invalid Input.'}
    }
    return evaluate(input.replaceAll(' ', ''))
}

function evaluate (textExp) {
    var innerExpCheck = textExp.indexOf('(')
    if (innerExpCheck === -1) {
       var acceptedFormat = /^[+-]?\d+(.\d+)?\s?([+*%\-/]\s?[+-]?\d+(.\d+)?\s?)*$/g
        if (!validateFormat(acceptedFormat, textExp)) {
            return {'successFlag' : false, 'message': 'Syntax Error.'}
        }
        //To-Do implementation
        return {'successFlag' : true, 'value': eval(textExp)}
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