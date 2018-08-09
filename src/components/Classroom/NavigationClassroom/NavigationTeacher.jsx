import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookIcon from '@material-ui/icons/Book';
import GamesIcon from '@material-ui/icons/Games';
import StarsIcon from '@material-ui/icons/Stars';
// Operator
import If from '../../Operator/If';

const INITIAL_STATE = {
    value: 0,
};

class SimpleBottomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        // State
        const {
            value,
        } = this.state;

        return (
            <div>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction label="Conteúdos" icon={<BookIcon />} />
                    <BottomNavigationAction label="Quiz" icon={<GamesIcon />} />
                    <BottomNavigationAction label="Ranking" icon={<StarsIcon />} />
                </BottomNavigation>
                <If test={value === 0}>
                    <p>Aba de conteúdos</p>
                </If>
                <If test={value === 1}>
                    <p>Aba de quiz</p>
                </If>
                <If test={value === 2}>
                    <p>Aba de ranking</p>
                </If>
            </div>
        );
    }
}

export default SimpleBottomNavigation;