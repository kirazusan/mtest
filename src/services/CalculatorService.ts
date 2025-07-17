import Calculator from '../Calculator/Calculator';

class CalculatorService {
    add(a: number, b: number): number {
        this.validateInput(a, b);
        const calculator = new Calculator();
        return calculator.add(a, b);
    }

    subtract(a: number, b: number): number {
        this.validateInput(a, b);
        const calculator = new Calculator();
        return calculator.subtract(a, b);
    }

    multiply(a: number, b: number): number {
        this.validateInput(a, b);
        const calculator = new Calculator();
        return calculator.multiply(a, b);
    }

    divide(a: number, b: number): number {
        this.validateInput(a, b);
        if (b === 0) {
            throw new Error('Division by zero is not allowed.');
        }
        const calculator = new Calculator();
        return calculator.divide(a, b);
    }

    private validateInput(...inputs: any[]): void {
        inputs.forEach(input => {
            if (typeof input !== 'number') {
                throw new Error('Invalid input type. All inputs must be numbers.');
            }
        });
    }
}

export default CalculatorService;