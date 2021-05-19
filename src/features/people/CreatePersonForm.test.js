import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import CreatePersonForm from './CreatePersonForm'

test('renders without error', () => {
    const { getByText } = render(
        <Provider store={store}>
            <CreatePersonForm />
        </Provider>
    )

    expect(getByText(/Name/i)).toBeInTheDocument()
    expect(getByText(/Company/i)).toBeInTheDocument()
    expect(getByText(/Save/i)).toBeInTheDocument()
})
