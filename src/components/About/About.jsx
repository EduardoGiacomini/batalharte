import React, { Component } from 'react';
import PropTypes from 'prop-types';
// React-router-dom
import { Redirect } from 'react-router-dom';
// Firebase
import { firebase } from '../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Styles
import styles from './styles';
// icon
import logo from '../../assets/icons/logo.svg';
// Operator
import If from '../Operator/If';

const INITIAL_STATE = {
    isAuthenticated: false,
};

class About extends Component {
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

    render() {
        const { isAuthenticated } = this.state;
        const { classes } = this.props;

        return (
            <div className="backgroundMap" style={styles.container}>
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
                        <p>
                            Aplicação desenvolvida pela equipe <strong>Hello World</strong> para a Maratona de Tecnologias Móveis nas Escolas,
                            realizada pela UNICEF, SAMSUNG e Brasil Mais TI.
                        </p>
                    </Paper>
                </div>
                <If test={isAuthenticated}>
                    <Redirect to="/dashboard" />
                </If>
            </div>
        );
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);