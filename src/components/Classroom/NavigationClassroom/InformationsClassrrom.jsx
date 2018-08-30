import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Firebase
import { database } from '../../../firebase';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from './styles';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    expanded: false,
    teacherName: '',
};

class InformationsClassroom extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    componentDidMount = () => {
        // Props
        const {
            classroom,
        } = this.props;

        // Classroom informations
        const {
            teacher,
        } = classroom;

        const snapshot = this.getTeacherName(teacher);

        snapshot.then(snap => {
            const {
                name,
            } = snap.val();
            this.setState({ teacherName: name });
        });
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    getTeacherName = async (uid) => await database.doGetUser(uid).once('value');

    render() {
        // State
        const {
            expanded,
            teacherName,
        } = this.state;

        // Props
        const {
            classes,
            classroom,
            user,
        } = this.props;

        // Classroom informations
        const {
            name,
            description,
            uid,
        } = classroom;

        // UserInformations
        const {
            typeUser,
        } = user;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {name[0]}
                        </Avatar>
                    }
                    title={name}
                    subheader={description}
                    action={
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Expandir informações"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            Professor(a): {teacherName}
                        </Typography>
                        <If test={typeUser === 'teacher'}>
                            <Typography color="textSecondary">
                                Código: {uid}
                            </Typography>
                        </If>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

InformationsClassroom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InformationsClassroom);