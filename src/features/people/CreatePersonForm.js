import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

import { addNewPerson } from './peopleSlice'
import CompanySelect from '../companies/CompanySelect'

export const CreatePersonForm = () => {
    const [name, setName] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [addPersonStatus, setAddPersonStatus] = useState('idle')

    const dispatch = useDispatch()

    const onNameChanged = (e) => setName(e.target.value)
    const onCompanyIdChanged = (companyId) => setCompanyId(companyId)

    const canSave = name && addPersonStatus === 'idle'

    const onSavePersonClicked = async () => {
        if (canSave) {
            try {
                setAddPersonStatus('pending')
                const resultAction = dispatch(addNewPerson({ name, companyId }))
                unwrapResult(resultAction)
                setName('')
                setCompanyId('')
            } catch (err) {
                console.error('Failed to save person: ', err)
            } finally {
                setAddPersonStatus('idle')
            }
        }
    }

    return (
        <form noValidate>
            <TextField
                id="person-name-input"
                label="Name"
                onChange={onNameChanged}
                value={name}
            />
            <InputLabel id="person-company-select">Company</InputLabel>
            <CompanySelect
                value={companyId}
                onCompanyIdChanged={onCompanyIdChanged}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSavePersonClicked}
                disabled={!canSave}
            >
                Save
            </Button>
        </form>
    )
}

export default CreatePersonForm
