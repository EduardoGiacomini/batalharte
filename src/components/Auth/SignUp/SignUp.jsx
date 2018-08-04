import React, { Component } from 'react';
import PropTypes from 'prop-types';
// React-router-dom
import { Link, Redirect } from 'react-router-dom'
// Firebase
import { firebase, auth, database } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

// Estado inicial do componente.
const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    name: '',
    school: '',
    email: '',
    typeUser: 'student',
    password: '',
    error: null,
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        this.removeAuthListener = firebase.auth.onAuthStateChanged(user => {
            this.setState({ isAuthenticated: !!user })
        });
    };

    componentWillUnmount = () => {
        this.removeAuthListener();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeType = event => {
        this.setState({ typeUser: event.target.value });
    };

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        // Is Loading
        this.setState({ isLoading: true });

        auth.doCreateUserWithEmailAndPassword(email, password)
            .then((authUser) => {

                // Setando Loading como verdadeiro
                this.setState({
                    isLoading: false,
                });

                // Registrando usuário no banco de dados
                const { uid } = authUser.user;

                const user = this.createUserObject(uid)

                database.doCreateUser(uid, user)
                    .then(() => {
                        this.setState({
                            isLoading: false,
                            isAuthenticated: true,
                        })
                    })
                    .catch(error => {
                        // Melhorar mensagem de erro...
                        this.setState({
                            isLoading: false,
                            error: 'Ocorreu um erro durante o processo!'
                        });
                    });

            })
            .catch(error => {
                // Melhorar mensagem de erro...
                this.setState({
                    isLoading: false,
                    error: 'Ocorreu um erro durante o processo!'
                });
            });

        event.preventDefault();
    }

    createUserObject = (uid) => {
        const {
            name,
            school,
            email,
            typeUser,
        } = this.state;

        const user = {
            uid: uid,
            name: name,
            school: school,
            email: email,
            typeUser: typeUser,
            urlPicture: "",
            classrooms: {
                default: false,
            },
        };

        return user;
    }

    render() {
        // State
        const {
            isAuthenticated,
            isLoading,
            name,
            school,
            email,
            typeUser,
            password,
            error } = this.state;

        // Props
        const {
            classes
        } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.container} elevation={1}>
                    <div>
                        <h3 className={classes.title}>CADASTRO</h3>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            value={name}
                            onChange={this.handleChange('name')}
                            id="name"
                            label="Nome completo"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            value={school}
                            onChange={this.handleChange('school')}
                            id="school"
                            label="Instituição de ensino"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            value={email}
                            onChange={this.handleChange('email')}
                            id="email"
                            label="E-mail"
                            type="email"
                            fullWidth
                            required
                        />
                        <TextField
                            value={password}
                            onChange={this.handleChange('password')}
                            id="password"
                            label="Senha"
                            type="password"
                            fullWidth
                            required
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipo de usuário</FormLabel>
                            <RadioGroup
                                aria-label="Tipo de usuário"
                                name="typeUser"
                                value={typeUser}
                                onChange={this.handleChangeType}
                            >
                                <FormControlLabel value="student" control={<Radio color="primary" />} label="Estudante" />
                                <FormControlLabel value="teacher" control={<Radio color="primary" />} label="Professor(a)" />
                            </RadioGroup>
                        </FormControl>
                        <If test={error}>
                            <div className={classes.containerError}>
                                <p>{error}</p>
                            </div>
                        </If>
                        <If test={!isLoading}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Cadastrar-se
                            </Button>
                        </If>
                        <If test={isLoading}>
                            <div className={classes.containerLoading}>
                                <CircularProgress />
                            </div>
                        </If>
                    </form>
                    <div className={classes.containerLink}>
                        <Link className={classes.link} to="/">Já possui uma conta?</Link>
                    </div>
                </Paper>
                <If test={isAuthenticated}>
                    <Redirect to="/dashboard" />
                </If>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);