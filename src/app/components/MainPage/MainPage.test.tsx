import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import { createMauiApp } from './mauiApp';

jest.mock('./mauiApp');

describe('MainPage', () => {
  beforeEach(() => {
    createMauiApp.mockClear();
  });

  test('should call CreateMauiApp on initialization', () => {
    render(<MainPage />);
    expect(createMauiApp).toHaveBeenCalled();
  });

  test('should create and configure MauiApp instance correctly', () => {
    const { instance } = createMauiApp();
    expect(instance).toBeDefined();
    expect(instance.configure).toHaveBeenCalled();
  });

  test('should call CreateMauiApp with correct parameters', () => {
    const params = { /* expected parameters */ };
    render(<MainPage />);
    expect(createMauiApp).toHaveBeenCalledWith(params);
  });
});