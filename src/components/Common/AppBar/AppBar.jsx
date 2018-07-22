import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// firebase
import firebase from 'firebase';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { signOut } from '../../../redux/actions/authActions';
// components
import Drawer from '../Drawer/Drawer';

const styles = {
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openDrawer: false,
            auth: false,
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => this.setState({ auth: !!user }));
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.signOut(null);
                this.handleClose();
            })
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    toggleDrawer = (open) => () => {
        this.setState({
            openDrawer: open,
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, auth } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(!this.state.openDrawer)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Batalharte
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <ListItemIcon>
                                            <AccountCircle />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Perfil" />
                                    </MenuItem>
                                    <MenuItem onClick={this.signOut}>
                                        <ListItemIcon>
                                            <ExitToApp />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Sair" />
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.openDrawer} toggleDrawer={this.toggleDrawer} />
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch);

export default compose(withStyles(styles),
    connect(null, mapDispatchToProps))(MenuAppBar);