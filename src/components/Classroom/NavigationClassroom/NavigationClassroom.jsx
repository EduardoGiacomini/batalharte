import React, { Component } from 'react';
// Router
import { Link, Redirect } from 'react-router-dom';
// Firebase
import { firebase, database } from '../../../firebase';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { doListClassroom } from '../../../redux/actions/classroomActions';
// Material-ui
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookIcon from '@material-ui/icons/Book';
import GamesIcon from '@material-ui/icons/Games';
import StarsIcon from '@material-ui/icons/Stars';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    isAuthenticated: true,
    isExist: true,
    value: 0,
};

class NavigationClassroom extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentWillMount = () => {
        this.getPathRoute();
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

    // Método responsável por verificar a rota que o usuário está.
    getPathRoute = () => {
        const { pathname } = this.props.location;
        const route = pathname.split('/');

        switch (route[3]) {
            case "content":
                this.setState({ value: 0 });
                break;
            case "quiz":
                this.setState({ value: 1 });
                break;
            case "ranking":
                this.setState({ value: 2 });
                break;
            default:
                this.setState({ value: 0 });
        }

    };

    // Método responsável por buscar as informações da classe.
    getClassRoom = () => {
        const classroomId = this.getPathClassroom();
        database.doGetClassRoom(classroomId)
            .then((classroom) => {
                if (classroom.val()) {
                    this.props.doListClassroom(classroom.val())
                } else {
                    this.setState({ isExist: false });
                }

            })
            .catch((err) => {
                console.log("Ocorreu um erro durante a busca!", err)
            });

        // Verificar se o usuário pertence à classe.
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    // Função responsável por retornar o ID da classe representado pela URL da que o usuário está.
    getPathClassroom = () => {
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    };

    render() {
        // State
        const {
            isAuthenticated,
            isExist,
            value,
        } = this.state;

        const classroomUrl = this.getPathClassroom();

        return (
            <div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction
                        component={Link}
                        to={`/dashboard/${classroomUrl}/content`}
                        label="Conteúdos"
                        icon={<BookIcon />} />
                    <BottomNavigationAction
                        component={Link}
                        to={`/dashboard/${classroomUrl}/quiz`}
                        label="Quiz"
                        icon={<GamesIcon />} />
                    <BottomNavigationAction
                        component={Link}
                        to={`/dashboard/${classroomUrl}/ranking`}
                        label="Ranking"
                        icon={<StarsIcon />} />
                </BottomNavigation>
                <If test={!isExist}>
                    <Redirect to="/not-found" />
                </If>
                <If test={!isAuthenticated}>
                    <Redirect exact to="/" />
                </If>
            </div>
        );
    }
}

const mapStateToProps = state => ({ classroom: state.classroom });
const mapDispatchToProps = dispatch => bindActionCreators({ doListClassroom }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavigationClassroom);