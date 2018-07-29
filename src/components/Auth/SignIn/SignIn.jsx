import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react-router-dom
import { Link, Redirect } from 'react-router-dom'
// firebase
import firebase from '../../../firebase/firebase';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// image
import logo from '../../../assets/icons/logo.svg';
// operator
import If from '../../Operator/If';

const styles = {
    image: {
        width: 200,
        height: 200,
    },
    container: {
        padding: 15,
    },
    containerImage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25,
    },
    containerLoading: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    containerLink: {
        marginTop: 10,
    },
    title: {
        textAlign: 'center',
        margin: 0,
        color: '#3E2723',
    },
    link: {
        textDecoration: 'none',
        color: '#3E2723',
    },
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isLoading: false,
            email: '',
            password: '',
            errors: {
                email: {
                    error: false,
                    message: '',
                },
                password: {
                    error: false,
                    message: '',
                },
            },
        };
    }

    componentDidMount = () => {
        this.authRef = firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
    };

    componentWillUnmount = () => {
        this.authRef();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAuthentication = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        // reset errors
        this.setState({
            isLoading: true,
            errors: {
                email: {
                    error: false,
                    message: '',
                },
                password: {
                    error: false,
                    message: '',
                },
            },
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ isAuthenticated: true });
            })
            .catch((err) => {
                console.log(err);
                if (err.code === 'auth/invalid-email') {
                    this.setState({
                        isLoading: false,
                        errors: {
                            email: {
                                error: true,
                                message: 'Endereço de e-mail inválido!',
                            },
                            password: {
                                error: false,
                                message: '',
                            },
                        },
                    });
                }
                if (err.code === 'auth/user-not-found') {
                    this.setState({
                        isLoading: false,
                        errors: {
                            email: {
                                error: true,
                                message: 'Endereço de e-mail não encontrado!',
                            },
                            password: {
                                error: false,
                                message: '',
                            },
                        },
                    });
                }
                if (err.code === 'auth/wrong-password') {
                    this.setState({
                        isLoading: false,
                        errors: {
                            email: {
                                error: false,
                                message: '',
                            },
                            password: {
                                error: true,
                                message: 'Senha incorreta!',
                            },
                        },
                    });
                }
            })
    };

    render() {
        const { isAuthenticated, isLoading, email, password, errors } = this.state;
        const { classes } = this.props;

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
                        <form onSubmit={this.handleAuthentication}>
                            <FormControl error={errors.email.error} fullWidth required aria-describedby="email">
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <Input id="email" type="e-mail" value={email} onChange={this.handleChange('email')} />
                                <FormHelperText id="email">{errors.email.message}</FormHelperText>
                            </FormControl>
                            <FormControl error={errors.password.error} fullWidth required aria-describedby="password">
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <Input id="password" type="password" value={password} onChange={this.handleChange('password')} />
                                <FormHelperText id="password">{errors.password.message}</FormHelperText>
                            </FormControl>
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