import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
// Styles
import styles from './styles';

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

    render() {
        // State
        const {
            questionsChosen,
        } = this.state;

        const questionsChosenArray = Object.keys(questionsChosen);

        console.log(questionsChosen);

        // Props
        const {
            classes,
            questions,
        } = this.props;

        return (
            <div>
                <Tooltip title={`${questionsChosenArray.length} questões ativadas`}>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="questions-chosen"
                        className={classes.buttonAdd}
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
            </div>
        );
    };
};

CardQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardQuestion);