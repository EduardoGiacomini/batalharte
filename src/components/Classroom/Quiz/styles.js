const styles = theme => ({
    containerCard: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: 300,
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '50%',
    },
    avatarOrange: {
        backgroundColor: 'orange',
    },
    avatarGreen: {
        backgroundColor: 'green',
    },
    avatarRed:{
        backgroundColor: 'red',
    },
    text: {
        paddingBottom: 0
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonAdd: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

export default styles;