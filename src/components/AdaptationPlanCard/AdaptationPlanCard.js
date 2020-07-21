import React, { useState, useEffect } from 'react';
//import ProgressBar from '../../old_components/progress-bar';
import InputField from './CardInputField.js';

import { Grid, Paper, Button, makeStyles } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

//import './adaptation-plan-card.css';

const AdaptationPlanCard = () => {

    const useStyles = makeStyles({
        cardContainer: {
            position: 'relative',
            padding: '24px 10px 8px 9px',
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            '& h4': {
                display: 'inline',
                marginLeft: '9px',
                fontWeight: '500',
            }
        },
        bottomCreationDate: {
            textAlign: 'end',
            color: '#6B6B6B',
            fontSize: '13px',
            padding: '12px 6px 0px 0px',
        },
        textEnd: {
            textAlign: 'end',
            marginBottom: '2px',
        },
        editButtonContainer: {
            position: 'absolute',
            top: '17px',
            right: '4%',
            '& svg': {
                fontSize: '20px',
            }
        },
        adaptationPlanSaveBtn: {
            position: 'relative',
            height: '30px',
            marginTop: '20px',
            '& button': {
                float: 'right',
            }
        }
    });

    const classes = useStyles();

    const [editMode, changeMode] = useState(false);

    const state = {
        data: {
            stage: 'execution',
            employee: {
                name: {
                    firstName: 'Иванов Иван Иванович'
                },
                employeePosition: "Аналитик"
            },
            supervisor: {
                name: {
                    firstName: 'Алексеев Иван Анатольевич'
                },
            },
            hr: {
                name: {
                    firstName: 'Смирнова Наталья Викторовна'
                },
            }
        }
    }

    return (
        <Grid item xs={12} sm={6}>
            <div className={classes.cardHeader}>
                <KeyboardBackspaceIcon />
                <h4>Адаптационный план сотрудника</h4>
            </div>
            <Paper elevation={4} className={classes.cardContainer}>
                <div className={classes.editButtonContainer}>
                    <EditIcon onClick={() => changeMode(!editMode)} />
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <div className={classes.textEnd}>
                            ФИО Сотрудника:
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        {editMode
                            ? <InputField value={state.data.employee.name.firstName} />
                            : <div>{state.data.employee.name.firstName} </div>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.textEnd}>
                            Должность:
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        {editMode
                            ? <InputField value={state.data.employee.employeePosition} />
                            : <div>{state.data.employee.employeePosition} </div>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.textEnd}>
                            ФИО Руководителя:
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        {editMode
                            ? <InputField value={state.data.supervisor.name.firstName} />
                            : <div>{state.data.supervisor.name.firstName} </div>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.textEnd}>
                            Период испытательного срока:
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>

                        </div>
                        {editMode
                            ? <InputField value={'21.01.2011 - 21.05.2012'} />
                            : <div>{'21.01.2011 - 21.05.2012'} </div>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.textEnd}>
                            Создан HR-сотрудником:
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        {editMode
                            ? <InputField value={state.data.hr.name.firstName} />
                            : <div>{state.data.hr.name.firstName} </div>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {/* <ProgressBar stage={state.data.stage} /> */}
                    </Grid>
                </Grid>
                <div className={classes.bottomCreationDate}>
                    Создан 25.04.12
                    </div>
                {editMode &&
                    <div className={classes.adaptationPlanSaveBtn}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />}
                        >
                            Сохранить
                            </Button>
                    </div>
                }
            </Paper>
        </Grid>
    )

}

export default AdaptationPlanCard;