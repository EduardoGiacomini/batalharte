import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Firebase
import { database } from '../../../firebase';
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

const INITIAL_STATE = {
    isLoading: true,
    ranking: [],
};

class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        // Props
        const {
            classroom,
        } = this.props;

        if (classroom) {
            this.getRanking(classroom);
        }
    };

    componentWillUpdate = (nextProps) => {

        // Props
        const {
            classroom,
        } = this.props;

        if (nextProps.classroom) {
            if (nextProps.classroom !== classroom) {
                this.getRanking(nextProps.classroom);
            }
        }
    };

    getRanking = (classroom) => {
        // Get Informations
        const {
            quizzes,
            students,
        } = classroom;

        const ranking = [];

        const quizzesArray = this.transformQuizzesObjectInArray(quizzes);
        const studentsArray = this.transformStudentsObjectInArray(students);

        studentsArray.forEach(student => {

            // Set score 0.
            let highpoints = 0;

            quizzesArray.forEach(quiz => {
                const {
                    score,
                } = quiz;

                // Se haver a pontuação daquele usuário ele receberá a pontuação que ele alcançõu naqueles quiz.
                // Caso contrario, o usuário não terá feito o quiz ainda e não receberá nenhuma pontuação no quiz.
                if (score[student] !== undefined) {
                    highpoints = highpoints + score[student].score;
                }
            });

            // Student = uid do usuário.
            // Score = a soma de todos os seus quizzes.
            ranking.push({ student: student, score: highpoints });
        });

        this.getUsersInformations(ranking);
    };

    transformQuizzesObjectInArray = (object) => {
        const array = [];

        if (typeof object === "object") {
            for (var key in object) {
                if (typeof object[key] === "object" && key !== "default") {
                    const obj = object[key];
                    obj.uid = key;
                    array.push(obj);
                }
            }
        }

        return array;
    };

    transformStudentsObjectInArray = (object) => {
        const array = [];

        if (typeof object === "object") {
            for (var key in object) {
                if (key !== "default" && object[key] === true) {
                    array.push(key);
                }
            }
        }

        return array;
    };

    getUsersInformations = (ranking) => {
        const userPromises = ranking.map(user => {
            // Buscando as informações do estudante e colocando-as em uma variável.
            return database.doGetUser(user.student).once('value', userData => userData);
        });

        // Quando todas as promessas serem resolvidas:
        // Chamando função responsável por listar os dados do usuário (name).
        Promise.all(userPromises)
            .then(userSnapshot => {
                this.listUsers(userSnapshot, ranking)
            })
    };

    listUsers = (users, ranking) => {
        const rankingUsers = [];

        ranking.forEach(userRanking => {

            const {
                student,
                score,
            } = userRanking;

            // Checando todos os usuário do objeto.
            users.forEach(user => {
                // Verificando se o usuário existe.
                if (user.val()) {
                    const {
                        name,
                        uid,
                    } = user.val();

                    if (uid === student) {
                        rankingUsers.push({ student: name, score: score });
                    }
                }
            });
        })

        this.orderRanking(rankingUsers);
    };

    orderRanking = (ranking) => {
        const rankingOrder = ranking.sort(this.compare);
        this.setState({ ranking: rankingOrder, isLoading: false });
    };

    compare = (a, b) => {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    };

    render() {
        // State
        const {
            isLoading,
            ranking,
        } = this.state;

        // Props
        const {
            classes,
        } = this.props;

        return (
            <div>
                <If test={!isLoading}>
                    <Paper className={classes.container} elevation={1}>
                        <Typography align="center" variant="title" className={classes.title}>
                            RANKING
                        </Typography>
                        {
                            ranking.length === 0 ?
                                <span>Não há estudantes. Convide seus alunos...</span> :
                                <List>
                                    {
                                        ranking.map((user, index) => {
                                            const {
                                                student,
                                                score,
                                            } = user

                                            return (
                                                <ListItem key={index}>
                                                    <Avatar
                                                        className={
                                                            ranking[0] !== undefined &&
                                                                ranking[0].student === student ?
                                                                classes.firstColor :
                                                                ranking[1] !== undefined &&
                                                                    ranking[1].student === student ?
                                                                    classes.secondColor :
                                                                    ranking[2] !== undefined &&
                                                                        ranking[2].student === student ?
                                                                        classes.Colthirdor :
                                                                        null
                                                        }>
                                                        {student[0]}
                                                    </Avatar>
                                                    <ListItemText primary={student} secondary={score} />
                                                    <ListItemSecondaryAction>
                                                        {
                                                            ranking[0] !== undefined &&
                                                                ranking[0].student === student ?
                                                                <img src={first} alt="Primeiro lugar" className={classes.trophy} /> :
                                                                ranking[1] !== undefined &&
                                                                    ranking[1].student === student ?
                                                                    <img src={second} alt="test" className={classes.trophy} /> :
                                                                    ranking[2] !== undefined &&
                                                                    ranking[2].student === student &&
                                                                    <img src={third} alt="test" className={classes.trophy} />
                                                        }
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                        }
                    </Paper>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
            </div>
        );
    };
};

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Ranking);