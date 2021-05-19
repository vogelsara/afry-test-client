import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

/**
 * Renders a ListItem with the companyName prop and an expandable list with the people given in people prop
 * 
 * @param companyName string
 * @param people list, where elements must have and id and a name
 */
export const CompanyList = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const personListMarkup = props.people.map(person => {
        return ( 
            <ListItem key={person.id} button className={classes.nested}>
                <ListItemIcon>
                <PersonRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={person.name} />
            </ListItem>
        );
    })

    return (
        <div>
            <ListItem key={props.company.id} button onClick={handleClick}>
                <ListItemIcon>
                    <BusinessCenterRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={props.company.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {personListMarkup}
                </List>
            </Collapse>
        </div>
    )
}

export default CompanyList;
