import React from 'react'
import { render } from '@testing-library/react'
import CompanyListElement from './CompanyListElement'

test('renders without error', () => {
    const company = {
        id: 'ID',
        name: 'Test Company',
    }

    const people = [
        {
            id: 'ID',
            name: 'Test Person',
        },
    ]

    render(<CompanyListElement company={company} people={people} />)
})
