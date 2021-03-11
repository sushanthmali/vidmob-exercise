import { cleanup, render, screen } from '@testing-library/react';
import {mount} from 'enzyme'
import Calculator from './Calculator';

afterEach(cleanup)

describe('Calculator - Testing Examples from Assessment', () => {
  test('Calculator - Testing Examples mentioned in Assessment', () => {
    verify('1 + 2', '3')
    verify('4*5/2', '10')
    verify('-5+-8--11*2', '9')
    verify('-.32 /.5', '-0.64')
    verify('(4-2)*3.5', '7')
    verifySyntaxError('2+-+-4')
    verifyInvalidInput('19 + cinnamon')
  });
});

describe('Calculator page No input entered', () => {
  test('calculator page with no input entered', () => {
    verifyInputRequired('')
    verifyInputRequired('    ')
  });
});

describe('Calculator page is loaded fine', () => {
  test('renders page title', () => {
    render(<Calculator />);
    const linkElement = screen.getByText(/Calculator - VidMob Exercise/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Calculator page does not include Result on load', () => {
    const calculator = render(<Calculator />);
    const linkElement = screen.getByText(/Result/i);
    expect().toBeFalsy;
  });
});

describe('Calculator - Testing Invalid input', () => {
  test('Calcultor with input special characters', () => {
    verifyInvalidInput('3*4=')
    verifyInvalidInput('$3*4')
    verifyInvalidInput('(6*3)^2')
  });

  test('Calcultor with input as text', () => {
    verifyInvalidInput('try this')
    verifyInvalidInput('0.4*two')
  });
});

describe('Calculator - Testing Syntax Errors', () => {
  test('Calcultor with wrong syntax', () => {
    verifySyntaxError('(78+3*2')
    verifySyntaxError('0.4+*.5')
    verifySyntaxError('-0.8/9.0-')
  });
});

describe('Calculator - Testing UI Rendered Results', () => {
  test('Calculator testing positive test scenarios', () => {
    verify('--12.5', '12.5')
    verify('-(-3.4)', '3.4')
    verify('40*100.5', '4020')
    verify('1234%56*12.345', '24.69')
    verify('354.55+34.4*345', '12222.55')
    verify('354.55+34.4*345', '12222.55')
    verify('(-5+13)*(-5+13)+(-5*13)', '-1')
    verify('(-5+13)*((-5+13)+(-5*13))', '-456')
    verify('(-5+(13)*(-5+13)+(-5*13))', '34')
    verify('(-8)*(-5+13)+(-5*13)\n-(13*21)', '-402')
  });
});

const verify = function (inputMathStr, expectedOutput) {
  const calculator = mount(<Calculator />);
  const mathString = calculator.find('#mathStrInput');
  mathString.simulate("change", { target: { value: inputMathStr} });
  calculator.find('#mathStrButton').simulate("click");
  expect(calculator.find('#resultElem').text()).toEqual('Result : ' + expectedOutput);
}

const verifyErrorMessage = function (inputMathStr, errorMessage) {
  const calculator = mount(<Calculator />);
  const mathString = calculator.find('#mathStrInput');
  mathString.simulate("change", { target: { value: inputMathStr} });
  calculator.find('#mathStrButton').simulate("click");
  expect(calculator.find('#errorPanelDiv').text()).toEqual(errorMessage + ' Please Try again.');
}

const verifyInvalidInput = function (inputMathStr) {
  verifyErrorMessage(inputMathStr, 'Invalid Input entered in the text field.');
}

const verifySyntaxError = function (inputMathStr) {
  verifyErrorMessage(inputMathStr, 'Syntax Error.');
}

const verifyInputRequired = function (inputMathStr) {
  verifyErrorMessage(inputMathStr, 'No Math string found in input area.');
}