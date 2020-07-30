import React from 'react';

import {
  Grid,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';

export default function RateBlock({ classes, displayPlan, handleCompleteMarkChange, handleRateChange }) {

  const mapReplacement = new Map([
    [true, "Выполнен"],
    [false, "Не выполнен"],
    ['A', "Исключительно высокий уровень эффективности"],
    ['B', "Высокий уровень эффективности"],
    ['C', "Уровень соответствия занимаемой должности"],
    ['D', "Уровень эффективности ниже стандартного"],
    ['E', "Неудовлетворительный уровень эффективности"]
  ]);

  if (displayPlan.stage < 3) return null;
  return (
    <React.Fragment>
      <Grid item container spacing={2}>
        <Grid className={classes.fieldLabelContainer} item xs={6}>
          <Typography className={classes.textEnd}>
            Итоги:
                </Typography>
        </Grid>
        <Grid item xs={6}>
          {displayPlan.stage === 4
            ? <Typography>{mapReplacement.get(displayPlan.completed)} </Typography>
            : <Select
              value={displayPlan.completed}
              onChange={handleCompleteMarkChange}
            >
              <MenuItem value={false}>Не выполнен</MenuItem>
              <MenuItem value={true}>Выполнен</MenuItem>
            </Select>}
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid className={classes.fieldLabelContainer} item xs={6}>
          <Typography className={classes.textEnd}>
            Оценка:
                </Typography>
        </Grid>
        <Grid item xs={6}>
          {displayPlan.stage === 4
            ? <Typography>{mapReplacement.get(displayPlan.rate)} </Typography>
            : <Select
              value={displayPlan.rate}
              onChange={handleRateChange}
              className={classes.rateSelect}
            >
              <MenuItem value={'A'}>Исключительно высокий уровень эффективности</MenuItem>
              <MenuItem value={'B'}>Высокий уровень эффективности</MenuItem>
              <MenuItem value={'C'}>Уровень соответствия занимаемой должности</MenuItem>
              <MenuItem value={'D'}>Уровень эффективности ниже стандартного</MenuItem>
              <MenuItem value={'E'}>Неудовлетворительный уровень эффективности</MenuItem>
            </Select>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}