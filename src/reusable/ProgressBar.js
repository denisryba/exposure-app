import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        '& .MuiStep-horizontal': {
            paddingLeft: '0px',
            paddingRight: '5px',
        }
    },
    stepper: {
        flexWrap: 'wrap'
    }
}));

export default function ProgressBar({ stage }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Заполнение', 'Согласование', 'Выполнение', 'Оценка', 'Завершено'];

    useEffect(() => {
        setActiveStep(stage);
    }, [stage, activeStep]);

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div> */}
        </div>
    );
}