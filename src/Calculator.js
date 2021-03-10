import React, {Component} from 'react';
import './Calculator.css';
import {calculate} from './CalculatorService';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mathStr : '',
            result : 0
        };
        this.calculate = this.calculate.bind(this);
        this.changeMathStr = this.changeMathStr.bind(this);
    }
    
    calculate = (event) => {
        event.preventDefault();
        this.setState({
            mathStr : this.state.mathStr,
            result : calculate(this.state.mathStr)
        })
    }
    changeMathStr = (event) => {
        this.setState({
            mathStr : event.target.value,
            result : 0
        })
    }
    
    render() {
        return (
            <div className="maindiv">
                <form id="calculatorForm">
                    <header>
                        <h1 id="calcTitle">Calculator - VidMob Exercise</h1>
                    </header>
                    <div>
                        <p className="calcDesrciption">Enter math string and click on Calculate button. Ex: "1 + 2", "(4-2)*3.5" etc </p>    
                        <div className="innerDiv">
                            <label id="mathStrLabel">Enter Problem : </label>
                            <textarea onChange={this.changeMathStr} value={this.state.mathStr} rows="5" cols="45"/>
                        </div>
                        <button id="mathStrButton" onClick={this.calculate}>Calculate</button>
                        <div>
                            <p>Result is : {this.state.result}</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Calculator;