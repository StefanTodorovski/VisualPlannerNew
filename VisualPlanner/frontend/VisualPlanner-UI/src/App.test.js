import { render, screen } from '@testing-library/react';
import App from './App';
import CardCategory from './cardCategories/CardCategory';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders card with correct category', () => {
  const { getByText } = render(<CardCategory category="Test Category" imageUrl="test.jpg" />);
  const categoryElement = getByText(/Test Category/i);
  expect(categoryElement).toBeInTheDocument();
});

test('renders card with correct image', () => {
  const { getByAltText } = render(<CardCategory category="Test Category" imageUrl="test.jpg" />);
  const imageElement = getByAltText(/Test Category/i);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement.src).toContain('test.jpg');
});