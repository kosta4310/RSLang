import { state } from './../../../state';
import { getContolPanelTemplate } from './controlPanel.template';
import { Book } from '../learnbook.component';

export class ControlPanel {
    parent: Book;
    constructor(parent: Book) {
        this.parent = parent;
    }

    render() {
        const CONTROL_PANEL_TEMPLATE = getContolPanelTemplate();
        const controlPanel = <HTMLElement>document.querySelector('#control-panel');
        controlPanel.insertAdjacentHTML('beforeend', CONTROL_PANEL_TEMPLATE);
        const complexity = this.parent.complexity;
        const elem = <HTMLElement>document.querySelector(`.learnbook__button[data-complexity="${complexity}"]`);
        elem.classList.add('learnbook__button_selected');
        this.listen();
    }

    listen() {
        const complexityButtons = document.querySelector('.complexity__buttons');
        complexityButtons?.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            const btn = target.closest('.learnbook__button');
            if (btn) {
                const buttons = complexityButtons.querySelectorAll('.learnbook__button');
                buttons.forEach((i) => i.classList.remove('learnbook__button_selected'));
                btn.classList.add('learnbook__button_selected');
                const complexity = +(<string>btn.getAttribute('data-complexity'));
                this.parent.complexity = complexity;
                state.setItem({ complexity: complexity.toString() });
                this.parent.renderWords();
                const pagination = <HTMLElement>document.querySelector('.pagination__container');
                pagination.classList.remove('hidden');
                const complexWordsBtn = document.querySelector('.hard-words');
                complexWordsBtn?.classList.remove('hard-words_selected');
            }
        });
        const gameBtns = document.querySelectorAll('.pr10');
        gameBtns.forEach((el) => {
            el.addEventListener('click', () => {
                state.setItem({ isFromBook: true });
            });
        });

        const complexWordsBtn = document.querySelector('.hard-words');
        complexWordsBtn?.addEventListener('click', (e) => {
            this.parent.renderWords(true);
            const pagination = <HTMLElement>document.querySelector('.pagination__container');
            pagination.classList.add('hidden');
            const complexityButtons = <HTMLElement>document.querySelector('.complexity__buttons');
            const buttons = complexityButtons.querySelectorAll('.learnbook__button');
            buttons.forEach((i) => i.classList.remove('learnbook__button_selected'));
            complexWordsBtn.classList.add('hard-words_selected');
        });
    }
}
