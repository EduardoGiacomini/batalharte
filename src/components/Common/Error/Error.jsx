import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
// Styles
import styles from './styles';
// Icon
import error from '../../../assets/icons/error404.svg';

const ClassroomError = props => {

    const {
        classes,
        title,
        description,
        path,
    } = props;

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <div className={classes.center}>
                    <Tooltip title="Erro 404.">
                        <img
                            src={error}
                            alt="Erro 404."
                            className={classes.image}
                        />
                    </Tooltip>
                </div>
                <h3 className={classes.text}>{title}</h3>
                <p className={classes.text}>{description}</p>
                <Tooltip title="Pressione para voltar">
                    <Button
                        component={Link}
                        to={path}
                        variant="outlined"
                        fullWidth>
                        Voltar
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

ClassroomError.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassroomError);