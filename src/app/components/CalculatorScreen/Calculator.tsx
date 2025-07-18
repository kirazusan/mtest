import React, { Component } from 'react';

class MainPage extends Component {
    state = {
        currentInput: '',
        result: null,
        error: null
    };

    handleButtonClick = (value) => {
        this.setState({ currentInput: this.state.currentInput + value });
    };

    handleCalculate = () => {
        try {
            const result = eval(this.state.currentInput);
            this.setState({ result, error: null });
        } catch (error) {
            this.setState({ error: 'Invalid input', result: null });
        }
    };

    render() {
        const { currentInput, result, error } = this.state;
        return (
            <div>
                <div>{currentInput}</div>
                <div>{result !== null ? result : error}</div>
                <div>
                    {[...Array(10).keys()].map(num => (
                        <button key={num} onClick={() => this.handleButtonClick(num.toString())}>{num}</button>
                    ))}
                    {['+', '-', '*', '/'].map(op => (
                        <button key={op} onClick={() => this.handleButtonClick(op)}>{op}</button>
                    ))}
                    <button onClick={this.handleCalculate}>=</button>
                </div>
            </div>
        );
    }
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.InitializeComponent();
        this.MainPage = new MainPage();
        this.configChanges = '';
        this.lifecycleEvents = [];
        this.activityLifecycle = [];
    }

    static CreateMauiApp() {
        const builder = MauiApp.CreateBuilder();
        builder.UseMauiApp(App);
        builder.ConfigureFonts(fonts => {
            fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
        });
        return builder.Build();
    }

    InitializeComponent() {
    }

    handleConfigChanges = () => {
        this.configChanges = 'Updated config changes';
    };

    handleLifecycleEvent = (event) => {
        this.lifecycleEvents.push(event);
    };

    handleActivityLifecycle = (event) => {
        this.activityLifecycle.push(event);
    };

    toTrimmedString(target, decimalFormat) {
        return parseFloat(target).toFixed(decimalFormat).replace(/\.?0+$/, '');
    }

    calculate(value1, value2, mathOperator) {
        let result;
        switch (mathOperator) {
            case '+':
                result = value1 + value2;
                break;
            case '-':
                result = value1 - value2;
                break;
            case '*':
                result = value1 * value2;
                break;
            case '/':
                result = value1 / value2;
                break;
            default:
                throw new Error('Invalid operator');
        }
        return result;
    }

    componentDidMount() {
        this.handleConfigChanges();
        this.handleLifecycleEvent('OnCreate');
        this.handleActivityLifecycle('OnCreate');
    }

    render() {
        return <this.MainPage />;
    }
}

export default Calculator;