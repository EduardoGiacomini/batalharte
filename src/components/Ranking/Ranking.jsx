import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listUsers } from '../../redux/actions/rankingActions';
// operator
import If from '../Operator/If';

const styles = {
    container: {
        padding: 15,
    },
    containerLoading: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        margin: 0,
        color: '#3E2723',
    },
};

class Ranking extends Component {

    componentDidMount() {
        firebase.database().ref('users').on('value', snapshot => {
            const users = [];
            snapshot.forEach(user => {
                users.push(user.val());
            })
            this.props.listUsers(users);
        })
    }

    render() {
        const { classes, users } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <If test={users.length !== 0}>
                        <Paper className={classes.container} elevation={1}>
                            <h3 className={classes.title}>RANKING</h3>
                            <List>
                                {
                                    users.users !== undefined &&
                                    users.users.map(user => {
                                        const { uid, name, highScore } = user;
                                        return (
                                            <ListItem key={uid}>
                                                <Avatar>
                                                    <PersonIcon />
                                                </Avatar>
                                                <ListItemText primary={name} secondary={`Pontuação: ${highScore}`} />
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </Paper>
                    </If>
                    <If test={users.length === 0}>
                        <div className={classes.containerLoading}>
                            <CircularProgress />
                        </div>
                    </If>
                </div>
            </div>
        );
    }
}

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ listUsers }, dispatch);

export default compose(withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Ranking);