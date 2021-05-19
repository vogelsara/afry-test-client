import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CompanyList from './CompanyList';

test('renders without error', () => {
    render(
        <Provider store={store}>
            <CompanyList />
        </Provider>
    );
});
