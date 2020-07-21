import React from 'react';
import { makeStyles } from '@material-ui/core';

const CardInputField = ({value}) => {

    const useStyles = makeStyles({
        editCardInput: {
            border: 'none',
            borderBottom: '1px solid #ABABAB',
            padding: '1px 4px',
            width: '75%',
            fontSize: '15px',
        }
    });

    const classes = useStyles();

    return (
        <input className={classes.editCardInput} type="text" value={value}/>
    );
};

export default CardInputField;