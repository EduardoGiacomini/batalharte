import React, { Component } from 'react';
// react-router-dom
import { Redirect } from 'react-router-dom';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listQuestions } from '../../redux/actions/quizActions';
// operator
import If from '../Operator/If';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: true,
        };
    }

    // Buscando questões do quiz antes da montagem do componente.
    componentWillMount = () => {
        const path = this.getPathName();
        firebase.database().ref('questions').child(path).once('value', snapshot => {
            if (snapshot.val()) {
                this.props.listQuestions(snapshot.val());
            } else {
                console.error('Não há um quiz para a URL desejada!');
            }
        })
    }

    // Verificando se o usuário está autenticado.
    componentDidMount = () => {
        this.authRef = firebase.auth().onAuthStateChanged(user => this.setState({ isAuthenticated: !!user }));
    }

    componentWillUnmount = () => {
        this.authRef();
    }

    getPathName = () => {
        // Capturando url.
        const { pathname } = this.props.location;
        // Separando em um vetor de strings a partir da barra (/).
        const url = pathname.split('/');
        // Resultado: ["", "praticar", ":uid"].
        return url[2];
    }

    render() {
        const { questions } = this.props;
        const { isAuthenticated } = this.state;
        console.log(questions);
        return (
            <div>
                <h2>Quiz (Teste)</h2>
                <If test={!isAuthenticated}>
                    <Redirect to="/" />
                </If>
            </div>
        );
    }
}

const mapStateToProps = state => ({ questions: state.questions });
const mapDispatchToProps = dispatch => bindActionCreators({ listQuestions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);