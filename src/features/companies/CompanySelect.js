import React, { useEffect } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';
import { selectAllCompanies, fetchCompanies } from './companiesSlice';

export const CompanySelect = (props) => {    
    const dispatch = useDispatch();

    const companies = useSelector(selectAllCompanies);
    const status = useSelector(state => state.companies.status);
    const error = useSelector(state => state.companies.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCompanies());
        }
    }, [status, dispatch]);

    const onCompanyIdChanged = e => {
        props.onCompanyIdChanged(e.target.value)
    }

    if (status === 'loading') {
        return (<CircularProgress />);
    } else if (status === 'succeeded') {
        const companyOptions = [
            {
                id: '',
                name: 'None'
            }
        ].concat(companies);
        const companyListMarkup = companyOptions.map(company => {
            return <MenuItem value={company.id}>{company.name}</MenuItem>
        })
        return ( 
            <Select
                labelId="person-company-select"
                id="demo-simple-select"
                onChange={onCompanyIdChanged}
                value={props.value}
            >
                {companyListMarkup}
            </Select>
        );
    } else if (status === 'failed') {
        return (<div>{error}</div>);
    }

    return null;
}

export default CompanySelect;