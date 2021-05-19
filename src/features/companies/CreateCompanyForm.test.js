import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import CreateCompanyForm from './CreateCompanyForm'

test('renders without error', () => {
    const { getByText } = render(
        <Provider store={store}>
            <CreateCompanyForm />
        </Provider>
    )

    expect(getByText(/Name/i)).toBeInTheDocument()
    expect(getByText(/Save/i)).toBeInTheDocument()
})
