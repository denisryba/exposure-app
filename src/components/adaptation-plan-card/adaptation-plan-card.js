import React from 'react';
import ProgressBar from './progress-bar';
import InputField from './edit-card-input-field';

import { Grid, Paper, Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import './adaptation-plan-card.css';

class AdaptationPlanCard extends React.Component {

    state = {
        editMode: true,
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

    toEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }

    render() {
        return (
            <Grid item xs={12} sm={6}>
                <div className="card-header">
                    <KeyboardBackspaceIcon />
                    <h4>Адаптационный план сотрудника</h4>
                </div>
                <Paper elevation={4} className="card-container">
                    <div className="edit-button-container">
                        <EditIcon onClick={this.toEditMode.bind(this)} />
                    </div>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <div className="text-end">
                                ФИО Сотрудника:
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {this.state.editMode
                                ? <InputField value={this.state.data.employee.name.firstName}/>
                                : <div>{this.state.data.employee.name.firstName} </div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <div className="text-end">
                                Должность:
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {this.state.editMode
                                ? <InputField value={this.state.data.employee.employeePosition}/>
                                : <div>{this.state.data.employee.employeePosition} </div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <div className="text-end">
                                ФИО Руководителя:
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {this.state.editMode
                                ? <InputField value={this.state.data.supervisor.name.firstName}/>
                                : <div>{this.state.data.supervisor.name.firstName} </div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <div className="text-end">
                                Период испытательного срока:
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                
                            </div>
                            {this.state.editMode
                                ? <InputField value={'21.01.2011 - 21.05.2012'}/>
                                : <div>{'21.01.2011 - 21.05.2012'} </div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <div className="text-end">
                                Создан HR-сотрудником:
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            {this.state.editMode
                                ? <InputField value={this.state.data.hr.name.firstName}/>
                                : <div>{this.state.data.hr.name.firstName} </div>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressBar stage={this.state.data.stage} />
                        </Grid>
                    </Grid>
                    <div className="plan-creation-date">
                        Создан 25.04.12
                    </div>
                    {this.state.editMode &&
                        <div className="adaptation-plan-save-btn">
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
}

export default AdaptationPlanCard;