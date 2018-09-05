import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
// styles
import styles from './styles';
// Operator
import If from '../../Operator/If';
// Loading
import Loading from '../../Loading/Loading';

function Transition(props) {
    return <Slide direction="up" {...props} />;
};

const INITIAL_STATE = {
    open: false,
};

class Quizzes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    /*componentDidMount = () => {
        // Props
        const { classroom } = this.props;

        if (classroom) {
            this.getQuizzes(classroom.quizzes);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        // Props
        const { classroom } = this.props;

        if (nextProps.classroom) {
            if (nextProps.classroom !== classroom) {
                this.getQuizzes(nextProps.classroom.quizzes);
            }
        }
    };

    getQuizzes = (quizzes) => {
        const contentsUids = this.getContentsUids(contents);

        const contentsPromises = contentsUids.map(uid => {
            return database.doGetContent(uid);
        });

        Promise.all(contentsPromises)
            .then(contentsData => {
                this.listContents(contentsData);
            })
            .catch(err => {
                console.log("Ocorreu um erro durante a busca.", err);
            })
    };*/

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // Função responsável por retornar o ID da classe representado pela URL da que o usuário está.
    getPathClassroom = () => {
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    };

    render() {
        // Props
        const {
            classes,
            classroom,
            user,
        } = this.props;

        const classroomUrl = this.getPathClassroom();

        return (
            <div>
                <If test={!!classroom}>
                    {
                        user &&
                        user.typeUser === "teacher" &&
                        <Tooltip title="Exibir opções">
                            <Button
                                variant="fab"
                                color="primary"
                                aria-label="Add"
                                className={classes.buttonAdd}
                                onClick={this.handleClickOpen}
                            >
                                <AddIcon />
                            </Button>
                        </Tooltip>
                    }
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle
                            id="alert-dialog-title">
                            {"Adicionar quiz"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Você deseja cadastrar um novo quiz ou compartilhar um existente?                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/quizzes/form`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Cadastrar Questões
                        </Button>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/quizzes/create`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Criar Quiz
                        </Button>
                        </DialogActions>
                    </Dialog>
                </If>
                <If test={!classroom}>
                    <Loading />
                </If>
            </div>
        );
    }
}

Quizzes.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Quizzes);