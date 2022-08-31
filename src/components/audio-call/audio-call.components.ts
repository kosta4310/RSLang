import { STATISTIC_WORD } from './../statistic/statistic.template';
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
import { STATISTIC_TEMPLATE } from '../statistic/statistic.template';

export class AudioCall {
    header: Header;
    startPage: StartGamePage;
    complexity: number;
    page: number;
    learnBookGame: boolean;
    indexWord: number;
    isRightAnswer: boolean;
    answers: { right: IWord[]; wrong: IWord[] };

    constructor() {
        this.header = new Header();
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.indexWord = 0;
        this.learnBookGame = false;
        this.isRightAnswer = false;
        this.answers = {
            right: [],
            wrong: [],
        };
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
        state.isGame = false;
        this.isRightAnswer = false;
        this.imitationKeydown();

        document.querySelector('.start-game')?.addEventListener('click', () => {
            if (!this.learnBookGame) {
                this.complexity = state.complexityMainGame;
                this.page = Math.floor(Math.random() * 20);
            } else {
                this.complexity = state.getItem('complexity');
                this.page = state.getItem('page');
            }
            this.learnBookGame = false;
            state.isGame = true;
            this.game();
            console.log(state.isGame);
        });
    }

    async game() {
        const arrayWords = await this.getArrayWords(this.complexity, this.page);
        this.renderWord(arrayWords, this.indexWord);
        this.mouseGame(arrayWords);
        this.keyboardGame(arrayWords);
    }
    mouseGame(arrayWords: IWord[]) {
        document.querySelector('.wrapper')?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const searchWord = arrayWords[this.indexWord];
            const pathImage = `${BASE}/${searchWord.image}`;

            if (target.classList.contains('btn-choice')) {
                if (target.innerHTML === searchWord.wordTranslate) {
                    this.rightAnswer(pathImage, searchWord);
                    this.playSound('../../assets/sounds/correct2.mp3');
                    this.answers.right.push(searchWord);
                    this.checkLastWord(arrayWords);
                } else {
                    target.classList.add('wrong-answer');
                    this.playSound('../../assets/sounds/incorrect2.mp3');
                    this.rightAnswer(pathImage, searchWord);
                    this.answers.wrong.push(searchWord);
                    this.checkLastWord(arrayWords);
                }
                this.isRightAnswer = true;
            }
            if (target.classList.contains('next')) {
                if (!this.isRightAnswer) {
                    this.rightAnswer(pathImage, searchWord);
                    this.isRightAnswer = true;
                    this.answers.wrong.push(searchWord);
                    this.playSound('../../assets/sounds/incorrect2.mp3');
                    this.checkLastWord(arrayWords);
                } else {
                    if (this.indexWord === arrayWords.length - 1) {
                        this.showStatistic(this.answers.right, this.answers.wrong);
                    } else {
                        this.indexWord++;
                        this.renderWord(arrayWords, this.indexWord);
                        this.isRightAnswer = false;
                    }
                }
            }
        });
    }

    checkLastWord(arrayWords: IWord[]) {
        if (this.indexWord === arrayWords.length - 1) {
            (<HTMLButtonElement>document.querySelector('.next')).innerHTML = 'Статистика';
        }
    }

    keyboardGame(arrayWords: IWord[]) {
        const keyboard = (event: KeyboardEvent) => {
            if (state.isGame) {
                console.log(state.isGame, this.isRightAnswer);
                const searchWord = arrayWords[this.indexWord];
                const pathImage = `${BASE}/${searchWord.image}`;
                const buttons = document.querySelectorAll<HTMLButtonElement>('.btn-choice');
                const keyboardButton = (index: number) => {
                    if (buttons[index].innerHTML === searchWord.wordTranslate) {
                        this.rightAnswer(pathImage, searchWord);
                        this.playSound('../../assets/sounds/correct2.mp3');
                        this.answers.right.push(searchWord);
                        this.checkLastWord(arrayWords);
                    } else {
                        this.playSound('../../assets/sounds/incorrect2.mp3');
                        this.rightAnswer(pathImage, searchWord);
                        this.answers.wrong.push(searchWord);
                        this.checkLastWord(arrayWords);
                        buttons[index].classList.add('wrong-answer');
                    }
                    this.isRightAnswer = true;
                };
                switch (event.code) {
                    case 'Space':
                        if (!this.isRightAnswer) {
                            this.rightAnswer(pathImage, searchWord);
                            this.isRightAnswer = true;
                            this.answers.wrong.push(searchWord);
                            this.playSound('../../assets/sounds/incorrect2.mp3');
                            this.checkLastWord(arrayWords);
                        } else {
                            if (this.indexWord === arrayWords.length - 1) {
                                this.showStatistic(this.answers.right, this.answers.wrong);
                            } else {
                                this.indexWord++;
                                this.renderWord(arrayWords, this.indexWord);
                                this.isRightAnswer = false;
                            }
                        }
                        break;
                    case 'Digit1':
                        keyboardButton(0);
                        break;
                    case 'Digit2':
                        keyboardButton(1);
                        break;
                    case 'Digit3':
                        keyboardButton(2);
                        break;
                    case 'Digit4':
                        keyboardButton(3);
                        break;
                    case 'Digit5':
                        keyboardButton(4);
                        break;
                }
            } else {
                document.removeEventListener('keydown', keyboard);
            }
        };
        document.addEventListener('keydown', keyboard);
    }
    imitationKeydown() {
        const event = new Event('keydown');
        document.dispatchEvent(event);
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
        this.playSound(pathAudio);
        this.playWordOnClick(<HTMLElement>document.querySelector('.sound-btn'), pathAudio);
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
            if (el.innerHTML === word.wordTranslate) {
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
                state.complexityMainGame = 0;
                this.isRightAnswer = false;
                state.isGame = false;
                this.answers = {
                    right: [],
                    wrong: [],
                };
            }
        });
    }
    playWordOnClick(element: HTMLElement, pathAudio: string) {
        const audio = new Audio(pathAudio);
        element?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const btn = target.closest('.sound-btn');
            if (btn) {
                audio.play();
            }
        });
    }
    playSound(pathAudio: string) {
        const audio = new Audio(pathAudio);
        audio.play();
    }

    showStatistic(rightWords: IWord[], wrongWords: IWord[]) {
        state.isGame = false;
        const gameWrapper = document.querySelector('.game-wrapper');
        gameWrapper?.parentNode?.removeChild(gameWrapper);
        document
            .querySelector('.game-container__audio-call')
            ?.insertAdjacentHTML('beforeend', STATISTIC_TEMPLATE(rightWords.length, wrongWords.length));
        const renderWordStatistic = (arr: IWord[],className:string) => {
            arr.forEach((el) => {
                document
                    .querySelector(className)
                    ?.insertAdjacentHTML('beforeend', STATISTIC_WORD(el.audio, el.word, el.wordTranslate));
            });
        };
        renderWordStatistic(rightWords,'.right-word');
        renderWordStatistic(wrongWords,'.wrong-word');
        const soundBtns = document.querySelectorAll<HTMLElement>('.sound-btn');
        soundBtns.forEach((el) => {
            const pathAudio = `${BASE}/${el.getAttribute('data-audio')}`;
            this.playWordOnClick(el, pathAudio);
        });
    }
}
