import React, {Component} from 'react';
import './Calculator.css';
import {calculate} from './CalculatorService';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mathStr : '',
            result : '',
            errorMessage : ''
        };
        this.calculate = this.calculate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    /**
     * A button click event, which calculates the mathematical expression
     * @param {*} event event
     */
    calculate = (event) => {
        event.preventDefault();
        var result = calculate(this.state.mathStr);
        if (result.successFlag) {
            this.setState({
                result : 'Result : ' + result.value,
                errorMessage : ''
            })
        } else {
            this.setState({
                result : '',
                errorMessage : result.message
            })
        }
    }
    
    /**
     * Handles Input change event
     * @param {*} event 
     */
    handleInputChange = (event) => {
        this.setState({
            mathStr : event.target.value,
            result : ''
        })
    }
    
    render() {
        let ErrorPanel = null;
        if (this.state.errorMessage) {
            ErrorPanel = (
                <div id="errorPanelDiv">
                    <ul>
                        <li>{this.state.errorMessage} Please Try again.</li>
                    </ul>
                </div>
            );
        }
        return (
            <div className="maindiv">
                <form id="calculatorForm">
                    <header>
                        <h1 id="calcTitle">Calculator - VidMob Exercise</h1>
                    </header>
                    <div>
                        <p className="calcDesrciption">Enter a valid math problem and click on Calculate button to see the result. Currently '+', '-', '*', '/', '%' operations including parentheses are supported. For example: "1 + 2", "(4-2)*3.52" etc. </p>
                        {ErrorPanel}
                        <div className="innerDiv">
                            <label id="mathStrLabel">Enter a Math Problem : </label>
                            <textarea id="mathStrInput" onChange={this.handleInputChange} value={this.state.mathStr} rows="5" cols="45"/>
                        </div>
                        <button id="mathStrButton" onClick={this.calculate}>Calculate</button>
                        <div>
                            <p id="resultElem">{this.state.result}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Calculator;