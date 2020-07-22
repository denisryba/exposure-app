import React from 'react';
import Header from './Header.js';
import AdaptationPlanCard from './AdaptationPlanCard/AdaptationPlanCard.js';
import TasksBlock from './TasksBlock/TasksBlock.js';

import ExposureService from '../services/exposureService.js';

import { Grid } from '@material-ui/core';

const App = () => {
    return (
        <div className="main">
            <Header></Header>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>
                <AdaptationPlanCard expService={ExposureService}></AdaptationPlanCard>
                <TasksBlock expService={ExposureService}></TasksBlock>
            </Grid>
            
        </div>
    )

}

export default App;