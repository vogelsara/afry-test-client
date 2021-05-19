import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllCompanies, fetchCompanies } from './companiesSlice';
import { selectAllPeople, fetchPeople } from '../people/peopleSlice';

import CompanyListElement from './CompanyListElement';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const CompanyList = () => {
    const classes = useStyles();
  
    const dispatch = useDispatch();

    const companies = useSelector(selectAllCompanies);
    const companiesStatus = useSelector(state => state.companies.status);
    const companyError = useSelector(state => state.companies.error);

    const people = useSelector(selectAllPeople);
    const peopleStatus = useSelector(state => state.people.status);
    const peopleError = useSelector(state => state.people.error);

    useEffect(() => {
        if (companiesStatus === 'idle') {
            dispatch(fetchCompanies())
        }
        if (peopleStatus === 'idle') {
            dispatch(fetchPeople())
        }
    }, [companiesStatus, peopleStatus, dispatch])

    let content;

    if (companiesStatus === 'loading') {
        content = <CircularProgress />
    } else if (companiesStatus === 'succeeded' && peopleStatus === 'succeeded') {
        content = companies.map(company => {
            const peopleForThisCompany = people.filter(person => {return person.companyId === company.id});
            return <CompanyListElement company={company} people={peopleForThisCompany} />
        });
    } else if (companiesStatus === 'failed' || peopleStatus === 'failed') {
        content = <div>{companyError}<br />{peopleError}</div>
    }

    return (
        <div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        List of Companies
                    </ListSubheader>
                }
                className={classes.root}
            >
                {content}
            </List>
        </div>
    )
}

export default CompanyList;
