import React from 'react';
import { render } from '@testing-library/react';
import MainPage from './MainPage.js';

test('renders main page', () => {
  const { getByText } = render(<MainPage />);
  expect(getByText(/Main Page Content/i)).toBeInTheDocument();
});