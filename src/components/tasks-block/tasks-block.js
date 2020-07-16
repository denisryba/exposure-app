import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import './tasks-block.css';

class TasksBlock extends React.Component {

    render() {
        return (
            <Grid item xs={12} sm={6}>
                <div className="card-header">
                    <h4>Задачи</h4>
                </div>
                <Paper elevation={4} className="card-container">
                    i'm the TasksBlock conponent
                </Paper>
            </Grid>
        )
    }
}

export default TasksBlock;