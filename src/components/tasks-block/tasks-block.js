import React from 'react';
import TaskComponent from './task-component';

import { Grid, Paper } from '@material-ui/core';
import './tasks-block.css';

class TasksBlock extends React.Component {

    render() {
        return (
            <Grid item xs={12} sm={6}>
                <div className="card-header">
                    <h4>Задачи</h4>
                </div>
            <TaskComponent></TaskComponent>
            </Grid>
        )
    }
}

export default TasksBlock;