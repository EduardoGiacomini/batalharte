import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// operator
import If from '../Operator/If';

const styles = {
    card: {
        maxWidth: 400,
    },
    text: {
        textAlign: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItens: 'center',
    },
    button: {
        margin: '5px',
    },
};


class Question extends Component {

    render() {
        const { classes, question, counter } = this.props;
        return (
            <If test={question !== {}}>
                {console.log(question)}
                <Card className={classes.card}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="headline"
                            component="h2"
                            className={classes.text}
                        >
                            Pergunta {counter + 1}
                        </Typography>
                        <Typography
                            component="p"
                            className={classes.text}
                        >
                            {question.description}
                        </Typography>
                    </CardContent>
                    <If test={question.alternatives !== undefined}>
                        <CardActions
                            className={classes.buttons}
                        >
                            {
                                question.alternatives !== undefined &&
                                question.alternatives.map((alternative, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            className={classes.button}
                                            onClick={() => this.props.setAlternative(question.correct, alternative)}
                                        >
                                            {alternative}
                                        </Button>
                                    )
                                })
                            }
                        </CardActions>
                    </If>
                </Card>
            </If>
        );
    }
}

Question.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Question);