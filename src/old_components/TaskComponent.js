import React from 'react';

import { Paper, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskComponent = () => {

    const useStyles = makeStyles({
        taskContainer: {
            position: 'relative',
            paddingLeft: '40px',
            transitionProperty: 'height',
            transitionDuration: '2s',
            paddingTop: '26px',
            '& bottom-creation-date': {
                display: 'none'
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
            left: '8px',
            top: '22px',
            color: '#ababab',
        },
        taskDate: {
            color: '#6b6b6b',
            display: 'inline-flex',
            fontSize: '14px',
            paddingTop: '4px',
        },
        taskDescription: {
            color: '#ababab',
            fontSize: '13px',
            height: '15px',
            overflow: 'hidden',
        },
        bottomCreationDate: {
            textAlign: 'end',
            color: '#6B6B6B',
            fontSize: '13px',
            padding: '12px 6px 0px 0px',
        },
        // taskTitle:hover {
        //     cursor: pointer;
        // }
        unfold: {
            '& taskArrowIcon': {
                transform: 'rotate(90deg)',
            },
            '& taskDescription': {
                overflow: 'initial',
                height: 'fitContent'
            },
            '& bottomCreationDate': {
                display: 'block'
            }
        }
    });

    const classes = useStyles();

    const unfold = (e) => {
        if (!e.target.classList.contains("task-title")) return;
        const classArr = e.currentTarget.classList;
        if (classArr.contains('makeStyles-unfold-12')) {
            classArr.remove("makeStyles-unfold-12");
        } else {
            classArr.add('makeStyles-unfold-12');
        }
    }

    return (
        <Paper onClick={unfold} elevation={4} className={classes.taskContainer + ' ' + classes.unfold}>
            <div className="task-header">
                <div className={classes.taskIconBlock}>
                    <div className={classes.taskDate}>
                        до 31.07
                        </div>
                    <Checkbox color="primary" />
                    <EditIcon />
                    <DeleteIcon />
                </div>
                <ArrowForwardIosIcon className={classes.taskArrowIcon} />
                <div className="task-title">Сделать презентацию</div>
            </div>
            <div className="task-body">
                <p className={classes.taskDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat molestie ligula ac dictum. Ut in varius turpis. Vestibulum iaculis ante nec dui facilisis, at vehicula sapien aliquam. Nam purus mauris, iaculis sit amet neque sed, volutpat sodales elit. In sed vehicula massa. Mauris non urna in.
                    </p>
                <div className={classes.bottomCreationDate}>
                    Создан 25.04.12
                    </div>
            </div>
        </Paper>
    )

}

export default TaskComponent;