import React from 'react';
import { makeStyles } from '@material-ui/core';

const CardInputField = ({ value, returnDataObj, fieldType, position, nameType }) => {

    const useStyles = makeStyles({
        editCardInput: {
            border: 'none',
            borderBottom: '1px solid #ABABAB',
            padding: '1px 4px',
            width: '30%',
            fontSize: '15px',
        }
    });

    const classes = useStyles();
    const handleInputChange = (e) => {
        returnDataObj({
            fieldType: fieldType,
            position: position,
            nameType: nameType,
            value: e.target.value
        })
    }

    return (
        <input className={classes.editCardInput} type="text" value={value} onChange={handleInputChange} />
    );
};

export default CardInputField;