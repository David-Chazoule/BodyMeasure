import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders Header component', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Body/i);  // Vérifie que "Body" est dans le header
  expect(headerElement).toBeInTheDocument();
});

test('renders logo image with correct alt text', () => { 
  render(<Header />);
  const logoImage = screen.getByAltText(/logo/i);  // Cherche une image avec alt "logo"
  expect(logoImage).toBeInTheDocument();
});