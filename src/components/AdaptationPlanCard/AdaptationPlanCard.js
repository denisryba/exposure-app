import React, { useState, useEffect } from 'react';
import InputField from './CardInputField.js';
import ProgressBar from './ProgressBar.js';

import { Grid, Paper, Button, makeStyles,Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';


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
    },
    button: {
        backgroundColor: '#A6CE39',
        fontSize: 10,
        '&:hover': {
            backgroundColor: '#99bd36',
        }
    }
});

const AdaptationPlanCard = () => {

    const classes = useStyles();

    const [editing, toggleEditMode] = useState(false);

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
            <Typography className={classes.cardHeader}>
                <KeyboardBackspaceIcon />
                <h4>Адаптационный план сотрудника</h4>
            </Typography>
            <Paper elevation={4} className={classes.cardContainer}>
                <div className={classes.editButtonContainer}>
                    <EditIcon onClick={() => toggleEditMode(!editing)} />
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography className={classes.textEnd}>
                            ФИО Сотрудника:
                            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {editing
                            ? <InputField value={state.data.employee.name.firstName} />
                            : <Typography>{state.data.employee.name.firstName} </Typography>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.textEnd}>
                            Должность:
                            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {editing
                            ? <InputField value={state.data.employee.employeePosition} />
                            : <Typography>{state.data.employee.employeePosition} </Typography>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.textEnd}>
                            ФИО Руководителя:
                            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {editing
                            ? <InputField value={state.data.supervisor.name.firstName} />
                            : <Typography>{state.data.supervisor.name.firstName} </Typography>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.textEnd}>
                            Период испытательного срока:
                            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <div>

                        </div>
                        {editing
                            ? <InputField value={'21.01.2011 - 21.05.2012'} />
                            : <Typography>{'21.01.2011 - 21.05.2012'} </Typography>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.textEnd}>
                            Создан HR-сотрудником:
                            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {editing
                            ? <InputField value={state.data.hr.name.firstName} />
                            : <Typography>{state.data.hr.name.firstName} </Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressBar stage={state.data.stage} />
                    </Grid>
                </Grid>
                <Typography className={classes.bottomCreationDate}>
                    Создан 25.04.12
                    </Typography>
                {editing &&
                    <div className={classes.adaptationPlanSaveBtn}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            type="Submit"
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