import React from 'react';
import TaskComponent from './TaskComponent.js';

import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'relative'
    },
    button: {
        float: 'right',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '30px',
        '& .MuiButton-startIcon': {
            color: '#A6CE39'
        },
        '&:hover': {
            backgroundColor: '#eaeaea'
        }
    },
}));

const TasksBlock = ({expService}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6}>
            <Typography className={classes.header}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<NoteAddIcon />}
                >
                    Создать задачу
                </Button>
                <h4>Задачи</h4>
            </Typography>
            <TaskComponent expService={expService}></TaskComponent>
        </Grid>

    )
}

export default TasksBlock;