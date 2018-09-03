import React from 'react';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';

//Styles
import styles from './styles';

const CardQuiz = props => {

    // Props
    const {
        classes,
    } = props;

    return (
        <div className={classes.containerCard}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatarOrange}></Avatar>
                    }
                    title="Era Vargas"
                    subheader="Atividade Pendente"
                />
                <CardMedia
                    className={classes.media}
                    image={history}
                    title="History"
                />
                <CardContent className={classes.text}>
                    <Typography component="p">
                        Prazo: 15/08/2018, 23:59
                        </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                        Responder
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

CardQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardQuiz);