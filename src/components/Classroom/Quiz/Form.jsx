import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    isLoading: false,
    openSnackbarSuccess: false,
    openSnackbarAlert: false,
    description: '',
    firstOption: '',
    secondOption: '',
    thirdOption: '',
    fourthOption: '',
    correctOption: 0,
    discipline: '',
    difficult: '',
    content: '',
};

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    handleChange = name => event => {
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

    onSubmit = (event) => {
        // Props
        const { user, classroom } = this.props;

        if (user !== null && classroom !== null) {
            this.doRegisterQuestion();
        } else {
            this.setState({ openSnackbarAlert: true });
        }

        event.preventDefault();
    };

    doRegisterQuestion = () => {
        // Question Object
        const question = this.getQuestionObject();

        // Loading true
        this.setState({ isLoading: true });

        database.doRegisterQuestion(question)
            .then(() => {
                this.setState({ ...INITIAL_STATE, openSnackbarSuccess: true });
            })
    };

    getQuestionObject = () => {
        // Props
        const { user } = this.props;

        // Uid
        const { uid } = user;

        // State
        const {
            description,
            firstOption,
            secondOption,
            thirdOption,
            fourthOption,
            discipline,
            difficult,
            content,
        } = this.state;

        // Get correct Option
        const correctOption = this.getCorrectOption();

        const contentObject = {
            author: uid,
            description,
            firstOption,
            secondOption,
            thirdOption,
            fourthOption,
            correctOption,
            discipline,
            difficult,
            content,
        };

        return contentObject;
    };

    getCorrectOption = () => {
        // State
        const {
            correctOption,
            firstOption,
            secondOption,
            thirdOption,
            fourthOption,
        } = this.state;

        // Create option returned
        let option = '';
        switch (correctOption) {
            case 1:
                option = firstOption;
                break;
            case 2:
                option = secondOption;
                break;
            case 3:
                option = thirdOption;
                break;
            case 4:
                option = fourthOption;
                break;
            default:
                option = firstOption;
        };

        return option;
    };

    render() {
        // State
        const {
            isLoading,
            openSnackbarAlert,
            openSnackbarSuccess,
            description,
            firstOption,
            secondOption,
            thirdOption,
            fourthOption,
            correctOption,
            discipline,
            content,
            difficult,
        } = this.state;

        // Props
        const {
            classes,
            classroom,
        } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography align="center" variant="title" className={classes.title}>
                    Cadastrar Pergunta
                    </Typography>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        value={description}
                        onChange={this.handleChange('description')}
                        id="description"
                        label="Descrição da pergunta"
                        margin="normal"
                        type="text"
                        autoFocus
                        fullWidth
                        required
                    />
                    <TextField
                        value={firstOption}
                        onChange={this.handleChange('firstOption')}
                        id="firstOption"
                        label="Primeira opção"
                        margin="normal"
                        type="text"
                        InputProps={{
                            className: correctOption !== 0 ? correctOption === 1 ? classes.optionSucces : classes.optionError : null
                        }}
                        fullWidth
                        required
                    />
                    <TextField
                        value={secondOption}
                        onChange={this.handleChange('secondOption')}
                        id="secondOption"
                        label="Segunda opção"
                        margin="normal"
                        type="text"
                        InputProps={{
                            className: correctOption !== 0 ? correctOption === 2 ? classes.optionSucces : classes.optionError : null
                        }}
                        fullWidth
                        required
                    />
                    <TextField
                        value={thirdOption}
                        onChange={this.handleChange('thirdOption')}
                        id="thirdOption"
                        label="Terceira opção"
                        margin="normal"
                        type="text"
                        InputProps={{
                            className: correctOption !== 0 ? correctOption === 3 ? classes.optionSucces : classes.optionError : null
                        }}
                        fullWidth
                        required
                    />
                    <TextField
                        value={fourthOption}
                        onChange={this.handleChange('fourthOption')}
                        id="fourthOption"
                        label="Quarta opção"
                        margin="normal"
                        type="text"
                        InputProps={{
                            className: correctOption !== 0 ? correctOption === 4 ? classes.optionSucces : classes.optionError : null
                        }}
                        fullWidth
                        required
                    />
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="correctOption-input">Opção correta</InputLabel>
                        <Select
                            value={correctOption}
                            onChange={this.handleChangeSelect}
                            name="correctOption"
                            inputProps={{
                                id: 'correctOption-input',
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione uma opção
                                </MenuItem>
                            <MenuItem value={1}>Primeira opção</MenuItem>
                            <MenuItem value={2}>Segunda opção</MenuItem>
                            <MenuItem value={3}>Terceira opção</MenuItem>
                            <MenuItem value={4}>Quarta opção</MenuItem>
                        </Select>
                        <FormHelperText>Disciplina abordada</FormHelperText>
                    </FormControl>
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
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="difficult-input">Nível de dificuldade</InputLabel>
                        <Select
                            value={difficult}
                            onChange={this.handleChangeSelect}
                            name="difficult"
                            inputProps={{
                                id: 'difficult-input',
                            }}
                        >
                            <MenuItem value="" disabled>
                                Selecione uma opção
                                </MenuItem>
                            <MenuItem value="easy">Fácil</MenuItem>
                            <MenuItem value="medium">Médio</MenuItem>
                            <MenuItem value="hard">Difícil</MenuItem>
                        </Select>
                        <FormHelperText>Nível de dificuldade da pergunta</FormHelperText>
                    </FormControl>
                    <TextField
                        value={content}
                        onChange={this.handleChange('content')}
                        id="content"
                        label="Conteúdos abordados"
                        margin="normal"
                        type="text"
                        fullWidth
                        required
                    />
                    <div className={classes.flex}>
                        <Tooltip title="Cancelar e voltar">
                            <Button
                                component={Link}
                                to={`/dashboard/${classroom !== null ? classroom.uid : ''}/quizzes`}
                                variant="outlined"
                                disabled={isLoading === true || classroom === null}
                                fullWidth={true}
                                className={classes.marginLeft}>
                                Cancelar
                            </Button>
                        </Tooltip>
                        <Tooltip title="Salvar">
                            <Button
                                type="submit"
                                variant="outlined"
                                disabled={isLoading}
                                fullWidth={true}
                                className={classes.marginRight}>
                                <If test={!isLoading}>
                                    Salvar
                                    </If>
                                <If test={isLoading}>
                                    <CircularProgress size={20} thickness={7} />
                                </If>
                            </Button>
                        </Tooltip>
                    </div>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbarAlert}
                    onClose={() => this.handleClose('openSnackbarAlert')}
                    autoHideDuration={6000}
                    ContentProps={{
                        'mensagem-alerta': 'message-alert',
                    }}
                    message={<span id="message-alert">Aguarde... carregando informações!</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbarSuccess}
                    onClose={() => this.handleClose('openSnackbarSuccess')}
                    autoHideDuration={6000}
                    ContentProps={{
                        'mensagem-sucesso': 'message-success',
                    }}
                    message={<span id="message-success">Questão salva com sucesso!</span>}
                />
            </Paper>
        );
    };
};

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Form);