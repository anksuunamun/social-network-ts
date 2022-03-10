import React from 'react';
import FinalAppComponent from './App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FinalAppComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
