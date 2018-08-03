import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
// Components
import ListTeacher from './ListTeacher';

class Classrooms extends Component {

    render() {
        const { user } = this.props;
        return (
            <div>
                {
                    user.typeUser === "teacher" &&
                    <ListTeacher />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(Classrooms);