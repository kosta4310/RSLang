import { state } from '../../state';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { ParamPage } from '../types';
import { SPRINT_TEMPLATE } from './sprint.template';

export class Sprint {
    header: Header;
    param: ParamPage;
    constructor() {
        this.header = new Header();
        this.param = { page: '0', group: '0' };
    }

    init() {
        const btnStartGame = <HTMLButtonElement>document.querySelector('.start-game');
        btnStartGame.addEventListener('click', () => {
            const param = state.getItem('isFromBook')
                ? { page: state.getItem('page'), group: state.getItem('group') }
                : { page: 0, group: 1 };
            this.param = param;
        });
    }

    startGame() {
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        body.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);
        this.timer();
        console.log('start game', this.param);
    }
    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = 60;
        const interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}
