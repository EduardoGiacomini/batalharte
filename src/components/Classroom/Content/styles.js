const styles = theme => ({
    container: {
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
        width: 350,
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    title: {
        textAlign: 'center',
        margin: 0,
        paddingTop: 20,
        color: '#3E2723',
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