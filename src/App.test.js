import React from 'react';
import { render } from '@testing-library/react';
import Viewer from './components/Viewer';

test('renders learn react link', () => {
  const { getByText } = render(<Viewer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
