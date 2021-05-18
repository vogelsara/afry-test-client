import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { addNewPerson } from './peopleSlice';
import { selectAllCompanies, fetchCompanies } from '../companies/companiesSlice';


export const CreatePersonForm = () => {

    const [name, setName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [addPersonStatus, setAddPersonStatus] = useState('idle');
    
    const dispatch = useDispatch();

    const companies = useSelector(selectAllCompanies);
    const companiesStatus = useSelector(state => state.companies.status);
    const error = useSelector(state => state.companies.error);

    useEffect(() => {
        if (companiesStatus === 'idle') {
            dispatch(fetchCompanies())
        }
    }, [companiesStatus, dispatch])

    const onNameChanged = e => setName(e.target.value);
    const onComapnyChanged = e => setCompanyId(e.target.value);

    const canSave = name && addPersonStatus === 'idle'

    const onSavePersonClicked = async () => {
        if (canSave) {
            try {
                setAddPersonStatus('pending')
                const resultAction = await dispatch(
                    addNewPerson({ name, companyId })
                )
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

    let companySelection;

    if (companiesStatus === 'loading') {
        companySelection = <CircularProgress />
    } else if (companiesStatus === 'succeeded') {
        const companyOptions = [
            {
                id: '',
                name: 'None'
            }
        ].concat(companies);
        const companyListMarkup = companyOptions.map(company => {
            return <MenuItem value={company.id}>{company.name}</MenuItem>
        })
        companySelection = 
        <Select
            labelId="person-company-select"
            id="demo-simple-select"
            onChange={onComapnyChanged}
            value={companyId}
        >
            {companyListMarkup}
        </Select>
    } else if (companiesStatus === 'failed') {
        companySelection = <div>{error}</div>
    }
    

    return (
        <form noValidate>
            <TextField id="person-name-input" label="Name" onChange={onNameChanged} value={name} />
            <InputLabel id="person-company-select">Company</InputLabel>
            {companySelection}
            <Button variant="contained" color="primary" onClick={onSavePersonClicked} disabled={!canSave}>
                Save
            </Button>
        </form>
    )

}

export default CreatePersonForm;