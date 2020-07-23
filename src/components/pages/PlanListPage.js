import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';

import ListOfPlans from '../ListOfPlans.js';
import PlanCreationForm from '../PlanCreationForm.js';

const PlanListPage = ({ exposureService }) => {
  const [ plans, setPlans ] =  useState([]);
  const [ onCreation, setOnCreation ] = useState(false);
  const [ pageCount, setPageCount] =  useState(1);
  const [ currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const history = useHistory();
  
  useEffect(() => {
    exposureService
      .getAll(`plans?page=${currentPage}&limit=${limit}`)
      .then(data => {
        setPlans(data.plans);
        setPageCount(data.pageCount)
      });
  }, [currentPage, exposureService]);

  const handleCurrentPage = (event, value) => {
    setCurrentPage(value);
  };
  const handleCreateButtonClick = () => setOnCreation(!onCreation);

  const onPlanClicked = (id) => {
    history.push(id);
  };

  return (
    <>
    <Grid justify='center' container spacing={2}>
      <Grid item xs={12}>
        <ListOfPlans
          plans={plans}
          onPlanClicked={onPlanClicked}
          setPlans={setPlans} 
        />
      </Grid>
      <Grid item>
       <Pagination count={pageCount} page={currentPage} onChange={handleCurrentPage}/>
      </Grid>
    </Grid>
    <Grid container justify='flex-end'>
      <Fab
        onClick={handleCreateButtonClick}
        color='primary'>
        <AddIcon />
      </Fab>
      </Grid>
    <PlanCreationForm
      isShowing={onCreation}
      hide={handleCreateButtonClick}
      plans={plans}
      setPlans={setPlans} 
      pageCount={pageCount}
      setPageCount={setPageCount}
      currentPage={currentPage}
      limit={limit}
      />
    </>
  );
};

export default PlanListPage;