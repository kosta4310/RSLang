import { state } from '../../state';
import { getChunkOfWords } from '../api/api';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { Router } from '../Router/router';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { ParamPage } from '../types';
import { shuffle } from '../utils';
import { SPRINT_DESCRIPTION, SPRINT_TEMPLATE, SPRINT_TITLE } from './sprint.template';
const quantityWordsInPage = 20;

export class Sprint {
    // param: ParamPage;
    complexity: number;
    page: number;
    // isFromBook: boolean;
    startPage: StartGamePage;
    map: Map<string, string>;
    mapRightWords: Map<string, string>;
    tempWordsPair: { word: string; wordRandomTranslate: string };

    constructor() {
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.map = <Map<string, string>>new Map();
        this.mapRightWords = <Map<string, string>>new Map();
        this.tempWordsPair = { word: 'lion', wordRandomTranslate: 'лев' };
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
        body.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);
        this.gameProcess();
    }

    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = 59;
        const interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(interval);
                alert('Page of statistic');
            }
        }, 1000);
    }

    listen(iterator: IterableIterator<[string, string]>) {
        const btnCancel = <HTMLElement>document.querySelector('.btn-cancel');
        btnCancel.addEventListener('click', () => {
            this.init();
            location.reload();
        });

        const btnNo = <HTMLElement>document.querySelector('.btn-no');
        const btnYes = <HTMLElement>document.querySelector('.btn-yes');
        const buttonsBlock = <HTMLElement>document.querySelector('.sprint__buttons');

        buttonsBlock.addEventListener('click', (e) => {
            this.handlerToButtons(e, iterator);
        });

        document.addEventListener('keydown', (e) => {
            this.handlerKeys(e, iterator);
        });
    }

    async gameProcess() {
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

        // const nextElement = iterator.next();

        // if (!nextElement.done) {
        //     const [word, wordTranslate] = nextElement.value;
        //     wordEn.innerHTML = word;
        //     wordRu.innerHTML = wordTranslate;
        // } else {
        //     alert('Page of statistic');
        // }
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

    handlerKeys(e: KeyboardEvent, iterator: IterableIterator<[string, string]>) {
        if (e.key === 'ArrowLeft') {
            this.checkRightTranslate(iterator, true);
        } else if (e.key === 'ArrowRight') {
            this.checkRightTranslate(iterator, false);
        }
    }

    iteration(iterator: IterableIterator<[string, string]>) {
        const nextElement = iterator.next();

        if (!nextElement.done) {
            const [word, wordRandomTranslate] = nextElement.value;
            this.showWords(word, wordRandomTranslate);
            return { word, wordRandomTranslate };
        } else {
            alert('Page of statistic');
            return false;
        }
    }

    checkRightTranslate(iterator: IterableIterator<[string, string]>, isTrue: boolean) {
        const { word, wordRandomTranslate } = this.tempWordsPair;
        if (
            (this.mapRightWords.get(word) === wordRandomTranslate && isTrue) ||
            !(this.mapRightWords.get(word) === wordRandomTranslate && !isTrue)
        ) {
            console.log('все-таки ты что-то знаешь');
        } else console.log(`you are lier ${word}=${wordRandomTranslate}`);

        const iteration = this.iteration(iterator);
        if (iteration) {
            this.tempWordsPair = iteration;
        }
    }
}
