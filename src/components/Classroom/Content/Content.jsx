import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
// Redux
import { connect } from 'react-redux';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
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
// Operator
import If from '../../Operator/If';
// Components
import Loading from '../../Loading/Loading';

function Transition(props) {
    return <Slide direction="up" {...props} />;
};

const INITIAL_STATE = {
    open: false
};

class Content extends React.Component {
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
            classroom,
        } = this.props;

        const classroomUrl = this.getPathClassroom();

        return (
            <div className={classes.containerCard}>
                <If test={!!classroom}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={history}
                            title="History"
                        />
                        <CardContent className={classes.title}>
                            <Typography gutterBottom variant="headline" component="h2">
                                HISTÓRIA
                    </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                                Vizualizar
                    <VisibilityIcon className={classes.rightIcon} />
                            </Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={art}
                            title="Art"
                        />
                        <CardContent className={classes.title}>
                            <Typography gutterBottom variant="headline" component="h2">
                                ARTE
                    </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
                                Vizualizar
                    <VisibilityIcon className={classes.rightIcon} />
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
                            {"Adicionar conteúdo"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Você deseja cadastrar um novo conteúdo ou compartilhar um existente?                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/content/form`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Cadastrar
                        </Button>
                            <Button
                                component={Link}
                                to={`/dashboard/${classroomUrl}/content/share`}
                                onClick={this.handleClose}
                                color="primary"
                                fullWidth={true}
                            >
                                Compartilhar
                        </Button>
                        </DialogActions>
                    </Dialog>
                </If>
                <If test={!classroom}>
                    <Loading />
                </If>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Content);