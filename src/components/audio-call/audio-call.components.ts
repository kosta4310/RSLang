import { templateHeader } from './../header/header.template';
import { Header } from './../header/header.component';
import { BASE } from './../../config';
import { state } from './../../state';
import {
    AUDIO_CALL_TITLE,
    AUDIO_CALL_DESCRIPTION,
    AUDIO_CALL_TEMPLATE,
    AUDIO_CALL_BUTTONS,
    RIGHT_ANSWER_IMAGE,
    RIGHT_ANSWER_WORD,
    SOUND_SVG,
} from './audio-call.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { getChunkOfWords } from '../api/api';
import { IWord } from '../api/types';

export class AudioCall {
    header: Header;
    startPage: StartGamePage;
    complexity: number;
    page: number;
    learnBookGame: boolean;
    indexWord: number;
    isRightAnswer: boolean;

    constructor() {
        this.header = new Header();
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.learnBookGame = false;
        this.indexWord = 0;
        this.isRightAnswer = false;
    }

    init() {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        this.startGame();
    }

    startGame() {
        this.startPage.init(AUDIO_CALL_TITLE, AUDIO_CALL_DESCRIPTION, state.isFromBook);
        this.learnBookGame = state.isFromBook;
        state.isFromBook = false;
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
        const arrayWords = await this.getArrayWords(this.complexity, this.page);
        this.renderWord(arrayWords, this.indexWord);
        document.querySelector('.wrapper')?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const searchWord = arrayWords[this.indexWord];
            const pathImage = `${BASE}/${searchWord.image}`;
          if (target.classList.contains('btn-choice')) {
                if (target.getAttribute('data-word') === searchWord.wordTranslate) {
                    this.rightAnswer(pathImage, searchWord);
                } else {
                    target.classList.add('wrong-answer');
                    this.rightAnswer(pathImage, searchWord);
                }
                this.isRightAnswer = true;
            }
            if (target.classList.contains('next')) {
                if (!this.isRightAnswer){
                    this.rightAnswer(pathImage, searchWord);
                    this.isRightAnswer = true;
                }else{
                    this.indexWord++
                    this.renderWord(arrayWords, this.indexWord);
                    this.isRightAnswer = false;
                }
            }
        });
    }

    renderWord(arrayWords: IWord[], index: number) {
        const searchWord = arrayWords.slice(index, index + 1)[0];
        const arrForButtons = this.wordForButtons(arrayWords, index);
        (<HTMLElement>document.querySelector('.wrapper')).innerHTML = '';
        document.querySelector('.wrapper')?.insertAdjacentHTML('beforeend', AUDIO_CALL_TEMPLATE(searchWord.audio));
        arrForButtons.forEach((el) => {
            document
                .querySelector('.audio-call__choiceBtns')
                ?.insertAdjacentHTML('beforeend', AUDIO_CALL_BUTTONS(el.wordTranslate));
        });
        this.closeGame();
        const pathAudio = `${BASE}/${(<HTMLElement>document.querySelector('.sound-btn')).getAttribute('data-audio')}`;
        this.playAudio(pathAudio);
    }

    async getArrayWords(complexity: number, page: number) {
        return getChunkOfWords(complexity.toString(), page.toString());
    }

    wordForButtons(arr: IWord[], index: number) {
        const searchWord = arr.slice(index, index + 1)[0];
        return arr
            .filter((el) => el !== searchWord)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .concat(searchWord)
            .sort(() => Math.random() - 0.5);
    }

    rightAnswer(pathImage: string, word: IWord) {
        document.querySelector('.audio-call__sound')?.insertAdjacentHTML('beforebegin', RIGHT_ANSWER_IMAGE(pathImage));
        document.querySelector('.audio-call__sound')?.insertAdjacentHTML('beforeend', RIGHT_ANSWER_WORD(word.word));
        (<HTMLElement>document.querySelector('.sound-btn')).innerHTML = '';
        (<HTMLElement>document.querySelector('.sound-btn')).insertAdjacentHTML('beforeend', SOUND_SVG(30));
        (<HTMLElement>document.querySelector('.audio-call__sound')).classList.add('right-sound');
        (<HTMLButtonElement>document.querySelector('.next')).innerHTML = 'Дальше';
        const buttons = document.querySelectorAll<HTMLButtonElement>('.btn-choice');
        buttons.forEach((el) => {
            el.disabled = true;
            if (el.getAttribute('data-word') === word.wordTranslate) {
                el.classList.add('right-button');
            }
        });
    }
    closeGame() {
        document.querySelector('.audio-call__cancel')?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const btn = target.closest('.audio-call__cancel');
            if (btn) {
                const elem = <HTMLElement>document.querySelector('.wrapper');
                elem.parentNode?.removeChild(elem);
                this.startGame();
                this.indexWord = 0;
            }
        });
    }
    playAudio(pathAudio: string) {
        const audio = new Audio(pathAudio);
        audio.play();
        document.querySelector('.sound-btn')?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const btn = target.closest('.sound-btn');
            if (btn) {
                audio.play();
            }
        });
    }
}
