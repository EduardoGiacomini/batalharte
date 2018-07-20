import React from 'react';
import PropTypes from 'prop-types';
// react-router-dom
import { Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

const styles = {
    header: {
        height: '56px',
        backgroundColor: '#3E2723',
        textAlign: 'center',
        color: '#FFF'
    },
    text: {
        fontSize: '1.3125rem',
        fontWeight: '500',
        fontFamily: 'Roboto',
        lineHeight: '1.16667em'
    }
};

class TemporaryDrawer extends React.Component {
    state = {
        left: false,
    };

    render() {
        const { classes } = this.props;

        const listItens = (
            <div>
                <List>
                    <ListItem component={Link} to="/" button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Página Inicial" />
                    </ListItem>
                    <ListItem component={Link} to="/signin" button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Autenticar-se" />
                    </ListItem>
                    <ListItem component={Link} to="/signup" button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cadastrar-se" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.toggleDrawer(false)}>
                    <div className={classes.header}>
                        <h2 className={classes.text}>Batalharte</h2>
                    </div>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer(false)}
                        onKeyDown={this.props.toggleDrawer(false)}
                    >
                        {listItens}
                    </div>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);