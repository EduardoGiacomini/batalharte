import React from 'react';
import PropTypes from 'prop-types';
// Router
import { Link } from 'react-router-dom';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
// styles
import styles from './styles';
// Image
import history from '../../../assets/image/history.png';
import art from '../../../assets/image/art.jpg'

const INITIAL_STATE = {
    open: false
};

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {

        // Props
        const {
            classes,
            classrooms,
        } = this.props;

        return (
            <div className={classes.containerCard}>
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
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Deseja cadastrar um novo conteúdo ou compartilhar um existente?"}</DialogTitle>

                    <DialogActions>
                        <Button
                            //component={Link}
                            //to="/dashboard/:id/content/form"
                            onClick={this.handleClose}
                            color="primary"
                            fullWidth={true}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            //component={Link}
                            //to="/dashboard/:id/content/share"
                            onClick={this.handleClose}
                            color="primary"
                            fullWidth={true}
                        >
                            Compartilhar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);