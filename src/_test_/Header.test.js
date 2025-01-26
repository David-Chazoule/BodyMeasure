import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders Header component', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Body/i); // Check that "Body" is in the header
  expect(headerElement).toBeInTheDocument();
});

test('renders logo image with correct alt text', () => { 
  render(<Header />);
  const logoImage = screen.getByAltText(/logo/i);  // Search for an image with alt "logo"
  expect(logoImage).toBeInTheDocument();
});