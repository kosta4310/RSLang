import { state } from '../../state';
import { getChunkOfWords } from '../api/api';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { Router } from '../Router/router';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { ParamPage } from '../types';
import { shuffle } from '../utils';
import { SPRINT_DESCRIPTION, SPRINT_TEMPLATE, SPRINT_TITLE } from './sprint.template';
import { statisticGameSprint } from './statisticSprintGame.template';
const quantityWordsInPage = 20;

export class Sprint {
    complexity: number;
    page: number;
    startPage: StartGamePage;
    map: Map<string, string>;
    mapRightWords: Map<string, string>;
    tempWordsPair: { word: string; wordRandomTranslate: string };
    audio: HTMLAudioElement;
    resultOfGame: Map<string, boolean>;
    interval: NodeJS.Timer | undefined;
    header: Header;

    constructor() {
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.map = <Map<string, string>>new Map();
        this.mapRightWords = <Map<string, string>>new Map();
        this.tempWordsPair = { word: 'lion', wordRandomTranslate: 'лев' };
        this.audio = new Audio();
        this.resultOfGame = new Map();
        this.interval = undefined;
        this.header = new Header();
    }

    init() {
        const isFromBook = state.getItem('isFromBook');
        this.startPage.init(SPRINT_TITLE, SPRINT_DESCRIPTION, isFromBook);
        state.setItem({ isFromBook: false });

        // const btnStartGame = <HTMLButtonElement>document.querySelector('.start-game');
        // btnStartGame.addEventListener('click', () => {
        //     const param = isFromBook
        //         ? { page: state.getItem('page'), complexity: state.getItem('complexity') }
        //         : {
        //               page: Math.floor(Math.random() * (quantityWordsInPage + 1)),
        //               complexity: state.getItem('complexity'),
        //           };
        //     this.startGame(param);
        // });
    }

    startGame() {
        const isFromBook = state.getItem('isFromBook');
        const param = isFromBook
            ? { page: state.getItem('page'), complexity: state.getItem('complexity') }
            : {
                  page: Math.floor(Math.random() * (quantityWordsInPage + 1)),
                  complexity: state.getItem('complexity'),
              };
        const body = document.body;
        body.innerHTML = '';
        body.insertAdjacentHTML('beforeend', templateHeader);
        body.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);
        this.header.init();
        this.gameProcess();
    }

    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = 59;
        this.interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(this.interval);
                location.href = '/#/sprint-statistic';
                // location.reload();
            }
        }, 1000);
    }

    listen(iterator: IterableIterator<[string, string]>) {
        const btnCancel = <HTMLElement>document.querySelector('.btn-cancel');
        btnCancel.addEventListener('click', () => {
            console.log('click cancel');
            // this.init();
            // location.reload();
            this.stopGame();
        });

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

    async gameProcess() {
        // Не правильно, нужно брать из param
        const group = <string>state.getItem('complexity');
        const page = <string>state.getItem('page');

        await this.setSortArraysWords(group, page);

        const iterator = this.map.entries();
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
        let wordArray = <Array<string>>[];
        let wordTranslateArray = <Array<string>>[];

        const arrayWords = await getChunkOfWords(group, page);
        arrayWords.map((words) => {
            const { word, wordTranslate } = words;
            this.mapRightWords.set(word, wordTranslate);
            wordArray.push(word);
            wordTranslateArray.push(wordTranslate);
        });

        wordTranslateArray = shuffle(wordTranslateArray);
        wordArray = shuffle(wordArray);

        for (let i = 0; i < arrayWords.length; i++) {
            this.map.set(wordArray[i], wordTranslateArray[i]);
        }
    }

    handlerToButtons(e: MouseEvent, iterator: IterableIterator<[string, string]>) {
        let isTrue = false;
        if ((<HTMLElement>e.target).classList.contains('btn-yes')) {
            isTrue = true;
        } else {
            isTrue = false;
        }
        this.checkRightTranslate(iterator, isTrue);
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
            location.href = '/#/sprint-statistic';
            // location.reload();
            return false;
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
    }

    handlerIncorrectAnswer(word: string) {
        this.playSound('../../assets/sounds/incorrect2.mp3');
        this.resultOfGame.set(word, false);
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
        document.body.innerHTML = statisticGameSprint();
    }
}
