import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react-router-dom
import { Redirect } from 'react-router-dom'
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
    title: {
        textAlign: 'center',
        margin: 0,
        color: '#3E2723',
    },
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            name: '',
            school: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
                name: {
                    error: false,
                    message: '',
                },
                school: {
                    error: false,
                    message: '',
                },
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
        firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /* handleRegistration = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        // reset errors
        this.setState({
            errors: {
                name: {
                    error: false,
                    message: '',
                },
                school: {
                    error: false,
                    message: '',
                },
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
            .then(() => {
                this.setState({ isAuthenticated: true });
            })
            .catch((err) => {
                if (err.code === 'auth/invalid-email') {
                    this.setState({
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
    }
    */

    render() {
        const { isAuthenticated, name, school, email, password, confirmPassword, errors } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <div>
                            <h3 className={classes.title}>BATALHARTE</h3>
                        </div>
                        <form>
                            <FormControl error={errors.name.error} fullWidth required aria-describedby="name">
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <Input id="name" type="e-mail" value={name} onChange={this.handleChange('name')} />
                                <FormHelperText id="name">{errors.name.message}</FormHelperText>
                            </FormControl>
                            <FormControl error={errors.school.error} fullWidth required aria-describedby="school">
                                <InputLabel htmlFor="school">Insttuição</InputLabel>
                                <Input id="school" type="e-mail" value={school} onChange={this.handleChange('school')} />
                                <FormHelperText id="school">{errors.school.message}</FormHelperText>
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
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Cadastrar-se
                        </Button>
                        </form>
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