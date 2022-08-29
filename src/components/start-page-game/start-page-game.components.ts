import { state } from './../../state';
import { START_PAGE_GAME_TEMPLATE } from './start-page-game.template';


export class StartGamePage {
    complexity: number;
    constructor() {
        this.complexity = 0;
    }

    init(title: string, description: string, isFromBook: boolean) {
        document.body.insertAdjacentHTML('beforeend', START_PAGE_GAME_TEMPLATE(title, description));
        if (isFromBook) {
            const complexityContainer = <HTMLElement>document.querySelector('.start-game-complexity__container');
            complexityContainer.style.display = 'none';
        } else this.choiceComplexity();
    }

    choiceComplexity() {
        state.setItem({ complexity: '0' });
        const complexityButtons = <HTMLElement>document.querySelector('.complexity__buttons');
        complexityButtons.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const btn = target.closest('.learnbook__button');
            if (btn) {
                const buttons = complexityButtons.querySelectorAll('.learnbook__button');
                buttons.forEach((i) => i.classList.remove('learnbook__button_selected'));
                btn.classList.add('learnbook__button_selected');
                (<HTMLButtonElement>document.querySelector('.start-game')).disabled = false;
                this.complexity = +(<string>btn.getAttribute('data-complexity'));
                state.setItem({ complexity: this.complexity.toString() });
                state.complexityMainGame = this.complexity;
            }
        });
    }
}
