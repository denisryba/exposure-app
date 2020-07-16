import React from 'react';
import './progress-bar.css';

const ProgressBar = ({stage}) => {

    function funFiction (elNum) {
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
        <div className="progress-container">
            <div className="progressbar-wrapper">
                <ul className="progressbar">
                    <li className={funFiction(0)}>Создание</li>
                    <li className={funFiction(1)}>Заполнение</li>
                    <li className={funFiction(2)}>Согласование</li>
                    <li className={funFiction(3)}>Выполнение</li>
                    <li className={funFiction(4)}>Оценка</li>
                    <li className={funFiction(5)}>Завершение</li>
                </ul>
            </div>
        </div>

    )

}

export default ProgressBar;