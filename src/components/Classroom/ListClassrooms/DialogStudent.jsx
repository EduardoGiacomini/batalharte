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

const DialogStudent = (props) => {

  // Props
  const {
    classes,
    open,
    code,
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
          value={code}
          onChange={handleChange('code')}
          id="code"
          label="Código da turma"
          type="text"
          margin="normal"
          autoFocus
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <div className={classes.containerButtons}>
          <Button onClick={handleClose} color="primary">
            Cancelar
            </Button>
          <Button onClick={onSubmit} color="primary">
            Buscar
            </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

DialogStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogStudent);