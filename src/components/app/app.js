import React from 'react';
import './app.css';
import Header from '../header';
import AdaptationPlanCard from '../adaptation-plan-card';
import TasksBlock from '../tasks-block';

import { Grid } from '@material-ui/core';
//import { Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <div className="main">
            <Header></Header>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>
                <AdaptationPlanCard></AdaptationPlanCard>
                <TasksBlock></TasksBlock>
            </Grid>

        </div>
    )

}

export default App;