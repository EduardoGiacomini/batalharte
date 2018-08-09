const styles = theme => ({
    card: {
        margin: 20,
    },
    containerButtons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

export default styles;