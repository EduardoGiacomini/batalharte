import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
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
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
// styles
import styles from './styles';
// Image
import history from '../../../assets/image/history.png';
import art from '../../../assets/image/art.jpg';

function Transition(props) {
    return <Slide direction="up" {...props} />;
};

const INITIAL_STATE = {
    open: false
};

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // Função responsável por retornar o ID da classe representado pela URL da que o usuário está.
    getPathClassroom = () => {
        const { pathname } = this.props.location;
        const classroom = pathname.split('/');
        return classroom[2];
    };

    render() {
        // Props
        const {
            classes,
        } = this.props;

        const classroomUrl = this.getPathClassroom();

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
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatarGreen}></Avatar>
                        }
                        title="A Arte e a Ditadura Militar"
                        subheader="Atividade Concluída"
                    />
                    <CardMedia
                        className={classes.media}
                        image={art}
                        title="Art"
                    />
                    <CardContent className={classes.text}>
                        <Typography component="p">
                            Prazo: 13/08/2018, 00:00
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                            Responder
                        <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatarRed}></Avatar>
                        }
                        title="Ditadura Militar"
                        subheader="Atividade Atrasada"
                    />
                    <CardMedia
                        className={classes.media}
                        image={history}
                        title="History"
                    />
                    <CardContent className={classes.text}>
                        <Typography component="p">
                            Prazo: 09/08/2018, 12:00
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                            Responder
                        <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </CardActions>
                </Card>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.buttonAdd}
                    onClick={this.handleClickOpen}
                >
                    <AddIcon />
                </Button>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">
                        {"Adicionar quiz"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Você deseja cadastrar um novo quiz ou compartilhar um existente?                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            component={Link}
                            to={`/dashboard/${classroomUrl}/quiz/form`}
                            onClick={this.handleClose}
                            color="primary"
                            fullWidth={true}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            component={Link}
                            to={`/dashboard/${classroomUrl}/quiz/share`}
                            onClick={this.handleClose}
                            color="primary"
                            fullWidth={true}
                        >
                            Compartilhar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

Quiz.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quiz);