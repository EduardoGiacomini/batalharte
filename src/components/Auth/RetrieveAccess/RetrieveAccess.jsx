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
    error: null,
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

        // Is Loading
        this.setState({ isLoading: true });

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ isLoading: false, openSnackbar: true });
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
                            value={email}
                            onChange={this.handleChange('email')}
                            id="email"
                            label="E-mail"
                            type="email"
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