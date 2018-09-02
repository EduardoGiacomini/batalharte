import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';
// Icon
import logo from '../../assets/icons/logo.svg';

const Loading = props => {

    const { classes } = props;

    return (
        <div className={classes.container}>
            <Tooltip title="Carregando...">
                <div className={classes.box}>
                    <img
                        src={logo}
                        alt="Logotipo do Batalharte"
                        className={classes.image}
                    />
                    <LinearProgress color="primary" variant="query" />
                </div>
            </Tooltip>
        </div>
    );
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);