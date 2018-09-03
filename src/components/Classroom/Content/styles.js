const styles = theme => ({
    container: {
        width: '100%',
        margin: 20,
    },
    // Contents
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
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    // Content
    body: {
        margin: '20px 0'
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
        margin: 20,
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
    // List
    title: {
        margin: 0,
        paddingTop: 20,
        color: '#3E2723',
    },
    color: {
        color: '#3E2723'
    }
});

export default styles;