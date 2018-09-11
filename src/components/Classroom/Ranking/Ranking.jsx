import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Redux
import { connect } from 'react-redux';
// material-icons
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from './styles';
// Icons
import first from '../../../assets/icons/first.svg';
import second from '../../../assets/icons/second.svg';
import third from '../../../assets/icons/third.svg';
// Operator
import If from '../../Operator/If';
// Components
import Loading from '../../Loading/Loading';

const Ranking = props => {

    // Props
    const {
        classes,
        classroom,
    } = props;

    return (
        <div>
            <If test={!!classroom}>
                <Paper className={classes.container} elevation={1}>
                    <Typography align="center" variant="title" className={classes.title}>
                        RANKING
                    </Typography>
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
                </Paper>
            </If>
            <If test={!classroom}>
                <Loading />
            </If>
        </div>
    );
}

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Ranking);