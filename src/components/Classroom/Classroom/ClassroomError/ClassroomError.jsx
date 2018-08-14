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
import error from '../../../../assets/icons/error404.svg';

const ClassroomError = props => {

    const { classes } = props;

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <div className={classes.center}>
                    <Tooltip title="Erro 404. Turma não encontrada">
                        <img
                            src={error}
                            alt="Erro 404. Turma não encontrada"
                            className={classes.image}
                        />
                    </Tooltip>
                </div>
                <h3 className={classes.text}>Opa! A turma que você tentou acessar está indisponível ou não existe.</h3>
                <p className={classes.text}>Escolha a opção abaixo para voltar à lista de turmas.</p>
                <Tooltip title="Pressione para voltar à lista de turmas">
                    <Button
                        component={Link}
                        to="/dashboard"
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