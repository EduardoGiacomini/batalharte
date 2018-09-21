import React, { Component } from 'react';
import PropTypes from 'prop-types';
// React-router-dom
import { Link, Redirect } from 'react-router-dom'
// Auth actions
import { firebase, auth } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
// styles
import styles from './styles';
// Operator
import If from '../../Operator/If';
// Icon
const logo = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Ficons%2Flogo.svg?alt=media&token=10dd9ce2-4199-4a2d-9c48-a0d21e07c894';


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
                    <Tooltip title="Logotipo do Batalharte">
                        <img
                            src={logo}
                            alt="Logotipo do Batalharte"
                            className={classes.image}
                        />
                    </Tooltip>
                </div>
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <Typography align="center" variant="headline" className={classes.color}>
                            AUTENTICAÇÃO
                        </Typography>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                error={error.email}
                                value={email}
                                onChange={this.handleChange('email')}
                                id="email"
                                label="E-mail"
                                margin="normal"
                                type="email"
                                fullWidth
                                required
                            />
                            <TextField
                                error={error.password}
                                value={password}
                                onChange={this.handleChange('password')}
                                id="password"
                                label="Senha"
                                margin="normal"
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
                                    className={classes.margin}
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
                        <div className={classes.margin}>
                            <Tooltip title="Selecione para recuperar sua senha">
                                <Link className={classes.link} to="/recuperaracesso">Esqueceu a senha?</Link>
                            </Tooltip>
                            <br />
                            <br />
                            <Tooltip title="Selecione para efetuar um cadastro">
                                <Link className={classes.link} to="/cadastrar-se">Não possui uma conta?</Link>
                            </Tooltip>
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