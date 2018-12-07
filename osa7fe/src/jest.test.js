import React from 'react';
import Header from './Components/Header';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Header header='Blogs'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
