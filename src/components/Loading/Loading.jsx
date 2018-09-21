import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
// Styles
import styles from './styles';
// Icon
const logo = 'https://firebasestorage.googleapis.com/v0/b/batalharte.appspot.com/o/assets%2Ficons%2Flogo.svg?alt=media&token=10dd9ce2-4199-4a2d-9c48-a0d21e07c894';

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