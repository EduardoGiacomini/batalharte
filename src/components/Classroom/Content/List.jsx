import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// material-icons
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';

const ListComponent = props => {

    // Props
    const {
        classes,
        title,
        array,
        path, // ID da classe
        shareOption,
    } = props;

    return (
        <Paper className={classes.container} elevation={1}>
            <Typography align="center" variant="title" className={classes.title}>
                {title}
            </Typography>
            <List>
                {
                    array.map((item, index) => {

                        const { title, description, uid } = item;

                        // Passando opção de compartilhar ou não via props.
                        const newPath = {
                            pathname: `${path}/${uid}`,
                            shareOption: shareOption,
                        };

                        return (
                            <ListItem key={index}>
                                <Avatar>
                                    {title[0]}
                                </Avatar>
                                <ListItemText
                                    primary={title}
                                    secondary={description} />
                                <ListItemSecondaryAction>
                                    <Tooltip title={`Visualizar ${title}`}>
                                        <IconButton
                                            component={Link}
                                            to={newPath}
                                            aria-label={`Visualizar ${title}`}
                                            toltip={`Visualizar ${title}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                }
            </List>
        </Paper>
    );
}

ListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListComponent);