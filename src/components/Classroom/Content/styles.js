const styles = theme => ({
    containerCard: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: 350,
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    title: {
        paddingBottom: 0
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

export default styles;