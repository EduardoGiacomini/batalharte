const styles = theme => ({
    container: {
        width: '100%',
        margin: 20,
    },
    containerPaper: {
        padding: 20
    },
    containerImage: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0'
    },
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
    optionSuccess: {
        color: 'green',
    },
    //Create
    textSecondaryCreat: {
        margin: '16px 0',
    },
    descriptionCreate: {
        margin: '16px 0',
    },
    optionErrorCreate: {
        color: 'red',
        margin: '5px 0 5px 0',
        textAlign: 'justify',
    },
    optionSuccessCreate: {
        color: 'green',
        margin: '5px 0 5px 0',
        textAlign: 'justify',
    },
    // Play
    titleColor: {
        color: '#3E2723',
    },
});

export default styles;