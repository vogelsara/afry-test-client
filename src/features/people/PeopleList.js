import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllPeople, fetchPeople, editPerson } from './peopleSlice';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanySelect from '../companies/CompanySelect';

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

export const PeopleList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const people = useSelector(selectAllPeople);
    const peopleStatus = useSelector(state => state.people.status);
    const error = useSelector(state => state.people.error);

    useEffect(() => {
        if (peopleStatus === 'idle') {
            dispatch(fetchPeople())
        }
    }, [peopleStatus, dispatch])

    const onCompanyIdChanged = (companyId, personId) => {
        dispatch(
            editPerson(
                {
                    id: personId,
                    data: {
                        companyId: companyId 
                    }
                }
            )
        );
    };

    let content

    if (peopleStatus === 'loading') {
        content = <CircularProgress />
    } else if (peopleStatus === 'succeeded') {
        const peopleWithoutCompany = people.filter(person => person.companyId === '');
        content = peopleWithoutCompany.map(person => {
            return ( 
                <ListItem key={person.id} button className={classes.nested}>
                    <ListItemIcon>
                    <PersonRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={person.name} />
                    <CompanySelect value='' onCompanyIdChanged={(companyId) => onCompanyIdChanged(companyId, person.id)} />
                </ListItem>
            );
        });
    } else if (peopleStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >      
                {content}
            </List>
        </div>
    )
}

export default PeopleList;
