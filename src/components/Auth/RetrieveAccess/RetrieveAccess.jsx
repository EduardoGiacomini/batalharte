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
import Snackbar from '@material-ui/core/Snackbar';
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

class RetrieveAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isLoading: false,
            openSnackbar: false,
            email: '',
            errors: {
                email: {
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

    handleClose = () => {
        this.setState({ openSnackbar: false });
    };

    handleRetrieveAccess = (event) => {
        event.preventDefault();
        const { email } = this.state;

        // reset errors
        this.setState({
            isLoading: true,
            errors: {
                email: {
                    error: false,
                    message: '',
                },
            },
        });

        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                this.setState({ isLoading: false, openSnackbar: true, email: '' });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                if (error.code === 'auth/invalid-email') {
                    this.setState({
                        errors: {
                            email: {
                                error: true,
                                message: 'Endereço de e-mail inválido!',
                            },
                        },
                    });
                }
                if (error.code === 'auth/user-not-found') {
                    this.setState({
                        errors: {
                            email: {
                                error: true,
                                message: 'Endereço de e-mail não encontrado!',
                            },
                        },
                    });
                }
            })
    };

    render() {
        const { isAuthenticated, isLoading, openSnackbar, email, errors } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <div>
                            <h3 className={classes.title}>RECUPERAR ACESSO</h3>
                        </div>
                        <form onSubmit={this.handleRetrieveAccess}>
                            <FormControl error={errors.email.error} fullWidth required aria-describedby="email">
                                <InputLabel htmlFor="email">E-mail</InputLabel>
                                <Input id="email" type="e-mail" value={email} onChange={this.handleChange('email')} />
                                <FormHelperText id="email">{errors.email.message}</FormHelperText>
                            </FormControl>
                            <If test={!isLoading}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Recuperar acesso
                                </Button>
                            </If>
                            <If test={isLoading}>
                                <div className={classes.containerLoading}>
                                    <CircularProgress />
                                </div>
                            </If>
                        </form>
                        <div className={classes.containerLink}>
                            <Link className={classes.link} to="/">Voltar</Link>
                        </div>
                    </Paper>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={<span>E-mail de redefinição enviado com sucesso!</span>}
                />
                <If test={isAuthenticated}>
                    <Redirect to="/dashboard" />
                </If>
            </div >
        );
    }
}

RetrieveAccess.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RetrieveAccess);