import { state } from '../../../state';
import './controlPanel.style.scss';

const MY_WORDS_TEMPLATE = `
        <div class="learnbook__button pr10 hard-words">
            <div class="learnbook__icon-container mr10">
                <img class="learnbook__icon" src="./assets/svg/fire.svg" alt="fire" class="src">
            </div>
            <span>Сложные</span>
        </div>`;

export const getContolPanelTemplate = () => {
    return `
<div class="control-panel__container">
    <div class="left-block">
        <div class="games__container">
            <span class="title">Игры</span>
            <div class="games_buttons">
                <a href="/audio-call" class="learnbook__button pr10" data-navigo>
                    <div class="learnbook__icon-container mr10">
                        <img class="learnbook__icon" src="./assets/svg/sound.svg" alt="sound" class="src">
                    </div>
                    <span>Аудио</span>
                </a>  
                <a href="/sprint" class="learnbook__button pr10" data-navigo>
                    <div class="learnbook__icon-container mr10">
                        <img class="learnbook__icon" src="./assets/svg/timer.svg" alt="" class="src">
                    </div>
                    <span>Спринт</span>
                </a>
            </div>
        </div>
        <div class="complexity__container">
            <span class="title">Сложность</span>
            <div class="complexity__buttons">
                <div class="learnbook__button" data-complexity="0">
                    <div class="learnbook__icon-container">
                        <span>A1</span>
                    </div>
                </div>  
                <div class="learnbook__button" data-complexity="1">
                    <div class="learnbook__icon-container">
                        <span>A2</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="2">
                    <div class="learnbook__icon-container">
                        <span>B1</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="3">
                    <div class="learnbook__icon-container">
                        <span>B2</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="4">
                    <div class="learnbook__icon-container">
                        <span>C1</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="5">
                    <div class="learnbook__icon-container">
                        <span>C2</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="right-block">
        <div class="mywords-container">
        ${state.getItem('isAuth') ? MY_WORDS_TEMPLATE : ''}
        </div>
        <div class="message message_hidden"><p class="animate-character">Страница изучена</p></div>
    </div>
</div>`;
};
