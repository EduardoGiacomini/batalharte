import React from 'react';
import PropTypes from 'prop-types';
// Recompose
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Auth actions
import { auth } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doSignOut } from '../../../redux/actions/authActions';
import { doResetClassroom } from '../../../redux/actions/classroomActions';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

class MenuAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleReturn = () => {
        this.props.doResetClassroom(null);
    }

    onSignOut = () => {
        auth.doSignOut()
            .then(() => {
                this.props.doSignOut(null);
                this.handleClose();
            })
    };

    render() {
        const { classes, user, classroom } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {
                            classroom &&
                            <Tooltip title="Voltar à lista de turmas">
                                <IconButton
                                    component={Link}
                                    to="/dashboard"
                                    onClick={this.handleReturn}
                                    color="inherit"
                                >
                                    <ArrowBack />
                                </IconButton>
                            </Tooltip>
                        }
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                            component={Link}
                            to="/sobre"
                        >
                            Batalharte
                        </Typography>
                        <If test={user}>
                            <div>
                                <Tooltip title="Exibir opções">
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
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
                                    <MenuItem onClick={this.onSignOut}>
                                        <ListItemIcon>
                                            <ExitToApp />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Sair" />
                                    </MenuItem>
                                </Menu>
                            </div>
                        </If>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });
const mapDispatchToProps = dispatch => bindActionCreators({ doSignOut, doResetClassroom }, dispatch);

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MenuAppBar);