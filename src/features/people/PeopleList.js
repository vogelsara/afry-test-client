import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectAllPeople, fetchPeople } from './peopleSlice';

export const PeopleList = () => {
    const dispatch = useDispatch();

    const people = useSelector(selectAllPeople);
    const peopleStatus = useSelector(state => state.people.status);
    const error = useSelector(state => state.people.error);

    useEffect(() => {
        if (peopleStatus === 'idle') {
            dispatch(fetchPeople())
        }
    }, [peopleStatus, dispatch])

    let content

    if (peopleStatus === 'loading') {
        content = <CircularProgress />
    } else if (peopleStatus === 'succeeded') {
        content = people.map(person => {
            return <ListItemText key={person.personId} primary={person.name} />
        });
    } else if (peopleStatus === 'failed') {
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

export default PeopleList;
