import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
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
// Components
import List from './List';
import Loading from '../../Loading/Loading';

function Transition(props) {
    return <Slide direction="up" {...props} />;
};

const INITIAL_STATE = {
    open: false,
    contents: [],
};

class Contents extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        // Props
        const { classroom } = this.props;

        if (classroom) {
            this.getContent(classroom.contents);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        // Props
        const { classroom } = this.props;

        if (nextProps.classroom) {
            if (nextProps.classroom !== classroom) {
                this.getContent(nextProps.classroom.contents);
            }
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // Função responsável por retornar o ID da classe representado pela URL da que o usuário está.
    getPathClassroom = () => {
        // Props PathName
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    };

    getContent = (contents) => {
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
    };

    getContentsUids = (contents) => {
        let contentsUids = [];

        for (let item in contents) {
            contentsUids.push(item);
        }

        return contentsUids;
    };

    listContents = (contents) => {
        const contentsArray = [];

        contents.forEach(content => {
            if (content.val()) {
                const contentObject = content.val();
                contentObject.uid = content.key;
                contentsArray.push(contentObject);
            }
        });

        this.setState({ contents: contentsArray });
    };

    render() {
        // State
        const {
            open,
            contents,
        } = this.state;

        // Props
        const {
            classes,
            user,
            classroom,
        } = this.props;

        const classroomUrl = this.getPathClassroom();

        return (
            <div className={classes.containerCard}>
                <If test={!!classroom}>
                    <List title="CONTEÚDOS DESSA TURMA" array={contents} path={`/dashboard/${classroomUrl}/content/view`} shareOption={false} />
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
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle
                            id="alert-dialog-title">
                            {"Novo conteúdo"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Você deseja cadastrar um novo conteúdo ou compartilhar um existente?                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/content/form`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Cadastrar
                            </Button>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/content/share`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Compartilhar
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

Contents.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Contents);