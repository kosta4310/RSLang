import './controlpanel.style.scss'
import { MyWords } from './mywords.component';

export class ControlPanel {
    myWords: MyWords
    constructor() {
        this.myWords = new MyWords()
    }

    render() {
        const template = `
        <div class="control-panel__container">
            <div class="left-block">
                <div class="games__container">
                    <span class="title">Игры</span>
                    <div class="games_buttons">
                        <div class="learnbook__button pr10">
                            <div class="learnbook__icon-container mr10">
                                <img class="learnbook__icon" src="./assets/learnbook/sound.svg" alt="" class="src">
                            </div>
                            <span>Аудио</span>
                        </div>  
                        <div class="learnbook__button pr10">
                            <div class="learnbook__icon-container mr10">
                                <img class="learnbook__icon" src="./assets/learnbook/timer.svg" alt="" class="src">
                            </div>
                            <span>Спринт</span>
                        </div>
                    </div>
                </div>
                <div class="complexity__container">
                    <span class="title">Сложность</span>
                    <div class="complexity__buttons">
                        <div class="learnbook__button learnbook__button_selected">
                            <div class="learnbook__icon-container">
                                <span>A1</span>
                            </div>
                        </div>  
                        <div class="learnbook__button">
                            <div class="learnbook__icon-container">
                                <span>A2</span>
                            </div>
                        </div>
                        <div class="learnbook__button">
                            <div class="learnbook__icon-container">
                                <span>B1</span>
                            </div>
                        </div>
                        <div class="learnbook__button">
                            <div class="learnbook__icon-container">
                                <span>B2</span>
                            </div>
                        </div>
                        <div class="learnbook__button">
                            <div class="learnbook__icon-container">
                                <span>C1</span>
                            </div>
                        </div>
                        <div class="learnbook__button">
                            <div class="learnbook__icon-container">
                                <span>C2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-block">
                ${this.myWords.render()}
            </div>
        </div>`;
        return template;
    }

    listen() {
        // do nothing
    }
}
