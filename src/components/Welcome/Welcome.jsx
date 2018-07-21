import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react-router-dom
import { Redirect } from 'react-router-dom'
// firebase
import firebase from '../../firebase/firebase';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// image
import logo from '../../assets/icons/logo.svg';
// operator
import If from '../Operator/If';

const styles = {
    image: {
        width: 200,
        height: 200
    },
    containerImage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25
    },
    container: {
        padding: 15,
        textAlign: 'justify'
    },
    title: {
        textAlign: 'center',
        margin: 0,
        color: '#3E2723'
    }
};

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
    }

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

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);