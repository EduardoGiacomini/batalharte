const styles = theme => ({
    container: {
        padding: 15,
    },
    formControl: {
      marginTop: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
    containerError: {
        color: 'red',
        marginTop: 10
    },
    containerLoading: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    },
    title: {
        textAlign: 'center',
        margin: 0,
        color: '#3E2723',
    },
    link: {
        textDecoration: 'none',
        color: '#3E2723',
    },
    marginTop: {
        marginTop: 10
    }
});

export default styles;