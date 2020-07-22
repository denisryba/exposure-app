import React, { useState, useEffect } from 'react';

import {
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    Typography,
    Grid,
    Button,
    Select,
    MenuItem,
    FormHelperText,
    FormControl
} from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        '& .MuiCheckbox-colorPrimary': {
            color: '#99bd36'
        }
    },
    content: {
        '& .MuiAccordionSummary-content': {
            display: 'block',
        },
        '& .MuiAccordionSummary-expandIcon': {
            display: 'block',
        },
        '& .Mui-expanded .makeStyles-taskArrowIcon-13': {
            transform: 'rotate(90deg)',
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        '& .makeStyles-taskArrowIcon-13': {
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }
    },
    taskIconBlock: {
        float: 'right',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        width: '35%',
        '& span': {
            padding: '0'
        }
    },
    taskArrowIcon: {
        position: 'absolute',
        top: '0px',
        left: '-7px',
        color: '#ababab',
    },
    taskDate: {
        color: '#6b6b6b',
        display: 'inline-flex',
        fontSize: '14px',
        paddingTop: '4px',
    },
    taskHeader: {
        position: "relative"
    },
    heading: {
        paddingLeft: '24px',
    },
    lowButtonsBlock: {
        position: 'relative',
        '& button': {
            float: 'right',
        }
    },
    button: {
        backgroundColor: '#A6CE39',
        width: "30%",
        fontSize: 10,
        marginTop: 15,
        '&:hover': {
            backgroundColor: '#99bd36',
        }
    },
});

const TaskComponent = ({taskObj, expService}) => {

    const classes = useStyles();

    const [editing, toggleEditMode] = useState(false);
    const [data, setData] = useState(taskObj);

    const convertDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    const handleEditIconClick = (e) => {
        e.stopPropagation();
        toggleEditMode(!editing);
    }

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    className={classes.content}
                >
                    <div className={classes.taskHeader}>
                        <div className={classes.taskIconBlock}>
                            <Typography className={classes.taskDate}>
                                до {convertDate(data.executionEnd).slice(0,5)}
                            </Typography>
                            <Checkbox color="primary" className={classes.root} onClick={(e) => e.stopPropagation()} />
                            <EditIcon onClick={(e) => handleEditIconClick(e)} />
                            <DeleteIcon onClick={(e) => e.stopPropagation()} />
                        </div>
                        <ArrowForwardIosIcon className={classes.taskArrowIcon} />
                        <Typography className={classes.heading}>{data.name}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography color="textSecondary">
                                {data.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.lowButtonsBlock}>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    autoWidth
                                >
                                    <MenuItem value={10}>Выполнена</MenuItem>
                                    <MenuItem value={20}>Не выполнена</MenuItem>
                                </Select>
                                <FormHelperText>Результат выполнения задачи</FormHelperText>
                            </FormControl>
                            {/* <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                type="Submit">
                                Отправить оценку
                            </Button> */}
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                type="Submit">
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default TaskComponent;