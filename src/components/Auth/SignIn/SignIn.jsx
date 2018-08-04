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
    error: null,
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

        // Is Loading
        this.setState({ isLoading: true });

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ isLoading: false, isAuthenticated: true });
            })
            .catch(error => {
                // Melhorar mensagem de erro...
                this.setState({ isLoading: false, error: 'Ocorreu um erro durante o processo!' });
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
                                    Autenticar-se
                                </Button>
                            </If>
                            <If test={isLoading}>
                                <div className={classes.containerLoading}>
                                    <CircularProgress />
                                </div>
                            </If>
                        </form>
                        <div className={classes.containerLink}>
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