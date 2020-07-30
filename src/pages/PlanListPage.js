import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import { useExpService } from '../context/expService.js';
import role from '../utils/role.js'
import { useAuth } from '../context/auth.js';

import ListOfPlans from '../components/PlanList/ListOfPlans.js';
import PlanCreationForm from '../components/PlanList/PlanCreationForm.js';

const PlanListPage = ({search}) => {
  const user = useAuth();
  const isHr = role.hr === user.role;
  const exposureService = useExpService();
  const [ plans, setPlans ] =  useState([]);
  const [ onCreation, setOnCreation ] = useState(false);
  const [ pageCount, setPageCount ] =  useState(1);
  const [ currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const history = useHistory();
  console.log(search)

  useEffect(() => {
    exposureService
      .getAll(`plans`, { page: currentPage, limit: limit, search: search})
      .then(data => {
        setPlans(data.plans);
        setPageCount(data.pageCount)
      });
  }, [currentPage, exposureService, search]);



  const handleCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  const toggleCreationMode = () => setOnCreation(onCreation => !onCreation);

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
          isHr={isHr}
        />
      </Grid>
      <Grid item>
       <Pagination count={pageCount} page={currentPage} onChange={handleCurrentPage}/>
      </Grid>
    </Grid>
    {isHr 
    ? <Grid container justify='flex-end'>
      <Fab
        onClick={toggleCreationMode}
        color='primary'>
        <AddIcon />
      </Fab>
      </Grid>
    : null}
    <PlanCreationForm
      onCreation={onCreation}
      toggleCreationMode={toggleCreationMode}
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