const styles = theme => ({
    containerCard: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 20,
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
    avatarRed: {
        backgroundColor: 'red',
    },
    text: {
        paddingBottom: 0
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonAdd: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    title: {
        margin: 0,
        paddingTop: 20,
        color: '#3E2723',
    },
    // Form
    flex: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    formControl: {
        //margin: theme.spacing.unit,
        marginTop: 16,
        marginBottom: 8,
        width: '100%',
    },
    marginLeft: {
        margin: '16px 10px 8px 0px',
    },
    marginRight: {
        margin: '16px 0px 8px 0px',
    },
    optionError: {
        color: 'red',
    },
    optionSucces: {
        color: 'green',
    },
});

export default styles;