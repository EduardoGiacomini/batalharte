import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// styles
import styles from './styles';

const INITIAL_STATE = {
    open: false
};

class Teacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        // Props
        const {
            classes
        } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <List
                            subheader={<ListSubheader>Suas turmas:</ListSubheader>}
                        >
                            <ListItem>
                                <Avatar>P</Avatar>
                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <Avatar>W</Avatar>
                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <Avatar>V</Avatar>
                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    onClick={this.handleClickOpen}
                >
                    <AddIcon />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Nova turma</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="name"
                            label="Nome da turma"
                            type="text"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="description"
                            label="Descrição da turma"
                            multiline
                            rowsMax="4"
                            value={this.state.multiline}
                            onChange={this.handleChange('multiline')}
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className={classes.containerButtons}>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Cadastrar
            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Teacher.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teacher);