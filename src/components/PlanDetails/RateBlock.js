import React from 'react';

import {
  Grid,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';

export default function RateBlock({ classes, displayPlan, handleCompleteMarkChange, handleRateChange }) {

  const mapReplacement = new Map([
    [true, "Программа пройдена"],
    [false, "Программа не пройдена"],
    ['A', "A. Исключительно высокий уровень эффективности"],
    ['B', "B. Высокий уровень эффективности"],
    ['C', "C. Уровень соответствия занимаемой должности"],
    ['D', "D. Уровень эффективности ниже стандартного"],
    ['E', "E. Неудовлетворительный уровень эффективности"]
  ]);

  if (displayPlan.stage < 3) return null;
  return (
    <React.Fragment>
      <Grid item container className={classes.row}>
        <Grid item container xs={4}>
          <Typography className={classes.textEnd}>
            Итоги:
          </Typography>
        </Grid>
        <Grid item xs={8} sm={7}>
          {displayPlan.stage === 4
            ? <Typography>{mapReplacement.get(displayPlan.completed)} </Typography>
            : <Select
              SelectDisplayProps={{
                style: {
                  padding: 10.5,
                  paddingRight: 39,
                  paddingLeft: 14
                }
              } 
              }
              variant='outlined'
              value={displayPlan.completed}
              onChange={handleCompleteMarkChange}
              className={classes.rateSelect}
            >
              <MenuItem value={false}>Программа не пройдена</MenuItem>
              <MenuItem value={true}>Программа пройдена</MenuItem>
            </Select>}
        </Grid>
      </Grid>
      <Grid item container className={classes.row}>
        <Grid item container xs={4}>
          <Typography className={classes.textEnd}>
            Оценка:
          </Typography>
        </Grid>
        <Grid item xs={8} sm={7}>
          {displayPlan.stage === 4
            ? <Typography>{mapReplacement.get(displayPlan.rate)} </Typography>
            : <Select
              SelectDisplayProps={{
                style: {
                  padding: 10.5,
                  paddingRight: 39,
                  paddingLeft: 14
                }
              } 
              }
              variant='outlined'
              value={displayPlan.rate}
              onChange={handleRateChange}
              className={classes.rateSelect}
            >
              <MenuItem value={'A'}>A. Исключительно высокий уровень эффективности</MenuItem>
              <MenuItem value={'B'}>B. Высокий уровень эффективности</MenuItem>
              <MenuItem value={'C'}>C. Уровень соответствия занимаемой должности</MenuItem>
              <MenuItem value={'D'}>D. Уровень эффективности ниже стандартного</MenuItem>
              <MenuItem value={'E'}>E. Неудовлетворительный уровень эффективности</MenuItem>
            </Select>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}