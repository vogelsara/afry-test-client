import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewCompany } from './companiesSlice'

export const CreateCompanyForm = () => {
    const [name, setName] = useState('')
    const [addCompanyStatus, setAddCompanyStatus] = useState('idle')

    const dispatch = useDispatch()

    const onNameChanged = (e) => setName(e.target.value)

    const canSave = name && addCompanyStatus === 'idle'

    const onSaveCompanyClicked = async () => {
        if (canSave) {
            try {
                setAddCompanyStatus('pending')
                const resultAction = await dispatch(addNewCompany({ name }))
                unwrapResult(resultAction)
                setName('')
            } catch (err) {
                console.error('Failed to save company: ', err)
            } finally {
                setAddCompanyStatus('idle')
            }
        }
    }

    return (
        <form noValidate>
            <TextField
                id="company-name-input"
                label="Name"
                onChange={onNameChanged}
                value={name}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSaveCompanyClicked}
                disabled={!canSave}
            >
                Save
            </Button>
        </form>
    )
}

export default CreateCompanyForm
