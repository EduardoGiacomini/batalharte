import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Firebase
import { database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doListClassrooms } from '../../../redux/actions/classroomActions';
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
import Tooltip from '@material-ui/core/Tooltip';
// Components
import DialogTeacher from './DialogTeacher';
import DialogStudent from './DialogStudent';
// Operator
import If from '../../Operator/If';
// styles
import styles from './styles';

const INITIAL_STATE = {
    openDialogTeacher: false,
    openDialogStudent: false,
    name: '',
    description: '',
    code: '',
};

class ListClassrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        this.getClassrooms();
    }

    handleOpen = () => {
        const { typeUser } = this.props.user;

        if (typeUser === "teacher") {
            this.setState({
                openDialogTeacher: true,
            });
        } else {
            this.setState({
                openDialogStudent: true,
            });
        }
    };

    handleClose = () => {
        this.setState({
            ...INITIAL_STATE,
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmitTeacher = () => {
        const {
            uid,
        } = this.props.user;

        const classroom = this.createClassroomObject();

        database.doCreateClassroom(classroom)
            .then((classroom) => {
                const { key } = classroom;
                database.doRegisterClassroomInUser(uid, key)
                    .then(() => {
                        this.getClassrooms();
                        this.setState({
                            ...INITIAL_STATE,
                        });
                    })
                    .catch((error) => console.log("Ocorreu um erro durante o registro da classe no usuário!", error))
            })
            .catch((error) => console.log("Ocorreu um erro durante o cadastro!", error))
    };

    onSubmitStudent = () => {
        // State
        const {
            code,
        } = this.state;

        // Props
        const {
            uid,
        } = this.props.user;

        database.doVerifyClassroom(code)
            .then((classroom) => {
                if (classroom.val()) {
                    database.doRegisterUserInClassroom(uid, code)
                        .then(() => {
                            database.doRegisterClassroomInUser(uid, code)
                                .then(() => {
                                    this.getClassrooms();
                                    this.setState({
                                        ...INITIAL_STATE,
                                    });
                                    console.log(`Você foi registrado na turma de código ${code}!`);
                                })
                                .catch((err) => console.log('Ocorreu um erro durante o registro da sala no usuário!', err));
                        })
                        .catch((err) => console.log('Ocorreu um erro durante o registro do usuário na classe!', err))
                } else {
                    console.log('Ops, código inserido é inválido!');
                }
            })
            .catch((err) => console.log('Ocorreu um erro durante a verificação!', err));
    };

    createClassroomObject = () => {
        // State
        const {
            name,
            description,
        } = this.state;

        // Props
        const {
            uid
        } = this.props.user;

        const classroom = {
            name: name,
            description: description,
            teacher: uid,
            students: {
                default: true,
            },
            content: {
                default: true,
            },
            quiz: {
                default: true,
            },
        };

        return classroom;
    };

    getClassrooms = () => {
        const { classrooms } = this.props.user;

        database.doGetClassRooms()
            .then((classroomsDB) => {
                const classes = [];
                classroomsDB.forEach((classroom) => {
                    // Percorrendo as classes do usuário.
                    for (let item in classrooms) {
                        // Verificando se a classe é verdadeira (apto a estar presente na classe).
                        if (classrooms[item]) {
                            // Verificando se a classe é que o usuário faz parte é a mesma (igual) a classe retornada do banco de dados.
                            if (item === classroom.key) {
                                // Criando um objeto classe (clsrm) com as informações da classe que pertence ao usuário.
                                const clsrm = classroom.val();
                                // Adicionando o ID à classe para diferenciar umas das outras.
                                clsrm.id = classroom.key;
                                // Adicionando ao array de classes.
                                classes.push(clsrm);
                            }
                        }
                    }
                })
                // Por fim, adicionando ao State do Redux.
                this.props.doListClassrooms(classes);
            });
    }

    render() {
        // State
        const {
            openDialogTeacher,
            openDialogStudent,
            name,
            description,
            code,
        } = this.state;
        // Props
        const {
            classes,
            classrooms,
        } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <List
                            subheader={<ListSubheader>Suas turmas:</ListSubheader>}
                        >
                            <If test={classrooms.length !== 0}>
                                {
                                    // Percorrendo as classes do Redux.
                                    classrooms.map((classroom, index) => {
                                        const {
                                            id,
                                            name,
                                            description,
                                        } = classroom;

                                        return (
                                            <ListItem key={index}>
                                                <Avatar>{name[0]}</Avatar>
                                                <ListItemText primary={name} secondary={description} />
                                                <ListItemSecondaryAction>
                                                    <Tooltip title="Visualizar">
                                                        <IconButton
                                                            aria-label={`Visualizar classe ${name}`}
                                                            toltip="Visualizar"
                                                            href={`/dashboard/${id}`}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })
                                }
                            </If>
                        </List>
                    </CardContent>
                </Card>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    onClick={this.handleOpen}
                >
                    <AddIcon />
                </Button>
                <DialogTeacher
                    open={openDialogTeacher}
                    name={name}
                    description={description}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    onSubmit={this.onSubmitTeacher}
                />
                <DialogStudent
                    open={openDialogStudent}
                    code={code}
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    onSubmit={this.onSubmitStudent}
                />
            </div>
        );
    }
}

ListClassrooms.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classrooms: state.classrooms });
const mapDispatchToProps = dispatch => bindActionCreators({ doListClassrooms }, dispatch);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(ListClassrooms);