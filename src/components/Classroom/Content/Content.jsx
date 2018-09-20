import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
// Router
import { Link, Redirect } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doListClassroom } from '../../../redux/actions/classroomActions';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Operator
import If from '../../Operator/If';
// Component
import Loading from '../../Loading/Loading';
import Error from '../../Common/Error/Error';
// styles
import styles from './styles';
import { Tooltip } from '@material-ui/core';

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    openSnackbarSuccess: false,
    openDialogDelete: false,
    redirect: false,
    author: '',
    discipline: '',
    competence: '',
    title: '',
    description: '',
    content: '',
    source: '',
};

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    handleClose = (snackbar) => {
        this.setState({ [snackbar]: false });
    };

    componentDidMount = () => {
        this.getContent();
    };

    getContent = () => {
        const idContent = this.getIdContent();

        database.doGetContent(idContent)
            .then(content => {
                if (content.val()) {
                    this.getAuthorInformations(content.val());
                } else {
                    this.setState({
                        isLoading: false,
                        isError: true,
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isError: true,
                });
                console.log('Erro: ', err);
            })
    };

    getAuthorInformations = (contentObject) => {

        const {
            author,
            discipline,
            competence,
            title,
            description,
            content,
            source,
        } = contentObject;

        database.doGetUser(author)
            .once('value', snapshot => {
                this.setState({
                    isLoading: false,
                    author: snapshot.val().name,
                    discipline: discipline,
                    competence: competence,
                    title: title,
                    description: description,
                    content: content,
                    source: source,
                });
            });
    };

    getIdContent = () => {
        // Props
        const { pathname } = this.props.location;
        const url = pathname.split('/');

        return url[5];
    };

    getIdClassroom = () => {
        // Props
        const { pathname } = this.props.location;
        const url = pathname.split('/');

        return url[2];
    };

    registerContentInClassroom = () => {
        // Get IDs
        const idClassroom = this.getIdClassroom();
        const idContent = this.getIdContent();

        database.doRegisterContentInClassroom(idContent, idClassroom)
            .then(() => {
                this.updateClassroom();
            });
    };

    updateClassroom = () => {
        // Props
        const {
            classroom,
        } = this.props;

        // Get uid classroom
        const {
            uid,
        } = classroom;

        database.doGetClassRoom(uid)
            .then(classroomUpdate => {
                const clssrm = classroomUpdate.val();
                clssrm.uid = classroomUpdate.key;
                this.props.doListClassroom(clssrm);
                // Message
                this.setState({ openSnackbarSuccess: true });
            })
    };

    handleCloseDialog = () => {
        this.setState({ openDialogDelete: false });
    };

    deleteContent = () => {
        // Props
        const { pathname } = this.props.location;
        const codeContent = pathname.split('/');

        const { classroom } = this.props;
        const { uid } = classroom;

        database.doDeleteContentInClassroom(uid, codeContent[5])
            .then(() => {
                database.doGetClassRoom(uid)
                    .then(snapshot => {
                        if (snapshot.val()) {
                            const clssrm = snapshot.val();
                            clssrm.uid = snapshot.key;
                            this.props.doListClassroom(clssrm);

                            this.handleCloseDialog();
                            this.setState({ redirect: true });
                        }
                    })
            })
    };

    render() {
        // State
        const {
            isLoading,
            isError,
            openSnackbarSuccess,
            openDialogDelete,
            redirect,
            author,
            discipline,
            competence,
            title,
            description,
            content,
            source,
        } = this.state;

        // Props
        const { shareOption } = this.props.location;
        const { pathname } = this.props.location;
        const url = pathname.split('/');
        const classroomId = url[2];

        // Props
        const {
            classes,
            classroom,
            user,
        } = this.props;

        return (
            <div>
                <If test={!isLoading}>
                    <If test={!isError}>
                        <Paper className={classes.root} elevation={1}>
                            <Typography align="center" variant="headline" className={classes.color}>
                                {title}
                            </Typography>
                            <Typography align="center" variant="subheading">
                                {description}
                            </Typography>
                            <Typography align="justify" variant="body1" className={classes.body}>
                                {content}
                            </Typography>
                            <Typography align="left" variant="body2">
                                Fonte(s): {source}
                            </Typography>
                            <Typography align="left" variant="body2">
                                Autor: {author}
                            </Typography>
                            <Typography align="left" variant="body2">
                                <If test={discipline === 'history'}>
                                    Disciplina: História
                                </If>
                                <If test={discipline === 'art'}>
                                    Disciplina: Arte
                                </If>
                                <If test={discipline === 'interdisciplinary'}>
                                    Disciplina: Interdisciplinar
                                </If>
                            </Typography>
                            <Typography align="left" variant="body2">
                                Competências abordadas: {competence}
                            </Typography>
                            <div className={classes.flex}>
                                <If test={shareOption}>
                                    <Tooltip title="Compartilhar conteúdo">
                                        <Button
                                            variant="outlined"
                                            fullWidth={true}
                                            className={classes.marginLeft}
                                            onClick={() => this.registerContentInClassroom()}
                                        >
                                            Compartilhar
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Voltar à lista de conteúdos compartilháveis">
                                        <Button
                                            component={Link}
                                            to={
                                                user ?
                                                    user.typeUser === "student" ?
                                                        `/dashboard/${classroomId}/content/` :
                                                        `/dashboard/${classroomId}/content/share` :
                                                    `/dashboard/${classroomId}/content/`
                                            }
                                            variant="outlined"
                                            fullWidth={true}
                                            className={classes.marginRight}
                                        >
                                            Voltar
                                    </Button>
                                    </Tooltip>
                                </If>
                                <If test={!shareOption}>
                                    <Tooltip title="Voltar à lista de conteúdos">
                                        <Button
                                            component={Link}
                                            to={`/dashboard/${classroomId}/content/`}
                                            variant="outlined"
                                            fullWidth={true}
                                            className={classes.marginRight}
                                        >
                                            Voltar
                                    </Button>
                                    </Tooltip>
                                    {
                                        classroom &&
                                        user &&
                                        user.typeUser === "teacher" &&
                                        <Tooltip title="Excluir conteúdo">
                                            <Button
                                                variant="outlined"
                                                fullWidth={true}
                                                className={classes.marginRight}
                                                onClick={() => this.setState({ openDialogDelete: true })}
                                            >
                                                Excluir
                                            </Button>
                                        </Tooltip>
                                    }
                                </If>
                            </div>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={openSnackbarSuccess}
                                onClose={() => this.handleClose('openSnackbarSuccess')}
                                autoHideDuration={6000}
                                ContentProps={{
                                    'mensagem-sucesso': 'message-success',
                                }}
                                message={<span id="message-success">Conteúdo compartilhado com sucesso!</span>}
                            />
                            <Dialog
                                open={openDialogDelete}
                                onClose={this.handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{title ? `Deseja excluir o conteúdo ${title}?` : `Deseja excluir o conteúdo?`}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Este conteúdo será excluído permanentemente.
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseDialog} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={this.deleteContent} color="primary">
                                        Excluir
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Paper>
                    </If>
                    <If test={isError}>
                        <Error
                            title="Opa! O conteúdo que você tentou acessar está indisponível ou não existe"
                            description="Escolha a opção abaixo para voltar à lista de conteúdos"
                            path={`/dashboard/${url[2]}/content`}
                        />
                    </If>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
                <If test={redirect}>
                    <Redirect to={`/dashboard/${classroomId}/content/`} />
                </If>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom, user: state.user });
const mapDispatchToProps = dispatch => bindActionCreators({ doListClassroom }, dispatch);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Content);