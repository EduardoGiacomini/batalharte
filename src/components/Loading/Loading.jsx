import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// Logo
import logo from '../../assets/icons/logo.svg';

const styles = {
    container: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 200,
        height: 200,
    },
    image: {
        width: 200,
        height: 200,
    },
};

const Loading = props => {

    const { classes } = props;

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <img
                    src={logo}
                    alt="Logotipo do Batalharte"
                    className={classes.image}
                />
                <LinearProgress color="primary" variant="query" />
            </div>
        </div>
    );
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);