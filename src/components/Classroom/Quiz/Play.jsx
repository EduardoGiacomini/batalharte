import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Firebase
import { database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';
// Component
import Loading from '../../Loading/Loading';
import Error from '../../Common/Error/Error';
import CardResponse from './CardResponse';

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    quiz: null,
};

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount = () => {
        const idQuiz = this.getIdQuiz();

        if (idQuiz !== "form" && idQuiz !== "create") {
            this.getQuiz();
        } else {
            this.setState({ isLoading: false });
        }
    };

    getQuiz = () => {
        const idQuiz = this.getIdQuiz();
        const idClassroom = this.getIdClassroom();

        database.doGetQuiz(idClassroom, idQuiz)
            .then(quiz => {
                if (quiz.val()) {
                    this.setState({
                        isLoading: false,
                        quiz: quiz.val(),
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        isError: true,
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isError: true,
                });
                console.log('Ocorreu um erro ao buscar quiz do banco de dados: ', err);
            })
    };

    getIdQuiz = () => {
        // Props
        const { pathname } = this.props.location;
        const url = pathname.split('/');

        return url[4];
    };

    getIdClassroom = () => {
        // Props
        const { pathname } = this.props.location;
        const url = pathname.split('/');

        return url[2];
    }

    render() {
        // State
        const {
            isLoading,
            isError,
            quiz,
        } = this.state;

        // Props
        const {
            classes,
        } = this.props;

        // Get Id Classroom
        const idClassroom = this.getIdClassroom();

        return (
            <div>
                <If test={!isLoading}>
                    <If test={!isError}>
                        {
                            quiz &&
                            <Paper className={classes.root} elevation={1}>
                                <div>
                                    <Typography align="center" variant="headline" className={classes.titleColor}>
                                        {quiz.title}
                                    </Typography>
                                    <Typography align="center" variant="subheading">
                                        {quiz.description}
                                    </Typography>
                                    <Typography align="left" variant="body2">
                                        <If test={quiz.discipline === 'history'}>
                                            Disciplina: História
                                        </If>
                                        <If test={quiz.discipline === 'art'}>
                                            Disciplina: Artes
                                        </If>
                                        <If test={quiz.discipline === 'interdisciplinary'}>
                                            Disciplina: Interdisciplinar
                                        </If>
                                    </Typography>
                                    <Typography align="left" variant="body2">
                                        Conteúdo abordado: {quiz.content}
                                    </Typography>
                                    <Typography align="left" variant="body2">
                                        Competências abordadas: {quiz.competence}
                                    </Typography>
                                    <CardResponse questionsIds={quiz.questions} quizId={this.getIdQuiz()} />
                                </div>
                            </Paper>
                        }
                    </If>
                    <If test={isError}>
                        <Error
                            title="Opa! O quiz que você tentou acessar está indisponível ou não existe"
                            description="Escolha a opção abaixo para voltar à lista de quizzes"
                            path={`/dashboard/${idClassroom}/quizzes`}
                        />
                    </If>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
            </div>
        );
    };
};

Play.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Play);