import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
// Styles
import styles from './styles';

const UserInformations = props => {

    const { classes, name, description } = props;

    return (
        <Card className={classes.container}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label={name}
                        className={classes.avatar}>
                        {name[0]}
                    </Avatar>
                }
                title={name}
                subheader={description === "teacher" ? "Professor(a)" : "Estudante"}
            />
        </Card>
    );
}

UserInformations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInformations);