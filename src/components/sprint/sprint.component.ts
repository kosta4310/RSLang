import { state } from '../../state';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { ParamPage } from '../types';
import { SPRINT_DESCRIPTION, SPRINT_TEMPLATE, SPRINT_TITLE } from './sprint.template';
const quantityWordsInPage = 20;

export class Sprint {
    // param: ParamPage;
    complexity: number;
    page: number;
    // isFromBook: boolean;
    startPage: StartGamePage;
    constructor() {
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        // this.isFromBook = false;
        // this.param = { page: '0', group: '0' };
    }

    init() {
        const isFromBook = state.getItem('isFromBook');
        this.startPage.init(SPRINT_TITLE, SPRINT_DESCRIPTION, isFromBook);
        state.setItem({ isFromBook: false });

        const btnStartGame = <HTMLButtonElement>document.querySelector('.start-game');
        btnStartGame.addEventListener('click', () => {
            const param = isFromBook
                ? { page: state.getItem('page'), complexity: state.getItem('complexity') }
                : {
                      page: Math.floor(Math.random() * (quantityWordsInPage + 1)),
                      complexity: state.getItem('complexity'),
                  };
            this.startGame(param);
        });
    }

    startGame(param: ParamPage) {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        // this.header.init();
        body.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);
        this.timer();
        console.log('start game', param);
    }
    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = 59;
        const interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}
