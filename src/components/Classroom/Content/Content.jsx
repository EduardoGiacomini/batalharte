import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Operator
import If from '../../Operator/If';
// Component
import Loading from '../../Loading/Loading';
import Error from '../../Common/Error/Error';
// styles
import styles from './styles';

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
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
            source
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
                console.log('Conteúdo anexado na classe!');
            });
    };

    render() {
        // State
        const {
            isLoading,
            isError,
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
                                    <Button
                                        variant="outlined"
                                        fullWidth={true}
                                        className={classes.marginLeft}
                                        onClick={() => this.registerContentInClassroom()}
                                    >
                                        Compartilhar
                                </Button>
                                </If>
                                <Button
                                    component={Link}
                                    to={`/dashboard/${classroomId}/content`}
                                    variant="outlined"
                                    fullWidth={true}
                                    className={classes.marginRight}
                                >
                                    Voltar
                        </Button>
                            </div>
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
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);