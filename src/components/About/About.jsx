import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// React-router-dom
import { Redirect } from 'react-router-dom';
// Firebase
import { firebase } from '../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';
// Operator
import If from '../Operator/If';
// icon
const logo = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Ficons%2Flogo.svg?alt=media&token=10dd9ce2-4199-4a2d-9c48-a0d21e07c894';

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
                <div className={classes.container}>
                    <Paper className={classes.container} elevation={1}>
                        <Tooltip title="Voltar">
                            <IconButton
                                component={Link}
                                to="/"
                                color="inherit"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>
                        <Typography align="center" variant="headline" className={classes.color}>
                            BATALHARTE
                        </Typography>
                        <div className={classes.containerImage}>
                            <img
                                src={logo}
                                alt="Logotipo do Batalharte"
                                className={classes.image}
                            />
                        </div>
                        <Typography align="justify" variant="subheading" className={classes.marginBottom}>
                            Aplicação desenvolvida pela equipe <strong>Hello World</strong> para a Maratona de Tecnologias Móveis nas Escolas,
                            realizada pela UNICEF, SAMSUNG e Brasil Mais TI.
                        </Typography>
                        <Typography align="justify" variant="body2" className={classes.body}>
                            <strong>Alunos:</strong> Ana Clara Carvalho, Carlos Eduardo Giacomini e Dhiego Lima
                        </Typography>
                        <Typography align="justify" variant="body2" className={classes.body}>
                            <strong>Professor:</strong> Fábio Duarte
                        </Typography>
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