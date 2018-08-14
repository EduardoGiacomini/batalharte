import React from 'react';
import PropTypes from 'prop-types';
// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// styles
import styles from './styles';

class Form extends React.Component {

    state = {
        skills: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
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
                    <form>
                        <TextField
                            id="title"
                            label="Título"
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            id="description"
                            label="Descrição"
                            multiline
                            rowsMax="5"
                            onChange={this.handleChange('multiline')}
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            id="content"
                            label="Conteúdo"
                            multiline
                            rows="5"
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="source"
                            label="Fonte(s)"
                            multiline
                            rowsMax="5"
                            onChange={this.handleChange('multiline')}
                            margin="normal"
                            fullWidth
                            required
                        />
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="age-required">Age</InputLabel>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                name="age"
                                inputProps={{
                                    id: 'age-required',
                                }}
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="age-required">Age</InputLabel>
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                name="age"
                                inputProps={{
                                    id: 'age-required',
                                }}
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="secondary" fullWidth={true} className={classes.margin}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" fullWidth={true} className={classes.margin}>
                            Cadastrar
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);