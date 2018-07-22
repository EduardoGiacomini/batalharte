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
// operator
import If from '../../Operator/If';

const styles = {
    container: {
        padding: 15,
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
            name: '',
            school: '',
            email: '',
            password: '',
            confirmPassword: '',
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

    handleValidate = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            this.setState({
                errors: {
                    email: {
                        error: false,
                        message: '',
                    },
                    password: {
                        error: true,
                        message: 'Há divergência entre as senhas!',
                    },
                },
            });
        } else {
            this.handleRegistration();
        }

    }

    handleRegistration = (event) => {
        const { name, school, email, password } = this.state;

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

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.database().ref('users').child(res.user.uid).set({
                    uid: res.user.uid,
                    name: name,
                    school: school,
                    email: email,
                    highScore: 0,
                    phase: 1,
                })
                    .then(() => {
                        this.setState({ isAuthenticated: true });
                    })
            })
            .catch((err) => {
                console.log(err)
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
                if (err.code === 'auth/email-already-in-use') {
                    this.setState({
                        isLoading: false,
                        errors: {
                            email: {
                                error: true,
                                message: 'Endereço de e-mail já cadastrado!',
                            },
                            password: {
                                error: false,
                                message: '',
                            },
                        },
                    });
                }
                if (err.code === 'auth/weak-password') {
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
        const { isAuthenticated, isLoading, name, school, email, password, confirmPassword, errors } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <div>
                            <h3 className={classes.title}>CADASTRO</h3>
                        </div>
                        <form onSubmit={this.handleValidate}>
                            <FormControl fullWidth required aria-describedby="name">
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <Input id="name" type="e-mail" value={name} onChange={this.handleChange('name')} />
                                <FormHelperText id="name"></FormHelperText>
                            </FormControl>
                            <FormControl fullWidth required aria-describedby="school">
                                <InputLabel htmlFor="school">Instituição</InputLabel>
                                <Input id="school" type="e-mail" value={school} onChange={this.handleChange('school')} />
                                <FormHelperText id="school"></FormHelperText>
                            </FormControl>
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
                            <FormControl error={errors.password.error} fullWidth required aria-describedby="confirmPassword">
                                <InputLabel htmlFor="confirmPassword">Confirme sua senha</InputLabel>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={this.handleChange('confirmPassword')} />
                                <FormHelperText id="confirmPassword">{errors.password.message}</FormHelperText>
                            </FormControl>
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
                            <Link className={classes.link} to="/signin">Já possui uma conta?</Link>
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