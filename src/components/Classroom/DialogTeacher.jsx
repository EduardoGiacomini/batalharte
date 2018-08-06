import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// Styles
import styles from './styles';

const DialogTeacher = (props) => {

    // Props
    const {
        classes,
        open,
        name,
        description,
        handleClose,
        handleChange,
        onSubmit,
    } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Nova turma</DialogTitle>
            <DialogContent>
                <TextField
                    value={name}
                    onChange={handleChange('name')}
                    id="name"
                    label="Nome da turma"
                    type="text"
                    margin="normal"
                    autoFocus
                    fullWidth
                />
                <TextField
                    value={description}
                    onChange={handleChange('description')}
                    id="description"
                    label="Descrição da turma"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <div className={classes.containerButtons}>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Cadastrar
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

DialogTeacher.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogTeacher);