import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listClassrooms } from '../../redux/actions/classroomActions';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
// Operator
import If from '../Operator/If';
// Components
import FormTeacher from './FormTeacher';

const styles = theme => ({
    container: {
        padding: 15,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class ListTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openDialog: false,
            openSnackbar: false,
            name: '',
            description: '',
            errors: {
                name: {
                    error: false,
                    message: '',
                },
                description: {
                    error: false,
                    message: '',
                },
            },
        };
    }

    // Buscando classes assim que o componente carregar.
    componentDidMount = () => {
        const { user } = this.props;
        const { uid } = user;

        firebase.database().ref('classrooms').orderByChild('teacher').equalTo(uid).on('value', snapshot => {
            const classrooms = [];
            snapshot.forEach(classroom => {
                classrooms.push(classroom.val());
            })
            this.props.listClassrooms(classrooms);
        })
    }

    handleOpen = () => {
        this.setState({ openDialog: true });
    };

    handleClose = () => {
        this.setState({
            openDialog: false,
            name: '',
            description: '',
            errors: {
                name: {
                    error: false,
                    message: '',
                },
                description: {
                    error: false,
                    message: '',
                },
            },
        });
    };

    handleOpenSnackbar = () => {
        this.setState({
            openSnackbar: true,
        });
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleValidation = () => {
        const { name, description } = this.state;

        // Resetando erros de formulário.
        this.setState({
            errors: {
                name: {
                    error: false,
                    message: '',
                },
                description: {
                    error: false,
                    message: '',
                },
            },
        });

        // Aplicando validações no formulário de cadastro.
        if (name === "" || description === "") {
            if (name === "" && description === "") {
                this.setState({
                    errors: {
                        name: {
                            error: true,
                            message: 'Preencha este campo!',
                        },
                        description: {
                            error: true,
                            message: 'Preencha este campo!',
                        },
                    },
                });
            } else {
                if (name === "") {
                    this.setState({
                        errors: {
                            name: {
                                error: true,
                                message: 'Preencha este campo!',
                            },
                            description: {
                                error: false,
                                message: '',
                            },
                        },
                    });
                }
                if (description === "") {
                    this.setState({
                        errors: {
                            name: {
                                error: false,
                                message: '',
                            },
                            description: {
                                error: true,
                                message: 'Preencha este campo!',
                            },
                        },
                    });
                }
            }
        } else {
            // Chamando função para efetuar o cadastro.
            this.handleRegistration();
        }
    };

    // Método responsável por criar a turma (classroom).
    handleRegistration = () => {
        const { name, description } = this.state;
        const { user } = this.props;
        const { uid } = user;

        firebase.database().ref('classrooms').push({
            name: name,
            description: description,
            teacher: uid,
            students: [],
            contents: [],
            quiz: [],
        })
            .then(classroom => {
                const { key } = classroom;
                firebase.database().ref('classrooms').child(key).update({
                    uid: key,
                })
                    .then(() => {
                        this.handleClose();
                        this.handleOpenSnackbar();
                    })
            })
    };

    render() {
        const { classes, classrooms } = this.props;
        const { openDialog, openSnackbar, name, description, errors } = this.state;

        return (
            <div className={classes.container}>
                <Paper className={classes.container} elevation={1}>
                    <If test={classrooms.lenght !== 0}>
                        <List>
                            {
                                classrooms.map((classroom, index) => {
                                    const { name, description } = classroom;
                                    return (
                                        <ListItem key={index}>
                                            <Avatar>
                                                {name[0]}
                                            </Avatar>
                                            <ListItemText primary={name} secondary={description} />
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="Visualizar">
                                                    <Visibility />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </If>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="Adicionar turma"
                        className={classes.fab}
                        onClick={this.handleOpen}
                    >
                        <AddIcon />
                    </Button>
                    <FormTeacher open={openDialog} name={name} description={description} errors={errors} handleChange={this.handleChange} handleClose={this.handleClose} handleValidation={this.handleValidation} />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnackbar}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Turma criada com sucesso!</span>}
                        action={
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleCloseSnackbar}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    />
                </Paper>
            </div>
        );
    }
}

ListTeacher.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classrooms: state.classrooms });
const mapDispatchToProps = dispatch => bindActionCreators({ listClassrooms }, dispatch);

export default compose(withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps))(ListTeacher);