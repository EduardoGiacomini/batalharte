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
    color: {
        color: '#3E2723',
    },
    link: {
        textDecoration: 'none',
        color: '#3E2723',
    },
    margin: {
        marginTop: 16,
        marginBottom: 8
    }
});

export default styles;