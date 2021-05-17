import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function PeopleList() {
    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText primary='test person'/>
                </ListItem>
            </List>
        </div>
    )
}
