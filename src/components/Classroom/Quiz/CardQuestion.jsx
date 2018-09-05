import React from 'react';
import PropTypes from 'prop-types';
// Firebase
import { database } from '../../../firebase/database';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from './styles';

const CardQuestion = props => {

    // Props
    const {
        classes,
        questions,
    } = props;

    return (
        <div>
            {
                questions.length === 0 ?
                    <h1>Sorry! Question not found :(</h1> :
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
                                        align="center"
                                        variant="headline"
                                        component="h2"
                                        className={classes.titleCreate}>
                                        {content}
                                    </Typography>
                                    <Typography
                                        align="justify"
                                        component="subheading"
                                        className={classes.descriptionCreate}>
                                        {description}
                                    </Typography>
                                    <Typography
                                        component="body1"
                                        className={correctOption === firstOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                        <strong>A:</strong> {firstOption}
                                    </Typography>
                                    <Typography
                                        component="body1"
                                        className={correctOption === secondOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                        <strong>B:</strong> {secondOption}
                                    </Typography>
                                    <Typography
                                        component="body1"
                                        className={correctOption === thirdOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                        <strong>C:</strong> {thirdOption}
                                    </Typography>
                                    <Typography
                                        component="body1"
                                        className={correctOption === fourthOption ? classes.optionSuccessCreate : classes.optionErrorCreate}>
                                        <strong>D:</strong> {fourthOption}
                                    </Typography>
                                    <div className={classes.textSecondaryCreat}>
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
                                    </div>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        );
                    })
            }
        </div>
    );
};

CardQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardQuestion);