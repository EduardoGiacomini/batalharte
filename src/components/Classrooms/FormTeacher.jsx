import React from 'react';
// material-ui
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const FormTeacher = props => {

    const { open, name, description, errors, handleChange, handleClose, handleValidation } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-create-classroom-title"
        >
            <DialogTitle id="form-create-classroom-title">Criar turma</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Preencha o formulário para criar uma turma.
                </DialogContentText>
                <FormControl error={errors.name.error} fullWidth aria-describedby="name">
                    <InputLabel htmlFor="name">Nome</InputLabel>
                    <Input id="name" type="text" value={name} onChange={handleChange('name')} />
                    <FormHelperText id="name">{errors.name.message}</FormHelperText>
                </FormControl>
                <FormControl error={errors.description.error} fullWidth aria-describedby="description">
                    <InputLabel htmlFor="description">Descrição</InputLabel>
                    <Input id="description" type="text" value={description} onChange={handleChange('description')} />
                    <FormHelperText id="description">{errors.description.message}</FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
                <Button
                    color="primary"
                    onClick={handleValidation}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormTeacher;