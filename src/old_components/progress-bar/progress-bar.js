import React from 'react';
import './progress-bar.css';
import { makeStyles } from '@material-ui/core';



const ProgressBar = ({ stage }) => {

    const useStyles = makeStyles({
        root: {
            background: '#fff',
            width: '100%',
            paddingTop: '10px',
            paddingBottom: '5px'
        },
        progressBar: {
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'center',
            counterReset: 'step',
        },
        liStep: {
            listStyleType: 'none',
            width: '17%',
            float: 'left',
            fontSize: '9px',
            position: 'relative',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#7d7d7d',
            '& :before': {
                width: '25px',
                height: '25px',
                content: "",
                lineHeight: '25px',
                border: '2px solid #7d7d7d',
                display: 'block',
                textAlign: 'center',
                margin: '0 auto 3px auto',
                borderRadius: '50%',
                position: 'relative',
                zIndex: '2',
                backgroundColor: '#fff',
            }
        }
    });

    const classes = useStyles();

    function setStatusClass(elNum) {
        let numStage;
        switch (stage) {
            case ('creation'): {
                numStage = 0;
                break;
            }
            case ('filling'): {
                numStage = 1;
                break;
            }
            case ('assigning'): {
                numStage = 2;
                break;
            }
            case ('execution'): {
                numStage = 3;
                break;
            }
            case ('rating'): {
                numStage = 4;
                break;
            }
            case ('final'): {
                numStage = 5;
                break;
            }
            default: {
                numStage = 0;
                break;
            }
        }
        if (elNum < numStage) return "active"
        else return "";
    }

    return (
        <div className={classes.root}>
            <ul className="progressbar">
                <li className={() => setStatusClass(0) + classes.liStep}>Создание</li>
                <li className={setStatusClass(1)}>Заполнение</li>
                <li className={setStatusClass(2)}>Согласование</li>
                <li className={setStatusClass(3)}>Выполнение</li>
                <li className={setStatusClass(4)}>Оценка</li>
                <li className={setStatusClass(5)}>Завершение</li>
            </ul>
        </div>

    )

}

export default ProgressBar;