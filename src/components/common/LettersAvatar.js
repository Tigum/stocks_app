import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const LetterAvatars = props => {
    const { classes, letters } = props;
    return (
        <Avatar className={classes.purpleAvatar}>{letters || 'SA'}</Avatar>
    );
}

const styles = {
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    }
};

export default withStyles(styles)(LetterAvatars);