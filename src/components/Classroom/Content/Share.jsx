import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firebase
import { database } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
// Operator
import If from '../../Operator/If';
// Component
import Loading from '../../Loading/Loading';
import List from './List';
// styles
import styles from './styles';

const INITIAL_STATE = {
    isLoading: true,
    contents: [],
};

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        this.getContents();
    };

    getContents = () => {
        database.doGetContentsPublic()
            .then(contents => {
                const contentsArray = [];

                contents.forEach(content => {
                    const contentObject = content.val();
                    contentObject.uid = content.key;
                    contentsArray.push(contentObject);
                });

                this.setState({
                    isLoading: false,
                    contents: contentsArray,
                });
            });
    };

    getPathClassroom = () => {
        // Props PathName
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    };

    render() {
        // State
        const {
            isLoading,
            contents,
        } = this.state;

        // Props
        const {
            classes,
        } = this.props;

        const classroomUrl = this.getPathClassroom();

        return (
            <div className={classes.containerCard}>
                <If test={!isLoading}>
                    <List title="Lista de conteúdos" array={contents} path={`/dashboard/${classroomUrl}/content/view`} shareOption={true} />
                </If>
                <If test={isLoading}>
                    <Loading />
                </If>
            </div>
        );
    }
}

Share.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Share);