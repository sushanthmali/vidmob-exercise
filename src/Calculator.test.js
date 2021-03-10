import { render, screen } from '@testing-library/react';
import Calculator from './Calculator';

test('renders page title', () => {
  render(<Calculator />);
  const linkElement = screen.getByText(/Calculator - VidMob Exercise/i);
  expect(linkElement).toBeInTheDocument();
});
