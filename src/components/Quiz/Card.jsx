import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Operator
import If from '../Operator/If';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

const CardQuiz = props => {

    const { classes, quizzes } = props;

    return (
        <div>
            {
                quizzes.map(quiz => {
                    const { uid, title, subTitle, urlImage } = quiz;
                    return (
                        <Card key={uid} className={classes.card}>
                            <If test={urlImage !== ""}>
                                <CardMedia
                                    className={classes.media}
                                    image={urlImage}
                                    title="Imagem do cartão"
                                />
                            </If>
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {title}
                                </Typography>
                                <Typography component="p">
                                    {subTitle}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth href={`/praticar/${uid}`} variant="raised" size="small" color="primary">
                                    Praticar
                                </Button>
                            </CardActions>
                        </Card>
                    );
                })
            }
        </div>
    );
}

CardQuiz.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardQuiz);