import React from 'react';
// Router
import { Link } from 'react-router-dom';
// Firebase
import { database } from '../../../firebase';
// Operator
import If from '../../Operator/If';
// Component
import Loading from '../../Loading/Loading';
import Error from '../../Common/Error/Error';

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

class Content extends React.Component {
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

        return url[4];
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
        const { pathname } = this.props.location;
        const url = pathname.split('/');
        const classroomId = url[2];

        return (
            <div>
                <If test={!isLoading}>
                    <If test={!isError}>
                        <Link
                            to={`/dashboard/${classroomId}/content`}
                        >
                            Voltar
                    </Link>
                        <span>{author}</span>
                        <span>{discipline}</span>
                        <span>{competence}</span>
                        <span>{title}</span>
                        <span>{description}</span>
                        <span>{content}</span>
                        <span>{source}</span>
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

export default Content;