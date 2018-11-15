import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    questionsChosen: {},
};

class CardQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    handleChange = uid => {
        // State
        const {
            questionsChosen,
        } = this.state;

        if (questionsChosen[uid] === undefined) {
            questionsChosen[uid] = true;
            this.setState({ questionsChosen });
        } else {
            delete questionsChosen[uid];
            this.setState({ questionsChosen });
        }
    };

    submitQuestions = (questionsChosenArray) => {
        this.props.registerQuiz(questionsChosenArray);
    };

    render() {
        // State
        const {
            questionsChosen,
        } = this.state;

        const questionsChosenArray = Object.keys(questionsChosen);

        // Props
        const {
            classes,
            classroom,
            questions,
            isLoadingForm,
        } = this.props;

        return (
            <div>
                <Tooltip title={`${questionsChosenArray.length} questões ativadas`}>
                    <Button
                        variant="fab"
                        aria-label="questions-chosen"
                        className={classes.buttonAdd}
                        color="secondary"
                    >
                        {
                            questionsChosenArray.length
                        }
                    </Button>
                </Tooltip>
                {
                    questions.length === 0 ?
                        <Card className={classes.root} elevation={2}>
                            <CardContent>
                                <Typography
                                    variant="headline"
                                    component="h2"
                                    className={classes.titleCreate}>
                                    Não há nenhuma questão para ser exibida!
                            </Typography>
                            </CardContent>
                        </Card> :
                        questions.map((question, index) => {

                            // Get options of question.
                            const {
                                uid,
                                content,
                                correctOption,
                                description,
                                difficult,
                                discipline,
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
                                        <Typography
                                            component="p"
                                            className={correctOption === firstOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                            <strong>A:</strong> {firstOption}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={correctOption === secondOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                            <strong>B:</strong> {secondOption}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={correctOption === thirdOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                            <strong>C:</strong> {thirdOption}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={correctOption === fourthOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                            <strong>D:</strong> {fourthOption}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {
                                                discipline === 'history' ?
                                                    <span><strong>Disciplina:</strong> História</span> :
                                                    discipline === 'art' ?
                                                        <span><strong>Disciplina:</strong> Artes</span> :
                                                        discipline === 'interdisciplinary' &&
                                                        <span><strong>Disciplina:</strong> Interdisciplinar</span>
                                            }
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
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        questionsChosen[uid] === undefined ?
                                                            false :
                                                            questionsChosen[uid]
                                                    }
                                                    onChange={() => this.handleChange(uid)}
                                                    value={uid}
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                questionsChosen[uid] === undefined ?
                                                    "Ativar questão" :
                                                    "Desativar questão"
                                            }
                                        />
                                    </CardActions>
                                </Card>
                            );
                        })
                }
                <div className={classes.flex}>
                    <Tooltip title="Cancelar e voltar">
                        <Button
                            component={Link}
                            to={classroom ? `/dashboard/${classroom.uid}/quizzes` : `/dashboard`}
                            variant="outlined"
                            className={classes.marginLeft}
                            disabled={isLoadingForm}
                            fullWidth>
                            Cancelar
                                </Button>
                    </Tooltip>
                    <Tooltip title="Criar quiz">
                        <Button
                            variant="outlined"
                            onClick={() => this.submitQuestions(questionsChosenArray)}
                            className={classes.marginRight}
                            disabled={isLoadingForm}
                            fullWidth>
                            <If test={!isLoadingForm}>
                                Criar Quiz
                                    </If>
                            <If test={isLoadingForm}>
                                <CircularProgress size={20} thickness={7} />
                            </If>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    };
};

CardQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(CardQuestion);