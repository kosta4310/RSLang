import { BASE } from '../../config';
import { state } from '../../state';
import { getChunkOfWords } from '../api/api';
import { IWord, NoteToWord, UserWord } from '../api/types';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { IOptionalToWord, ParamPage } from '../types';
import { shuffle } from '../utils';
import { SPRINT_DESCRIPTION, SPRINT_TEMPLATE, SPRINT_TITLE } from './sprint.template';
import { templateStatisticGameSprint, templateTableLine } from './statisticSprintGame.template';
import * as API from '../api/api';
const quantityWordsInPage = 20;

export class Sprint {
    complexity: number;
    page: number;
    startPage: StartGamePage;
    mapWordPairs: Map<string, string>;
    mapRightWords: Map<string, string>;
    tempWordsPair: { word: string; wordRandomTranslate: string };
    audio: HTMLAudioElement;
    resultOfGame: Map<string, boolean>;
    interval: NodeJS.Timer | undefined;
    header: Header;
    arrayWords: Array<IWord>;
    numberOfTimesPressed: number;
    arrayTappedWords: Array<IWord>;
    isFromBook: boolean;

    constructor() {
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.mapWordPairs = <Map<string, string>>new Map();
        this.mapRightWords = <Map<string, string>>new Map();
        this.tempWordsPair = { word: 'lion', wordRandomTranslate: 'лев' };
        this.audio = new Audio();
        this.resultOfGame = new Map();
        this.interval = undefined;
        this.header = new Header();
        this.arrayWords = [];
        this.numberOfTimesPressed = 0;
        this.arrayTappedWords = [];
        this.isFromBook = state.getItem('isFromBook');
    }

    init() {
        this.isFromBook = state.getItem('isFromBook');
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('beforeend', templateHeader);
        this.header.init();
        this.startPage.init(SPRINT_TITLE, SPRINT_DESCRIPTION, this.isFromBook);
        state.setItem({ isFromBook: false });
        this.flushInit();

        document.querySelector('.start-game')?.addEventListener('click', () => {
            this.startGame();
        });
    }
    flushInit() {
        this.mapRightWords.clear();
        this.mapWordPairs.clear();
        this.arrayTappedWords = [];
        this.arrayWords = [];
        this.numberOfTimesPressed = 0;
        this.arrayTappedWords = [];
    }

    restart() {
        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        wrapper.parentNode?.removeChild(wrapper);

        this.startPage.init(SPRINT_TITLE, SPRINT_DESCRIPTION, this.isFromBook);
        state.setItem({ isFromBook: false });
        document.querySelector('.start-game')?.addEventListener('click', () => {
            this.startGame();
        });
    }
    startGame() {
        const param = this.isFromBook
            ? { page: state.getItem('page'), complexity: state.getItem('complexity') }
            : {
                  page: Math.floor(Math.random() * quantityWordsInPage),
                  complexity: state.getItem('complexity'),
              };

        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        wrapper.innerHTML = '';
        wrapper.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);

        this.gameProcess(param);
    }

    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = 59;
        this.interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(this.interval);
                this.showStatistic();
            }
        }, 1000);
    }

    listen(iterator: IterableIterator<[string, string]>) {
        const btnCancel = <HTMLElement>document.querySelector('.btn-cancel');
        btnCancel.addEventListener(
            'click',
            () => {
                this.stopGame();
                this.flushInit();
                this.restart();
            },
            true
        );

        const buttonsBlock = <HTMLElement>document.querySelector('.sprint__buttons');

        buttonsBlock.addEventListener('click', (e) => {
            this.handlerToButtons(e, iterator);
        });

        document.addEventListener('keydown', (e) => {
            this.handlerKeysDown(e, iterator);
        });

        document.addEventListener('keyup', (e) => {
            this.handlerKeysUp(e);
        });
    }

    async gameProcess({ page, complexity }: ParamPage) {
        await this.setSortArraysWords(complexity, page);

        const iterator = this.mapWordPairs.entries();
        this.timer();
        this.tempWordsPair = <{ word: string; wordRandomTranslate: string }>this.iteration(iterator);
        this.listen(iterator);
    }

    showWords(word: string, wordTranslate: string) {
        const wordEn = <HTMLElement>document.querySelector('.words__en');
        const wordRu = <HTMLElement>document.querySelector('.words__ru');

        wordEn.innerHTML = word;
        wordRu.innerHTML = wordTranslate;
    }

    async setSortArraysWords(group: string, page: string) {
        const wordArray = <Array<string>>[];
        let wordTranslateArray = <Array<string>>[];

        this.arrayWords = await getChunkOfWords(group, page);

        this.arrayWords.map((words) => {
            const { word, wordTranslate } = words;

            this.mapRightWords.set(word, wordTranslate);
            wordArray.push(word);
            wordTranslateArray.push(wordTranslate);
        });

        wordTranslateArray = shuffle(wordTranslateArray);

        for (let i = 0; i < this.arrayWords.length; i++) {
            this.mapWordPairs.set(wordArray[i], wordTranslateArray[i]);
        }
    }

    handlerToButtons(e: MouseEvent, iterator: IterableIterator<[string, string]>) {
        if ((<HTMLElement>e.target).closest('.btn-yes')) {
            this.checkRightTranslate(iterator, true);
        } else if ((<HTMLElement>e.target).closest('.btn-no')) {
            this.checkRightTranslate(iterator, false);
        }
    }

    handlerKeysDown(e: KeyboardEvent, iterator: IterableIterator<[string, string]>) {
        if (e.key === 'ArrowLeft') {
            this.addActiveToButtonYes();
            this.checkRightTranslate(iterator, true);
        } else if (e.key === 'ArrowRight') {
            this.addActiveToButtonNo();
            this.checkRightTranslate(iterator, false);
        }
    }

    handlerKeysUp(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            this.deleteActiveToButtonYes();
        } else if (e.key === 'ArrowRight') {
            this.deleteActiveToButtonNo();
        }
    }

    iteration(iterator: IterableIterator<[string, string]>) {
        const nextElement = iterator.next();

        if (!nextElement.done) {
            const [word, wordRandomTranslate] = nextElement.value;
            this.showWords(word, wordRandomTranslate);
            return { word, wordRandomTranslate };
        } else {
            this.stopGame();
            this.showStatistic();
        }
    }

    checkRightTranslate(iterator: IterableIterator<[string, string]>, isTrue: boolean) {
        const { word, wordRandomTranslate } = this.tempWordsPair;
        if (
            (this.mapRightWords.get(word) === wordRandomTranslate && isTrue) ||
            (!(this.mapRightWords.get(word) === wordRandomTranslate) && !isTrue)
        ) {
            this.handlerCorrectAnswer(word);
        } else this.handlerIncorrectAnswer(word);

        const iteration = this.iteration(iterator);
        if (iteration) {
            this.tempWordsPair = iteration;
        }
    }

    addDeleteActiveToButton(metod: string, isYes: boolean) {
        let button: HTMLElement;
        if (isYes) {
            button = <HTMLElement>document.querySelector('.btn-yes');
        } else {
            button = <HTMLElement>document.querySelector('.btn-no');
        }
        if (metod === 'add') {
            button.classList.add('btn__active');
        } else {
            button.classList.remove('btn__active');
        }
    }

    addActiveToButtonYes() {
        const button = <HTMLElement>document.querySelector('.btn-yes');
        button.classList.add('btn-yes__active');
    }

    addActiveToButtonNo() {
        const button = <HTMLElement>document.querySelector('.btn-no');
        button.classList.add('btn-no__active');
    }

    deleteActiveToButtonYes() {
        const button = <HTMLElement>document.querySelector('.btn-yes');
        button.classList.remove('btn-yes__active');
    }

    deleteActiveToButtonNo() {
        const button = <HTMLElement>document.querySelector('.btn-no');
        button.classList.remove('btn-no__active');
    }

    handlerCorrectAnswer(word: string) {
        this.playSound('../../assets/sounds/correct1.mp3');
        this.resultOfGame.set(word, true);
        this.numberOfTimesPressed = this.numberOfTimesPressed + 1;
    }

    handlerIncorrectAnswer(word: string) {
        this.playSound('../../assets/sounds/incorrect2.mp3');
        this.resultOfGame.set(word, false);
        this.numberOfTimesPressed = this.numberOfTimesPressed + 1;
    }

    playSound(src: string) {
        this.audio.src = src;
        this.audio.play();
    }

    stopGame() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    showStatistic() {
        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        wrapper.parentNode?.removeChild(wrapper);

        document.body.insertAdjacentHTML('beforeend', templateStatisticGameSprint());
        this.getArrayLinesWithWords();

        const btnCancel = <HTMLElement>document.querySelector('.statistic-sprint__cancel .btn-cancel');
        btnCancel.addEventListener('click', () => {
            this.flushInit();
            this.restart();
        });

        const table = <HTMLElement>document.querySelector('.statistic-sprint__table');
        table.addEventListener('click', (e) => {
            if ((<HTMLElement>e.target).closest('.table__sound')) {
                const wordSound = <HTMLElement>(<HTMLElement>e.target).closest('.table__sound');
                const linkToAudioFile = <string>wordSound.dataset.sound;
                this.audio.src = `${BASE}/${linkToAudioFile}`;
                this.audio.play();
            }
        });
    }

    getArrayLinesWithWords() {
        const table = <HTMLElement>document.body.querySelector('.statistic-sprint__table');
        this.arrayTappedWords = this.arrayWords.slice(0, this.numberOfTimesPressed);
        const isAuth = state.getItem('isAuth');

        this.arrayTappedWords.map((iword) => {
            const { audio, word, transcription, wordTranslate } = iword;
            const isRight = <boolean>this.resultOfGame.get(word);

            table.insertAdjacentHTML(
                'beforeend',
                templateTableLine(audio, word, transcription, wordTranslate, isRight)
            );

            if (isAuth) {
                this.setStatisticWord(iword, isRight);
            }
        });
    }

    async setStatisticWord(word: IWord, isRight: boolean) {
        const wordId = word.id;
        const { userId, token } = state.getItem('auth');
        // let { optional } = word;

        // const currentDate = new Date().toISOString().slice(0, 10);
        const initOption = <IOptionalToWord>{
            sprintCorrect: 0,
            sprintTotal: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
            correctInLineCount: 0,
        };

        let userWord = await API.getUserWordById(userId, wordId, token);
        if (typeof userWord === 'string') {
            userWord = <UserWord>(
                await API.createUserWord(userId, wordId, token, { difficulty: 'normal', optional: initOption })
            );
        }
        if (isRight) {
            userWord.optional.sprintCorrect += 1;
            userWord.optional.correctInLineCount += 1;
            if (
                (userWord.difficulty === 'normal' && userWord.optional.correctInLineCount >= 3) ||
                (userWord.difficulty === 'hard' && userWord.optional.correctInLineCount >= 5)
            ) {
                userWord.difficulty = 'easy';
            }
        } else userWord.optional.correctInLineCount = 0;

        userWord.optional.sprintTotal += 1;
        const noteToWord = <NoteToWord>{
            difficulty: userWord.difficulty,
            optional: JSON.parse(JSON.stringify(userWord.optional)),
        };
        const res = await API.updateUserWord(userId, wordId, token, noteToWord);
        console.log(res);
    }
}
