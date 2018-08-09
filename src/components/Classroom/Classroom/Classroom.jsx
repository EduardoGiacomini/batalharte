import React from 'react';
// react-router-dom
import { Redirect } from 'react-router-dom';
// Firebase
import { firebase, database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doListClassroom } from '../../../redux/actions/classroomActions';
// Component
import Loading from '../../Loading/Loading';
import ClassroomError from './ClassroomError/ClassroomError';
import NavigationTeacher from '../NavigationClassroom/NavigationTeacher';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    isAuthenticated: true,
    isLoading: true,
    isExist: true,
};

class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount = () => {
        this.removeAuthListener = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ isAuthenticated: true });
                this.getClassRoom();
            } else {
                this.setState({ isAuthenticated: false });
            }
        });
    };

    componentWillUnmount = () => {
        this.removeAuthListener();
    };

    // Método responsável por buscar as informações da classe.
    getClassRoom = () => {
        const classroomId = this.getPathName();
        database.doGetClassRoom(classroomId)
            .then((classroom) => {

                this.setState({ isLoading: false });

                if (classroom.val()) {
                    this.props.doListClassroom(classroom.val())
                } else {
                    this.setState({ isExist: false });
                }

            })
            .catch((err) => {
                console.log("Ocorreu um erro durante a busca!", err)

                this.setState({ isLoading: false });

            })

        // Verificar se o usuário pertence à classe.
    }

    // Função responsável por retornar o ID da classe representado pela URL da que o usuário está.
    getPathName = () => {
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    }

    render() {
        // State
        const {
            isAuthenticated,
            isLoading,
            isExist,
        } = this.state;
        // Props
        const {
            user,
        } = this.props;

        return (
            <div>
                <If test={!isLoading}>
                    <div>
                        <If test={isExist}>
                            {
                                user &&
                                    user.typeUser === "teacher" ?
                                    <NavigationTeacher /> :
                                    <h1>Olá estudante.</h1>
                            }
                        </If>
                        <If test={!isExist}>
                            <ClassroomError />
                        </If>
                    </div>
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
                <If test={!isAuthenticated}>
                    <Redirect to="/" />
                </If>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user, classroom: state.classroom });
const mapDispatchToProps = dispatch => bindActionCreators({ doListClassroom }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);