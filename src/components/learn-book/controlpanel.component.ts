import { Book } from './classLearnBook';
import './controlpanel.style.scss'
import { MyWords } from './mywords.component';

export class ControlPanel {
    myWords: MyWords
    parent: Book
    constructor(parent: Book) {
        this.parent = parent
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
                        <div class="learnbook__button learnbook__button_selected" data-complexity="0">
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
                ${this.myWords.render()}
            </div>
        </div>`;
        
        const controlPanel = <HTMLElement>document.querySelector('#control-panel');
        controlPanel.insertAdjacentHTML('beforeend', template);
        this.listen();
    }

    listen() {
        // do nothing
        const complexityButtons = document.querySelector('.complexity__buttons')
        complexityButtons?.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            const btn = target.closest('.learnbook__button')
            if (btn) {
                const buttons = complexityButtons.querySelectorAll('.learnbook__button');
                buttons.forEach(i => i.classList.remove('learnbook__button_selected'));
                btn.classList.add('learnbook__button_selected');
                const complexity = +<string>btn.getAttribute('data-complexity');
                this.parent.renderWords(complexity);
            }
        });
    }
}
