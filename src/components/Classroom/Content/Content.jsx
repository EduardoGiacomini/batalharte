import React from 'react';
import PropTypes from 'prop-types';
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
// styles
import styles from './styles';
// Image
import history from '../../../assets/image/history.png';
import art from '../../../assets/image/art.jpg';
// Operator
import If from '../../Operator/If';
// Components
import Loading from '../../Loading/Loading';

function Content(props) {

    // Props
    const {
        classes,
        classroom,
    } = props;

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
            </If>
            <If test={!classroom}>
                <Loading />
            </If>
        </div>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ classroom: state.classroom });

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))(Content);