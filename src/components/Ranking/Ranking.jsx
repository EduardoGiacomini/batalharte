import React, { Component } from 'react';
// firebase
import firebase from '../../firebase/firebase';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listUsers } from '../../redux/actions/rankingActions';

class Ranking extends Component {

    componentDidMount() {
        firebase.database().ref('users').on('value', snapshot => {
            const users = [];
            snapshot.forEach(user => {
                users.push(user.val());
            })
            this.props.listUsers(users);
        })
    }

    render() {
        return (
            <div>
                <h3>Ranking s</h3>
            </div>
        );
    }
}

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch => bindActionCreators({ listUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);