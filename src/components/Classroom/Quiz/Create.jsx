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
import { doListClassroom } from '../../../redux/actions/classroomActions';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';
// Components
import Loading from '../../Loading/Loading';
import CardQuestion from './CardQuestion';

const INITIAL_STATE = {
    isLoading: true,
    isLoadingForm: false,
    openSnackbar: false,
    redirect: false,
    filter: 'all',
    questionsDataBase: [], // Questões adquiridas do banco de dados.
    questions: [], // Questões que o usuário irá escolher para criar o quiz.
    title: '',
    description: '',
    discipline: '',
    content: '',
    competence: '',
};

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        // Props
        const { classroom } = this.props;

        if (classroom) {
            this.getQuestions();
        }
    };

    componentWillReceiveProps = (nextProps) => {
        // Props
        const { classroom } = this.props;

        if (nextProps.classroom) {
            if (nextProps.classroom !== classroom) {
                this.getQuestions();
            }
        }
    };

    checkClassroom = () => {
        // Props
        const { classroom } = this.props;

        if (classroom) {
            this.getQuestions();
        }
    };

    getQuestions = (filter) => {
        // Na primeira busca, o filtro será undefined.
        if (filter === undefined || filter === 'all') {
            database.doGetQuestions()
                .then(snapshot => this.replaceDataInState(snapshot))
                .catch(err => console.log('Ocorreu um erro ao tentar buscar as questões!', err));
        } else if (filter !== undefined && filter !== 'all') {
            database.doGetQuestionsWithFilter(filter)
                .then(snapshot => this.replaceDataInState(snapshot))
                .catch(err => console.log('Ocorreu um erro ao tentar buscar as questões!', err));
        }
    };

    replaceDataInState = (snapshot) => {
        snapshot.forEach(item => {
            const question = item.val();
            question.uid = item.key;
            this.setState({ questionsDataBase: [...this.state.questionsDataBase, question] });
        });

        this.setState({ isLoading: false });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        // Reset questions DataBase
        this.setState({ isLoading: true, questionsDataBase: [] });
        // Get news questions
        this.getQuestions(event.target.value);
    };

    handleChangeTextField = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = (snackbar) => {
        this.setState({ [snackbar]: false });
    };

    registerQuiz = (questions) => {

        // Set Loading
        this.setState({ isLoadingForm: true });

        // Props
        const {
            classroom,
        } = this.props;

        // Get uid Classroom
        const {
            uid,
        } = classroom;

        // Get Quiz Object
        const quiz = this.createQuizObject(questions);

        database.doRegisterQuiz(uid, quiz)
            .then(() => {
                database.doAlterDefaultState(uid)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE, openSnackbar: true });
                        this.updateClassroom();
                    })
            })
    };

    createQuizObject = (questions) => {
        // State 
        const {
            title,
            description,
            discipline,
            content,
            competence,
        } = this.state;

        return {
            title,
            description,
            discipline,
            content,
            competence,
            questions,
            score: { default: true }
        };
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
            isLoading,
            isLoadingForm,
            openSnackbar,
            redirect,
            filter,
            questionsDataBase,
            title,
            description,
            content,
            discipline,
            competence,
        } = this.state;

        // Props
        const {
            classes,
            classroom,
        } = this.props;

        return (
            <div>
                <If test={!isLoading}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography align="center" variant="title" className={classes.title}>
                            CRIAR QUIZ
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="filter-input">Filtrar questões por:</InputLabel>
                            <Select
                                value={filter}
                                onChange={this.handleChange}
                                name="filter"
                                inputProps={{
                                    id: 'filter-input',
                                }}
                            >
                                <MenuItem value="all">Todas</MenuItem>
                                <MenuItem value="history">História</MenuItem>
                                <MenuItem value="art">Artes</MenuItem>
                                <MenuItem value="interdisciplinary">Interdisciplinar</MenuItem>
                            </Select>
                            <FormHelperText>Filtrar questões por disciplina</FormHelperText>
                        </FormControl>
                        <TextField
                            value={title}
                            onChange={this.handleChangeTextField('title')}
                            id="title"
                            label="Título do Quiz"
                            margin="normal"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            value={description}
                            onChange={this.handleChangeTextField('description')}
                            id="description"
                            label="Descrição"
                            margin="normal"
                            multiline
                            rowsMax="5"
                            fullWidth
                            required
                        />
                        <Tooltip title="Selecione uma opção">
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="discipline-input">Disciplina</InputLabel>
                                <Select
                                    value={discipline}
                                    onChange={this.handleChangeSelect}
                                    name="discipline"
                                    inputProps={{
                                        id: 'discipline-input',
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Selecione uma opção
                                </MenuItem>
                                    <MenuItem value="history">História</MenuItem>
                                    <MenuItem value="art">Arte</MenuItem>
                                    <MenuItem value="interdisciplinary">Interdisciplinar</MenuItem>
                                </Select>
                                <FormHelperText>Disciplina abordada</FormHelperText>
                            </FormControl>
                        </Tooltip>
                        <TextField
                            value={content}
                            onChange={this.handleChangeTextField('content')}
                            id="content"
                            label="Conteúdo"
                            margin="normal"
                            multiline
                            rows="5"
                            fullWidth
                            required
                        />
                        <TextField
                            value={competence}
                            onChange={this.handleChangeTextField('competence')}
                            id="competence"
                            label="Competências abordadas"
                            margin="normal"
                            multiline
                            rowsMax="10"
                            fullWidth
                            required
                        />
                        <CardQuestion questions={questionsDataBase} isLoadingForm={isLoadingForm} registerQuiz={this.registerQuiz} />
                    </Paper>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
                <If test={redirect}>
                    <Redirect to={classroom ? `/dashboard/${classroom.uid}/quizzes` : `/dashboard`} />
                </If>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbar}
                    onClose={() => this.handleClose('openSnackbar')}
                    autoHideDuration={6000}
                    ContentProps={{
                        'mensagem-success': 'message-success',
                    }}
                    message={<span id="message-success">Quiz registrado com sucesso!</span>}
                />
            </div>
        );
    };
};

Create.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });
const mapDispatchToProps = dispatch => bindActionCreators({ doListClassroom }, dispatch);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Create);