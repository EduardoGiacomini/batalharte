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
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';

const Share = props => {

    // Props
    const {
        classes,
    } = props;

    return (
        <div>
            <Paper className={classes.container} elevation={1}>
                <h3 className={classes.title}>CONTEÚDOS COMPARTILHADOS</h3>
                <List>
                    <ListItem>
                        <Avatar>
                            D
                        </Avatar>
                        <ListItemText
                            primary="Ditadura de Vargas"
                            secondary="Conheça a história de Vargas e seus caminhos traçados na política brasileira" />
                        <ListItemSecondaryAction>
                            <Tooltip title="Visualizar">
                                <IconButton
                                    aria-label="Visualizar Ditadura de Vargas"
                                    toltip="Visualizar">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            R
                        </Avatar>
                        <ListItemText
                            primary="República Brasileira"
                            secondary="Conheça a a história da República brasileira" />
                        <ListItemSecondaryAction>
                            <Tooltip title="Visualizar">
                                <IconButton
                                    aria-label="Visualizar República Brasileira"
                                    toltip="Visualizar">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            I
                        </Avatar>
                        <ListItemText
                            primary="Intentona Comunista"
                            secondary="A Intentona Comunista, também conhecida como Revolta Vermelha de 35 ou Levante Comunista, foi uma tentativa de golpe contra o governo de Getúlio Vargas" />
                        <ListItemSecondaryAction>
                            <Tooltip title="Visualizar">
                                <IconButton
                                    aria-label="Visualizar Intentona Comunista"
                                    toltip="Visualizar">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        </div>
    );
}

Share.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Share);