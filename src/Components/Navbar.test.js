import React from 'react'
import { render } from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

test('renders without error', () => {
    const { getByText } = render(
        <Router>
            <Navbar />
        </Router>
    )

    expect(getByText(/add person/i)).toBeInTheDocument()
    expect(getByText(/manage companies/i)).toBeInTheDocument()
    expect(getByText(/people without company/i)).toBeInTheDocument()
})
