import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
// image
import logo from '../../../assets/icons/logo.svg';

const styles = {
    image: {
        width: 200,
        height: 200,
    },
    containerImage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25,
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
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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

    render() {
        const { email, password, errors } = this.state;
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
                            <h3 className={classes.title}>BATALHARTE</h3>
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
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Autenticar-se
                        </Button>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);