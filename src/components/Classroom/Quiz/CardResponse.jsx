import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Redirect } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doListQuestions } from '../../../redux/actions/quizActions';
import { doListClassroom } from '../../../redux/actions/classroomActions';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    redirect: false,
    openDialogWarning: false,
    questionsResponse: null,
    review: null,
};

class CardResponse extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        this.getQuestions();
    };

    componentWillUnmount = () => {
        this.setState({ questionsResponse: null, review: null })
    };


    getQuestions = () => {
        const {
            questionsIds,
        } = this.props;

        const questionsPromises = questionsIds.map(question => {
            return database.doGetQuestion(question);
        });

        Promise.all(questionsPromises)
            .then(questionsData => {
                this.listQuestions(questionsData);
            })
            .catch(err => {
                console.log("Ocorreu um erro durante a busca.", err);
            })
    };

    listQuestions = (questions) => {
        const questionsArray = [];
        questions.forEach(question => {
            if (question.val()) {
                const questionObject = question.val();
                questionObject.uid = question.key;
                questionsArray.push(questionObject);
            }
        })

        this.props.doListQuestions(questionsArray);
    };

    handleChange = (question, event, correctOption) => {
        // State
        const {
            questionsResponse,
        } = this.state;

        if (questionsResponse === null) {
            const questionsResponseObject = {
                [question]: event.target.value,
            };
            this.setState({ questionsResponse: questionsResponseObject });
        } else {
            questionsResponse[question] = event.target.value;
            this.setState({ questionsResponse });
        }

        this.reviewQuestion(question, event.target.value, correctOption);
    };

    reviewQuestion = (question, option, correctOption) => {
        // State
        const {
            review,
        } = this.state;

        if (review === null) {
            const reviewObject = {
                [question]: {
                    question: question,
                    optionSelected: option,
                    correctOption: correctOption,
                    isCorrect: Boolean(option === correctOption),
                },
            };

            this.setState({ review: reviewObject });
        } else {
            review[question] = {
                question: question,
                optionSelected: option,
                correctOption: correctOption,
                isCorrect: Boolean(option === correctOption),
            };

            this.setState({ review });
        }
    };

    handleClickOpen = () => this.setState({ openDialogWarning: true });

    handleClose = () => this.setState({ openDialogWarning: false });

    transformObjectInArray = (object) => {
        const array = [];

        if (typeof object === "object") {
            for (var key in object) {
                if (typeof object[key] === "object") {
                    const obj = object[key];
                    obj.uid = key;
                    array.push(obj);
                }
            }
        }

        return array;
    };

    verifyReview = () => {
        // State
        const {
            review,
        } = this.state;

        if (review) {
            this.calculateScore();
        } else {
            console.log('Responda todas as questões!');
        }
    };

    calculateScore = () => {
        // State
        const {
            review,
        } = this.state;

        // Props
        const {
            questions,
            user,
        } = this.props;

        const reviewArray = this.transformObjectInArray(review);

        let corrects = 0;

        reviewArray.forEach(question => {
            const {
                isCorrect,
            } = question;

            if (isCorrect) {
                corrects++;
            }
        });

        const score = ((corrects * 100) / questions.length);

        review.score = score;
        review.user = user.uid;

        this.sendToDataBase(review);
    };

    sendToDataBase = (review) => {
        // Props
        const {
            classroom,
            quizId,
        } = this.props;

        // Get uid classroom
        const {
            uid,
        } = classroom;

        database.doResponseQuiz(uid, quizId, review)
            .then(() => {
                this.updateClassroom();
            })
    };

    updateClassroom = () => {
        // Props
        const {
            classroom,
        } = this.props;

        // Get uid classroom
        const {
            uid,
        } = classroom;

        database.doGetClassRoom(uid)
            .then(classroomUpdate => {
                const clssrm = classroomUpdate.val();
                clssrm.uid = classroomUpdate.key;
                this.props.doListClassroom(clssrm);

                this.setState({ redirect: true });
            })
    }

    render() {
        // State
        const {
            openDialogWarning,
            questionsResponse,
            redirect,
        } = this.state;

        // Props
        const {
            classes,
            questions,
            classroom,
            user,
        } = this.props;

        return (
            <div>
                <If test={questions.length > 0}>
                    {
                        questions.map((question, index) => {
                            const {
                                uid,
                                content,
                                description,
                                difficult,
                                correctOption,
                                firstOption,
                                secondOption,
                                thirdOption,
                                fourthOption,
                            } = question;

                            return (
                                <Card className={classes.root} elevation={2} key={index}>
                                    <CardContent>
                                        <Typography
                                            variant="headline"
                                            component="h2"
                                            className={classes.titleCreate}>
                                            {content}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={classes.descriptionCreate}>
                                            {description}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {
                                                difficult === 'easy' ?
                                                    <span><strong>Nível de Dificuldade:</strong> Fácil</span> :
                                                    difficult === 'medium' ?
                                                        <span><strong>Nível de Dificuldade:</strong> Médio</span> :
                                                        difficult === 'hard' &&
                                                        <span><strong>Nível de Dificuldade:</strong> Difícil</span>
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Alternativas</FormLabel>
                                            <RadioGroup
                                                aria-label="Alternativas"
                                                name={`alternaticas-questao${uid}`}
                                                className={classes.group}
                                                value={questionsResponse === null ? "" : questionsResponse[uid] === undefined ? "" : questionsResponse[uid]}
                                                onChange={(event) => this.handleChange(uid, event, correctOption)}
                                            >
                                                <FormControlLabel value={firstOption} control={<Radio />} label={firstOption} />
                                                <FormControlLabel value={secondOption} control={<Radio />} label={secondOption} />
                                                <FormControlLabel value={thirdOption} control={<Radio />} label={thirdOption} />
                                                <FormControlLabel value={fourthOption} control={<Radio />} label={fourthOption} />
                                            </RadioGroup>
                                        </FormControl>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                    <If test={user ? user.typeUser === "student" ? true : false : false}>
                        <div className={classes.flex}>
                            <Tooltip title="Cancelar e voltar">
                                <Button
                                    variant="outlined"
                                    className={classes.marginLeft}
                                    fullWidth>
                                    Cancelar
                            </Button>
                            </Tooltip>
                            <Tooltip title="Submeter quiz">
                                <Button
                                    variant="outlined"
                                    onClick={this.handleClickOpen}
                                    className={classes.marginRight}
                                    fullWidth>
                                    Submeter
                            </Button>
                            </Tooltip>
                        </div>
                    </If>
                    <Dialog
                        open={openDialogWarning}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-warning-title"
                        aria-describedby="alert-dialog-warning-description"
                    >
                        <DialogTitle id="alert-dialog-warning-title">{"Uhul. Parece que você terminou de responder o quiz!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-warning-description">
                                Tem certeza que deseja submeter as respostas? Uma vez feito, não será possível fazer uma nova tentativa!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Não
                            </Button>
                            <Button onClick={() => {
                                this.verifyReview();
                                this.handleClose();
                            }
                            }
                                color="primary">
                                Sim, submeter
                            </Button>
                        </DialogActions>
                    </Dialog>
                </If>
                <If test={questions.length === 0}>
                    <Typography align="center" variant="body2">
                        Carregando...
                    </Typography>
                </If>
                <If test={redirect}>
                    <Redirect to={classroom ? `/dashboard/${classroom.uid}/quizzes` : `/dashboard`} />
                </If>
            </div>
        );
    };
};

CardResponse.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ questions: state.questions, user: state.user, classroom: state.classroom });
const mapDispatchToProps = dispatch => bindActionCreators({ doListQuestions, doListClassroom }, dispatch);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(CardResponse);