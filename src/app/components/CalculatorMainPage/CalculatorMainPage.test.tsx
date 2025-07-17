import React from 'react';
import { render } from '@testing-library/react';
import CalculatorMainPage from './CalculatorMainPage';

test('renders CalculatorMainPage without crashing', () => {
  render(<CalculatorMainPage />);
});

export default {};