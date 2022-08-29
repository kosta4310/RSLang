import { state } from './../../state';
import { AUDIO_CALL_TITLE, AUDIO_CALL_DESCRIPTION, AUDIO_CALL_TEMPLATE } from './audio-call.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { getChunkOfWords } from '../api/api';

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
        this.learnBookGame = state.learnBookGame;
        state.learnBookGame = false;
        state.setItem({ isFromBook: false });
        document.querySelector('.start-game')?.addEventListener('click', () => {
            if (!this.learnBookGame) {
                this.complexity = state.complexityMainGame;
                this.page = Math.floor(Math.random() * 20);
            }
            this.game();
            this.learnBookGame = false;
        });
    }
    async game() {
        (<HTMLElement>document.querySelector('.start-game_container')).style.display='none'
       document.body.insertAdjacentHTML('beforeend',AUDIO_CALL_TEMPLATE)
       console.log(this.getArrayWords(this.complexity,this.page));
       const arrayWords = await this.getArrayWords(this.complexity, this.page);
       console.log(arrayWords.sort(() => Math.random() - 0.5).filter(el=>el.word!=='love').slice(0,4));
    }
    async getArrayWords(complexity: number, page: number){
        return getChunkOfWords(complexity.toString(), page.toString())
    }
}
