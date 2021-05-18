import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Companies from './Companies';

test('renders without error', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Companies />
        </Provider>
    );
});
