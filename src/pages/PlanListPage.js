import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pagination from '@material-ui/lab/Pagination';
import { useExpService } from '../context/expService.js';
import role from '../utils/role.js'
import { useAuth } from '../context/auth.js';
import ActionButton from '../reusable/ActionButton.js';

import ListOfPlans from '../components/PlanList/ListOfPlans.js';
import PlanCreationForm from '../components/PlanList/PlanCreationForm.js';
import loaderHoc from '../reusable/HocLoader.js';

const useStyles = makeStyles((theme) => ({
  message: {
    minHeight: 500,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

const PlanListPage = ({ search }) => {
  const classes = useStyles();
  const user = useAuth();
  const isHr = role.hr === user.role;
  const exposureService = useExpService();
  const [plans, setPlans] = useState([]);
  const [onCreation, setOnCreation] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [planDeleted, setPlanDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const limit = 5;

  const history = useHistory();

  useEffect(() => {
    exposureService
      .getAll(`plans`, { page: currentPage, limit: limit, search: search })
      .then(data => {
        setPlans(data.plans);
        setPageCount(data.pageCount);
        setPlanDeleted(false);
        setLoading(false);
      });
  }, [currentPage, exposureService, search, planDeleted]);



  const handleCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  const toggleCreationMode = () => setOnCreation(onCreation => !onCreation);

  const onPlanClicked = (id) => {
    history.push(id);
  };

  const ListOfPlansWithLoader = loaderHoc(
    ListOfPlans,
    plans
  )

  return (
    <>
      <Grid justify='center' container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Адаптационные планы</Typography>
          <ListOfPlansWithLoader
            onPlanClicked={onPlanClicked}
            isHr={isHr}
            setPlanDeleted={setPlanDeleted}
          />
        </Grid>
        {!loading &&
          <Grid item>
            <Pagination count={pageCount} page={currentPage} onChange={handleCurrentPage} />
          </Grid>}
      </Grid>
      {!loading &&
        (plans.length ?
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
          :
          <Grid container justify="center" alignItems="center" className={classes.message} >
            <Typography variant="subtitle1">Планов пока нет, но они скоро появятся :)</Typography>
          </Grid>
        )
      }
      {isHr
        ? <Box className={classes.fab}>
            <ActionButton
              text='Создать план'
              innerIcon={<AddIcon />}
              handler={toggleCreationMode} />
          </Box>
        : null}
    </>
  );
};

export default PlanListPage;