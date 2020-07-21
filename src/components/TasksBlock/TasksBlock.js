import React from 'react';
import TaskComponent from './TaskComponent.js';

import { Grid, Paper } from '@material-ui/core';

const TasksBlock = () => {

    return (
        <Grid item xs={12} sm={6}>
            <div className="card-header">
                <h4>Задачи</h4>
            </div>
            <TaskComponent></TaskComponent>
        </Grid>
    )
}

export default TasksBlock;