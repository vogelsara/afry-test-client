import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CreatePeople from './CreatePeople';

test('renders without error', () => {
    render(
        <Provider store={store}>
            <CreatePeople />
        </Provider>
    );
});
