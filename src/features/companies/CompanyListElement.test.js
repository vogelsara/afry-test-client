import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CompanyListElement from './CompanyListElement';

test('renders without error', () => {
    const company = {
        id: 'ID',
        name: 'Test Company'
    }

    const people = [
        {
            id: 'ID',
            name: 'Test Person'
        }
    ];

    const { getByText } = render(
        <CompanyListElement company="Test Company" people={people} />
    );
});
