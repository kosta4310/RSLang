import { state } from './../../state';
import { START_PAGE_GAME_TEMPLATE } from './start-page-game.template';
import { Header } from './../header/header.component';
import { templateHeader } from './../header/header.template';

export class StartGamePage {
    header: Header;
    complexity: number;
    constructor() {
        this.header = new Header();
        this.complexity = 0;
    }

    init(title: string, description: string, isFromBook: boolean) {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        document.body.insertAdjacentHTML('beforeend', START_PAGE_GAME_TEMPLATE(title, description));
        if (isFromBook) {
            const complexityContainer = <HTMLElement>document.querySelector('.start-game-complexity__container');
            complexityContainer.style.display = 'none';
        } else this.choiceComplexity();
    }

    choiceComplexity() {
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
                state.complexityMainGame= this.complexity
            }
        });
    }
}

