import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listQuizzes } from '../../redux/actions/quizActions';
// Operator
import If from '../Operator/If';
// components
import Card from './Card';

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

// Componente responsável por exibir todos os quizzes dísponíveis.
class Menu extends Component {

    // Buscando quizzes antes da montagem do componente.
    componentWillMount = () => {
        firebase.database().ref('quiz').once('value', snapshot => {
            const quizzes = [];
            snapshot.forEach(quiz => {
                const quizObject = quiz.val();
                quizObject.uid = quiz.key;
                quizzes.push(quizObject);
            })
            // Passando o vetor de quizzes para o Redux.
            this.props.listQuizzes(quizzes);
        })
    }

    render() {
        const { classes, quizzes } = this.props;
        return (
            <div className={classes.container}>
                <If test={quizzes.length !== 0}>
                    <Paper className={classes.container} elevation={1}>
                        <h3 className={classes.title}>QUIZZES</h3>
                        <Card quizzes={quizzes.quizzes} />
                    </Paper>
                </If>
                <If test={quizzes.length === 0}>
                    <div className={classes.containerLoading}>
                        <CircularProgress />
                    </div>
                </If>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ quizzes: state.quizzes });
const mapDispatchToProps = dispatch => bindActionCreators({ listQuizzes }, dispatch);

export default compose(withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Menu);