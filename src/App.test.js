import React from 'react';
import {render} from '@testing-library/react';
import {parseAncestryNotation, printAncestryNotation} from './utils/TreeConverter';
import App from "./App";

const linearAncestry = {
  notation: `id=1
name=Name 1
Date of birth=1945
Date of death=2000.01.01

id=1.1
name=Name 2
Date of birth=
Date of death=
`,
  tree: {
    name: 'Name 1',
    attributes: {
      'Date of birth': '1945',
      'Date of death': '2000.01.01',
    },
    children: [
      {
        name: 'Name 2',
        attributes: {
          'Date of birth': '',
          'Date of death': '',
        },
        children: [],
      }],
  }
};

test('tree converter parses ancestry notation', () => {
  const tree = parseAncestryNotation(linearAncestry.notation);
  expect(tree).toEqual(linearAncestry.tree);
});

test('tree converter prints ancestry notation', () => {
  const notation = printAncestryNotation(linearAncestry.tree);
  expect(notation).toEqual(linearAncestry.notation);
});

test('renders learn react link', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
