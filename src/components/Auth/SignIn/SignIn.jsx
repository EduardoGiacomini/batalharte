import React, { Component } from 'react';
import PropTypes from 'prop-types';
// firebase
import firebase from '../../../firebase/firebase';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
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
                            <TextField
                                id="email"
                                label="E-mail"
                                margin="normal"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                            <TextField
                                id="password"
                                label="Senha"
                                margin="normal"
                                type="password"
                                fullWidth={true}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                            />
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