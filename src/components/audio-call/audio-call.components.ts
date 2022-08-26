import { state } from './../../state';
import { AUDIO_CALL_TITLE, AUDIO_CALL_DESCRIPTION, AUDIO_CALL_TEMPLATE } from './audio-call.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';

export class AudioCall {
    startPage: StartGamePage;
    complexity: number;
    page: number;
    // learnBookGame: boolean;

    constructor() {
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        // this.learnBookGame = false;
    }

    init() {
        this.startPage.init(AUDIO_CALL_TITLE, AUDIO_CALL_DESCRIPTION, state.getItem('isFromBook'));
        // this.learnBookGame = state.learnBookGame;
        // state.learnBookGame = false;
        state.setItem({ isFromBook: false });
        document.querySelector('.start-game')?.addEventListener('click', () => {
            if (!state.getItem('isFromBook')) {
                this.complexity = state.complexityMainGame;
                this.page = Math.floor(Math.random() * 20);
            }
            this.game();
            // this.learnBookGame = false;
        });
    }
    game() {
        (<HTMLElement>document.querySelector('.start-game_container')).style.display = 'none';
        (<HTMLElement>document.querySelector('.container')).insertAdjacentHTML('beforeend', AUDIO_CALL_TEMPLATE);
    }
}
