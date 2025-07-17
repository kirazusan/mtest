export interface CalculatorMainPageProps {
  value: number;
  onCalculate: (input: number) => number;
}

export interface CalculatorMainPageState {
  input: number;
  result: number;
}