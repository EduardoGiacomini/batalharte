const styles = theme => ({
    container: {
        width: '100%',
        margin: 20,
    },
    // Content
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
        paddingTop: '56.25%',
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
    buttonAdd: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    // Form
    flex: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 20
    },
    titleForm: {
        textAlign: 'center'
    },
    formControl: {
        //margin: theme.spacing.unit,
        width: '100%',
    },
    marginLeft: {
        margin: '20px 5px 20px 0px',
    },
    marginRight: {
        margin: '20px 0px 20px 5px',
    },
});

export default styles;