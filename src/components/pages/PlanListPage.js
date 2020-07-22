import React, { useState, useEffect } from 'react';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ListOfPlans from '../ListOfPlans.js';
import PlanCreationForm from '../PlanCreationForm.js';

const PlanListPage = ({ exposureService }) => {
  const [ plans, setPlans ] =  useState([]);
  const [ onCreation, setOnCreation ] = useState(false);

  useEffect(() => {
    exposureService
      .getAll('plans')
      .then(plans => {
        setPlans(plans)
      });
  }, [exposureService]);

  const handleCreateButtonClick = () => setOnCreation(!onCreation);

  return (
    <>
      <Grid justify='flex-end' container>
      <Grid item xs={12}>
        <ListOfPlans
          plans={plans}
          setPlans={setPlans} />
      </Grid>
      <Grid item>
        <Fab
          onClick={handleCreateButtonClick}
          color='secondary'>
          <AddIcon />
        </Fab>
      </Grid>
      </Grid>
      <PlanCreationForm
        isShowing={onCreation}
        hide={handleCreateButtonClick}
        plans={plans}
        setPlans={setPlans} />
    </>
  );
};

export default PlanListPage;