import React from 'react';

import { Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './task-component.css';

class TaskComponent extends React.Component {

    unfold = (e) => {
        if (!e.target.classList.contains("task-title")) return;
        const classArr = e.currentTarget.classList;
        if (classArr.contains('unfold')) {
            classArr.remove("unfold");
        } else {
            classArr.add('unfold');
        }
    }

    render() {
        return (
            <Paper onClick={this.unfold} elevation={4} className="card-container task-container unfold">
                <div className="task-header">
                    <div className="task-icon-block">
                        <div className="task-date">
                            до 31.07
                        </div>
                        <Checkbox color="primary" />
                        <EditIcon />
                        <DeleteIcon />
                    </div>
                    <ArrowForwardIosIcon className="task-arrow-icon" />
                    <div className="task-title">Сделать презентацию</div>
                </div>
                <div className="task-body">
                    <p className="task-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat molestie ligula ac dictum. Ut in varius turpis. Vestibulum iaculis ante nec dui facilisis, at vehicula sapien aliquam. Nam purus mauris, iaculis sit amet neque sed, volutpat sodales elit. In sed vehicula massa. Mauris non urna in.
                    </p>
                    <div className="bottom-creation-date">
                        Создан 25.04.12
                    </div>
                </div>
            </Paper>
        )
    }
}

export default TaskComponent;