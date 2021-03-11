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
        this.changeMathStr = this.changeMathStr.bind(this);
    }
    
    calculate = (event) => {
        event.preventDefault();
        var result = calculate(this.state.mathStr);
        if (result.successFlag) {
            this.setState({
                result : result.value,
                errorMessage : ''
            })
        } else {
            this.setState({
                result : '',
                errorMessage : result.message
            })
        }
    }
    changeMathStr = (event) => {
        this.setState({
            mathStr : event.target.value,
            result : 0
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
                        <p className="calcDesrciption">Enter math string and click on Calculate button. Ex: "1 + 2", "(4-2)*3.5" etc </p>
                        {ErrorPanel}
                        <div className="innerDiv">
                            <label id="mathStrLabel">Enter Problem : </label>
                            <textarea onChange={this.changeMathStr} value={this.state.mathStr} rows="5" cols="45"/>
                        </div>
                        <button id="mathStrButton" onClick={this.calculate}>Calculate</button>
                        <div>
                            <p id="resultElem">Result is : {this.state.result}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Calculator;