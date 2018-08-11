import React from 'react';
import PropTypes from 'prop-types';
// material-icons
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
// Styles
import styles from './styles';

import first from '../../../assets/icons/first.svg';
import second from '../../../assets/icons/second.svg';
import third from '../../../assets/icons/third.svg';

const Ranking = props => {

    const { classes } = props;

    return (
        <Paper className={classes.container} elevation={1}>
            <h3 className={classes.title}>RANKING</h3>
            <List>
                <ListItem>
                    <Avatar
                        className={classes.firstColor}>
                        B
                    </Avatar>
                    <ListItemText primary="Bárbara da Silva Oliveira" secondary="100" />
                    <ListItemSecondaryAction>
                        <img src={first} alt="test" className={classes.trophy} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <Avatar
                        className={classes.secondColor}>
                        D
                    </Avatar>
                    <ListItemText primary="Daniel Santos da Silva" secondary="95" />
                    <ListItemSecondaryAction>
                        <img src={second} alt="test" className={classes.trophy} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <Avatar
                        className={classes.thirdColor}>
                        S
                    </Avatar>
                    <ListItemText primary="Samara Maraísa Cruz" secondary="85" />
                    <ListItemSecondaryAction>
                        <img src={third} alt="test" className={classes.trophy} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <Avatar>
                        A
                    </Avatar>
                    <ListItemText primary="Analice Carvalho" secondary="70" />
                </ListItem>
                <ListItem>
                    <Avatar>
                        L
                    </Avatar>
                    <ListItemText primary="Luís Lontsbarch" secondary="45" />
                </ListItem>
            </List>
        </Paper >
    );
}

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ranking);