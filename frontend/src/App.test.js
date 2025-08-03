import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Scholar-Dorm application', () => {
  render(<App />);
  const titleElement = screen.getByText(/Scholar-Dorm Application/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders register form', () => {
  render(<App />);
  const registerButton = screen.getByText(/Register User/i);
  expect(registerButton).toBeInTheDocument();
});

test('renders backend connection button', () => {
  render(<App />);
  const connectionButton = screen.getByText(/Test Backend Connection/i);
  expect(connectionButton).toBeInTheDocument();
});
