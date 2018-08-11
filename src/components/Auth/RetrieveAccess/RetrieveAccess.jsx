import React, { Component } from 'react';
import PropTypes from 'prop-types';
// React-router-dom
import { Link, Redirect } from 'react-router-dom'
// AFirebase
import { auth } from '../../../firebase';
import { firebase } from '../../../firebase'
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

// Estado inicial do componente.
const INITIAL_STATE = {
    isAuthenticated: false,
    isLoading: false,
    openSnackbar: false,
    email: '',
    error: {
        isError: false,
        email: false,
        message: '',
    },
};

class RetrieveAccess extends Component {
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

    handleClose = () => {
        this.setState({ openSnackbar: false });
    };

    onSubmit = (event) => {
        const {
            email,
        } = this.state;

        // Is Loading and Reset Errors
        this.setState({
            isLoading: true,
            error: {
                isError: false,
                email: false,
                message: '',
            },
        });

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ isLoading: false, openSnackbar: true });
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
                                message: 'O endereço de e-mail fornecido não está registrado!',
                            },
                        });
                        break;
                    default:
                        this.setState({
                            error: {
                                isError: true,
                                email: false,
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
            openSnackbar,
            email,
            error
        } = this.state;

        // Props
        const {
            classes
        } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.container} elevation={1}>
                    <div>
                        <h3 className={classes.title}>RECUPERAR ACESSO</h3>
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
                                Recuperar acesso
                            </Button>
                        </If>
                        <If test={isLoading}>
                            <div className={classes.containerLoading}>
                                <CircularProgress />
                            </div>
                        </If>
                    </form>
                    <div className={classes.marginTop}>
                        <Tooltip title="Selecione para voltar à página de autenticação">
                            <Link className={classes.link} to="/">Voltar</Link>
                        </Tooltip>
                    </div>
                </Paper>
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
            </div>
        );
    }
}

RetrieveAccess.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RetrieveAccess);