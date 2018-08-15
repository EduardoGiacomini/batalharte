import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// styles
import styles from './styles';

const INITIAL_STATE = {
    title: '',
    description: '',
    content: '',
    source: '',
    competence: '',
    discipline: '',
    isPublic: '',
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        // State
        const {
            title,
            description,
            content,
            source,
            competence,
            discipline,
            isPublic,
        } = this.state;

        // Props
        const {
            classes,
        } = this.props;

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3" className={classes.titleForm}>
                        Cadastrar Conteúdo
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            value={title}
                            onChange={this.handleChange('title')}
                            id="title"
                            label="Título"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            value={description}
                            onChange={this.handleChange('description')}
                            id="description"
                            label="Descrição"
                            multiline
                            rowsMax="5"
                            fullWidth
                            required
                        />
                        <TextField
                            value={content}
                            onChange={this.handleChange('content')}
                            id="content"
                            label="Conteúdo"
                            multiline
                            rows="5"
                            fullWidth
                            required
                        />
                        <TextField
                            value={source}
                            onChange={this.handleChange('source')}
                            id="source"
                            label="Fonte(s)"
                            multiline
                            rowsMax="10"
                            fullWidth
                            required
                        />
                        <TextField
                            value={competence}
                            onChange={this.handleChange('competence')}
                            id="competence"
                            label="Competências abordadas"
                            multiline
                            rowsMax="10"
                            fullWidth
                            required
                        />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="discipline-input">Disciplina</InputLabel>
                            <Select
                                value={discipline}
                                onChange={this.handleChangeSelect}
                                name="discipline"
                                inputProps={{
                                    id: 'discipline-input',
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Selecione uma opção
                                    </MenuItem>
                                <MenuItem value="history">História</MenuItem>
                                <MenuItem value="art">Artes</MenuItem>
                                <MenuItem value="interdisciplinary">Interdisciplinar</MenuItem>
                            </Select>
                            <FormHelperText>Disciplina abordada</FormHelperText>
                        </FormControl>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="isPublic-input">Conteúdo público</InputLabel>
                            <Select
                                value={isPublic}
                                onChange={this.handleChangeSelect}
                                name="isPublic"
                                inputProps={{
                                    id: 'isPublic-input',
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Selecione uma opção
                                    </MenuItem>
                                <MenuItem value={`true`}>Sim</MenuItem>
                                <MenuItem value={`false`}>Não</MenuItem>
                            </Select>
                            <FormHelperText>Reutilização do conteúdo por outras pessoas</FormHelperText>
                        </FormControl>
                        <div className={classes.flex}>
                            <Button
                                variant="outlined"
                                fullWidth={true}
                                className={classes.marginLeft}>
                                Cancelar
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth={true}
                                className={classes.marginRight}>
                                Salvar
                        </Button>
                        </div>
                    </form>
                </Paper>
            </div >
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
