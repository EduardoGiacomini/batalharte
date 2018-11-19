import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
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
import Paper from '@material-ui/core/Paper';
//Styles
import styles from './styles';
// Images
const history = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Fimages%2Fhistory.png?alt=media&token=7b4a4b38-ec50-40b2-a1bd-86ffdff82470';
const art = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Fimages%2Fart.jpg?alt=media&token=0d197cc8-a1c8-4110-a658-e8a5f94dd3a2';
// icon
const logo = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Ficons%2Flogo.svg?alt=media&token=10dd9ce2-4199-4a2d-9c48-a0d21e07c894';

const CardQuiz = props => {

    // Props
    const {
        classes,
        classroom,
        user,
        quizzes,
    } = props;

    //Get uid Classroom
    const path = classroom.uid;

    return (
        <div className={classes.containerCard}>
            {
                quizzes.length === 0 ?
                    <div className={classes.container}>
                        <Paper elevation={1} className={classes.containerPaper}>
                            <div className={classes.containerImage}>
                                <img
                                    src={logo}
                                    alt="Logotipo do Batalharte"
                                    className={classes.image}
                                />
                            </div>
                            <Typography align="center" variant="headline" className={classes.color}>
                                {
                                    user &&
                                        user.typeUser === "student" ?
                                        <span>Olá, gladiador(a)</span> :
                                        <span>Olá, professor(a)</span>
                                }
                            </Typography>
                            <Typography align="center" variant="subheading" className={classes.color}>
                                {
                                    user &&
                                        user.typeUser === "student" ?
                                        <span>Seu(ua) professor(a) não cadastrou nenhum quiz.</span> :
                                        <span>Crie um quiz para desafiar seus alunos.</span>
                                }
                                
                            </Typography>
                        </Paper>
                    </div> :
                    quizzes.map((quiz, index) => {

                        const {
                            uid,
                            title,
                            description,
                            discipline,
                            questions,
                            score,
                        } = quiz;

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
                                            {
                                                user ?
                                                    score[user.uid] === undefined ?
                                                        <span>Número de questões: {questions.length}</span> :
                                                        <span>Pontuação: {score[user.uid].score}/100</span>
                                                    :
                                                    ""
                                            }

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            component={Link}
                                            to={`/dashboard/${path}/quizzes/${uid}`}
                                            disabled={user ? score[user.uid] === undefined ? false : true : true}
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            fullWidth>
                                            {
                                                user ?
                                                    user.typeUser === "teacher" ?
                                                        "Visualizar" :
                                                        score[user.uid] === undefined ?
                                                            "Responder" :
                                                            "Respondido"
                                                    :
                                                    "Carregando..."
                                            }
                                            {
                                                user ?
                                                    user.typeUser === "student" &&
                                                    <Send className={classes.rightIcon} />
                                                    :
                                                    "Carregando..."
                                            }
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

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(CardQuiz);