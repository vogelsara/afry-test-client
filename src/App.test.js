import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/add person/i)).toBeInTheDocument();
  expect(getByText(/manage companies/i)).toBeInTheDocument();
  expect(getByText(/people without company/i)).toBeInTheDocument();
});
