import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { personAdded } from './peopleSlice';

export const CreatePersonForm = () => {

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');

    const dispatch = useDispatch();

    const onNameChanged = e => setName(e.target.value);
    const onComapnyChanged = e => setCompany(e.target.value);

    const onSavePersonClicked = () => {
        if (name) {
            dispatch(
                personAdded({
                    id: nanoid(),
                    name,
                    company
                })
            )

            setName('');
            setCompany('');
        }
    }

    return (
        <form noValidate>
            <TextField id="person-name-input" label="Name" onChange={onNameChanged} value={name} />
            <InputLabel id="person-company-select">Company</InputLabel>
            <Select
                labelId="person-company-select"
                id="demo-simple-select"
                onChange={onComapnyChanged}
                value={company}
            >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={onSavePersonClicked}>
                Save
            </Button>
        </form>
    )

}

export default CreatePersonForm;