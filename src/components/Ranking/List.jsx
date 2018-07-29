import React from 'react';
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

// Components ListRanking que tem a responsabilidade de listar todos os usuários recebidos
// por meio de props.
const ListRanking = props => {
    
    const { users } = props;
    
    return (
        <List>
            {
                users.map(user => {
                    const { uid, name, highScore } = user;
                    return (
                        <ListItem key={uid}>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                            <ListItemText primary={name} secondary={`Pontuação: ${highScore}`} />
                        </ListItem>
                    );
                })
            }
        </List>
    );
}

export default ListRanking;