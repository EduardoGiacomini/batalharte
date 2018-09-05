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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';
// Components
import Loading from '../../Loading/Loading';
import CardQuestion from './CardQuestion';

const INITIAL_STATE = {
    isLoading: true,
    filter: 'all',
    questionsDataBase: [], // Questões adquiridas do banco de dados.
    questions: [], // Questões que o usuário irá escolher para criar o quiz.
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

    render() {
        // State
        const {
            isLoading,
            filter,
            questionsDataBase,
        } = this.state;

        // Props
        const {
            classes,
        } = this.props;

        console.log('questionsDB', questionsDataBase, filter);

        return (
            <div>
                <If test={!isLoading}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography align="center" variant="title" className={classes.title}>
                            Criar Quiz
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
                        <CardQuestion questions={questionsDataBase} />
                    </Paper>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
            </div>
        );
    };
};

Create.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Create);