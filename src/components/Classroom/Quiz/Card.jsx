import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
//Styles
import styles from './styles';
// Images
import history from '../../../assets/image/history.png';
import art from '../../../assets/image/art.jpg';

const CardQuiz = props => {

    // Props
    const {
        classes,
        quizzes,
    } = props;

    return (
        <div className={classes.containerCard}>
            {
                quizzes.length === 0 ?
                    <h1>Não há quizzes</h1> :
                    quizzes.map((quiz, index) => {
                        
                        const {
                            title,
                            description,
                            discipline,
                            questions,
                        } = quiz

                        return (
                            <Tooltip title={title} key={index}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label={title} className={classes.avatarOrange}>{title[0]}</Avatar>
                                        }
                                        title={title}
                                        subheader={description}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={discipline === "history" ? history : discipline === "art" ? art : history}
                                        title={discipline === "history" ? "História" : discipline === "art" ? "Artes" : "Interdisciplinar"}
                                    />
                                    <CardContent className={classes.text}>
                                        <Typography component="p">
                                            Número de questões: {questions.length}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                                            Responder
                                    <Send className={classes.rightIcon} />
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Tooltip>
                        )
                    })
            }
        </div>
    );
}

CardQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardQuiz);