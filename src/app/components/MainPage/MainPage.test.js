import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import AppService from '../../services/AppService';

jest.mock('../../services/AppService');

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate result for valid inputs', async () => {
    AppService.calculate.mockResolvedValue(5);
    render(<MainPage />);
    
    fireEvent.change(screen.getByLabelText(/first number/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/second number/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/operator/i), { target: { value: '+' } });
    fireEvent.click(screen.getByText(/calculate/i));
    
    expect(AppService.calculate).toHaveBeenCalledWith(10, 5, '+');
    expect(await screen.findByText(/result: 5/i)).toBeInTheDocument();
  });

  test('should handle division by zero', async () => {
    AppService.calculate.mockResolvedValue('Error: Division by zero');
    render(<MainPage />);
    
    fireEvent.change(screen.getByLabelText(/first number/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/second number/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/operator/i), { target: { value: '/' } });
    fireEvent.click(screen.getByText(/calculate/i));
    
    expect(AppService.calculate).toHaveBeenCalledWith(10, 0, '/');
    expect(await screen.findByText(/error: division by zero/i)).toBeInTheDocument();
  });

  test('should handle invalid operator', async () => {
    AppService.calculate.mockResolvedValue('Error: Invalid operator');
    render(<MainPage />);
    
    fireEvent.change(screen.getByLabelText(/first number/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/second number/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/operator/i), { target: { value: '%' } });
    fireEvent.click(screen.getByText(/calculate/i));
    
    expect(AppService.calculate).toHaveBeenCalledWith(10, 5, '%');
    expect(await screen.findByText(/error: invalid operator/i)).toBeInTheDocument();
  });
  
  test('should update state correctly for valid subtraction', async () => {
    AppService.calculate.mockResolvedValue(5);
    render(<MainPage />);
    
    fireEvent.change(screen.getByLabelText(/first number/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/second number/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/operator/i), { target: { value: '-' } });
    fireEvent.click(screen.getByText(/calculate/i));
    
    expect(AppService.calculate).toHaveBeenCalledWith(10, 5, '-');
    expect(await screen.findByText(/result: 5/i)).toBeInTheDocument();
  });
  
  test('should update state correctly for valid multiplication', async () => {
    AppService.calculate.mockResolvedValue(50);
    render(<MainPage />);
    
    fireEvent.change(screen.getByLabelText(/first number/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/second number/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/operator/i), { target: { value: '*' } });
    fireEvent.click(screen.getByText(/calculate/i));
    
    expect(AppService.calculate).toHaveBeenCalledWith(10, 5, '*');
    expect(await screen.findByText(/result: 50/i)).toBeInTheDocument();
  });
});