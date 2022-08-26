import { state } from './../../../state';
import { getContolPanelTemplate } from './controlPanel.template';
import { Book } from '../LearnBook';

export class ControlPanel {
    parent: Book;
    constructor(parent: Book) {
        this.parent = parent;
    }

    render() {
        const CONTROL_PANEL_TEMPLATE = getContolPanelTemplate();
        const controlPanel = <HTMLElement>document.querySelector('#control-panel');
        controlPanel.insertAdjacentHTML('beforeend', CONTROL_PANEL_TEMPLATE);
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
                this.parent.renderWords();
            }
        });
        const gameBtns = document.querySelectorAll('.pr10');
        gameBtns.forEach((el) => {
            el.addEventListener('click', () => {
                state.setItem({ isFromBook: true });
            });
        });
    }
}
