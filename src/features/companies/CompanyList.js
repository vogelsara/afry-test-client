import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectAllCompanies, fetchCompanies } from './companiesSlice';

export const CompanyList = () => {
    const dispatch = useDispatch();

    const companies = useSelector(selectAllCompanies);
    const companiesStatus = useSelector(state => state.companies.status);
    const error = useSelector(state => state.companies.error);

    useEffect(() => {
        if (companiesStatus === 'idle') {
            dispatch(fetchCompanies())
        }
    }, [companiesStatus, dispatch])

    let content

    if (companiesStatus === 'loading') {
        content = <CircularProgress />
    } else if (companiesStatus === 'succeeded') {
        content = companies.map(company => {
            return <ListItemText key={company.id} primary={company.name} />
        });
    } else if (companiesStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <List>
                <ListItem>
                    {content}
                </ListItem>
            </List>
        </div>
    )
}

export default CompanyList;
