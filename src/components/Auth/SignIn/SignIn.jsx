import React, { Component } from 'react';
import PropTypes from 'prop-types';
// React-router-dom
import { Link, Redirect } from 'react-router-dom'
// Auth actions
import { firebase, auth } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// styles
import styles from './styles';
// Icon
import logo from '../../../assets/icons/logo.svg';
// Operator
import If from '../../Operator/If';

// Estado inicial do componente.
const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    email: '',
    password: '',
    error: {
        isError: false,
        email: false,
        password: false,
        message: '',
    },
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

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

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        // Is Loading and reset Errors
        this.setState({
            isLoading: true,
            error: {
                isError: false,
                email: false,
                password: false,
                message: '',
            },
        });

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ isLoading: false, isAuthenticated: true });
            })
            .catch(err => {
                const { code } = err;

                // Stop Loading
                this.setState({ isLoading: false });

                console.log(code);

                switch (code) {
                    case 'auth/user-not-found':
                        this.setState({
                            error: {
                                isError: true,
                                email: true,
                                password: false,
                                message: 'O endereço de e-mail fornecido não está registrado!',
                            },
                        });
                        break;
                    case 'auth/wrong-password':
                        this.setState({
                            error: {
                                isError: true,
                                email: false,
                                password: true,
                                message: 'A senha inserida está incorreta! Por favor, tente novamente ou altere sua senha na opção "Esqueceu a senha?".'
                            }
                        });
                        break;
                    default:
                        this.setState({
                            error: {
                                isError: true,
                                email: false,
                                password: false,
                                message: 'Ocorreu um erro inesperado. Por favor, tente novamente!',
                            },
                        })
                }
            });

        event.preventDefault();
    }

    render() {
        // State
        const {
            isAuthenticated,
            isLoading,
            email,
            password,
            error
        } = this.state;

        // Props
        const {
            classes
        } = this.props;

        return (
            <div>
                <div className={classes.containerImage}>
                    <img
                        src={logo}
                        alt="Logotipo do Batalharte"
                        className={classes.image}
                    />
                </div>
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <div>
                            <h3 className={classes.title}>AUTENTICAÇÃO</h3>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                className={classes.marginTop}
                                error={error.email}
                                value={email}
                                onChange={this.handleChange('email')}
                                id="email"
                                label="E-mail"
                                type="email"
                                fullWidth
                                required
                            />
                            <TextField
                                className={classes.marginTop}
                                error={error.password}
                                value={password}
                                onChange={this.handleChange('password')}
                                id="password"
                                label="Senha"
                                type="password"
                                fullWidth
                                required
                            />
                            <If test={error.isError}>
                                <div className={classes.containerError}>
                                    <p>{error.message}</p>
                                </div>
                            </If>
                            <If test={!isLoading}>
                                <Button
                                    className={classes.marginTop}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Autenticar-se
                                </Button>
                            </If>
                            <If test={isLoading}>
                                <div className={classes.containerLoading}>
                                    <CircularProgress />
                                </div>
                            </If>
                        </form>
                        <div className={classes.marginTop}>
                            <Link className={classes.link} to="/recuperaracesso">Esqueceu a senha?</Link>
                            <br />
                            <Link className={classes.link} to="/cadastrar-se">Não possui uma conta?</Link>
                        </div>
                    </Paper>
                </div>
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