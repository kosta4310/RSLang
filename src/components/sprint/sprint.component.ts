import { BASE } from '../../config';
import { state } from '../../state';
import { getChunkOfWords } from '../api/api';
import { IWord, NoteToWord, Statistic, UserWord } from '../api/types';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import { Constants, IOptionalToWord, IStatisticDay, IStatisticGamePerDay, ParamPage } from '../types';
import { shuffle } from '../utils';
import { SPRINT_DESCRIPTION, SPRINT_TEMPLATE, SPRINT_TITLE } from './sprint.template';
import { templateStatisticGameSprint, templateTableLine } from './statisticSprintGame.template';
import * as API from '../api/api';

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
    newWordInGame: number;
    keyboardListenerState: number;
    iterator: null | IterableIterator<[string, string]>;
    statisticGame: Statistic | null;
    statisticDay: IStatisticDay;
    learnedWords: number;

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
        this.newWordInGame = 0;
        this.keyboardListenerState = 1;
        // this.isGame = false;
        state.isGame = false;
        this.iterator = null;
        this.statisticDay = {
            newWordInGame: 0,
            longestSequenceCorrectAnswers: 0,
            sprintCorrect: 0,
            sprintTotal: 0,
        };
        this.statisticGame = null;
        this.learnedWords = 0;
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
        this.newWordInGame = 0;
        this.learnedWords = 0;
        state.isGame = false;
        this.statisticDay = {
            newWordInGame: 0,
            longestSequenceCorrectAnswers: 0,
            sprintCorrect: 0,
            sprintTotal: 0,
        };
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
                  page: Math.floor(Math.random() * Constants.WORDS_PER_PAGE),
                  complexity: state.getItem('complexity'),
              };

        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        wrapper.innerHTML = '';
        wrapper.insertAdjacentHTML('beforeend', SPRINT_TEMPLATE);

        this.gameProcess(param);
    }

    timer() {
        const countdown = <HTMLElement>document.querySelector('.timer__time');
        let item = Constants.TIME_OF_SPRINT_GAME;

        this.interval = setInterval(() => {
            countdown.innerHTML = `${item}`;
            item = item - 1;
            if (item < 0) {
                clearInterval(this.interval);
                if (state.isGame) {
                    this.showStatistic();
                    state.isGame = false;
                }
            }
        }, 1000);
    }

    listen(iterator: IterableIterator<[string, string]>) {
        this.iterator = iterator;
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

        if (this.keyboardListenerState === 1) {
            this.keyboardListenerState = 2;

            document.addEventListener('keydown', (e) => {
                if (this.iterator) {
                    this.handlerKeysDown(e, this.iterator);
                }
            });

            document.addEventListener('keyup', this.handlerKeysUp);
        }
    }

    async gameProcess({ page, complexity }: ParamPage) {
        console.log(`page ${page}, group: ${complexity}`);

        await this.setSortArraysWords(complexity, page);
        const iterator = this.mapWordPairs.entries();
        this.iterator = iterator;
        this.timer();
        this.tempWordsPair = <{ word: string; wordRandomTranslate: string }>this.iteration(iterator);
        this.listen(iterator);
        state.isGame = true;
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

        this.arrayWords = await this.getArrayForGame(group, page, this.isFromBook, state.getItem('isAuth'));
        console.log(this.arrayWords);

        this.arrayWords.map((words) => {
            const { word, wordTranslate } = words;

            this.mapRightWords.set(word, wordTranslate);
            wordArray.push(word);
            wordTranslateArray.push(wordTranslate);
        });

        // wordTranslateArray = shuffle(wordTranslateArray);
        wordTranslateArray = this.getSortArray(wordTranslateArray);

        for (let i = 0; i < this.arrayWords.length; i++) {
            this.mapWordPairs.set(wordArray[i], wordTranslateArray[i]);
        }
    }

    async getArrayForGame(group: string, page: string, isFromBook: boolean, isAuth: boolean) {
        if (!isAuth) return await getChunkOfWords(group, page);
        const { userId, token } = state.getItem('auth');

        if (group === Constants.COMPLEXITY_HARDWORDS.toString()) {
            const res = await API.getAllUserAggWords(userId, token, {
                filter: JSON.stringify({ 'userWord.difficulty': 'hard' }),
            });

            const [{ paginatedResults }] = res;
            return paginatedResults;
        } else {
            if (isFromBook) {
                const arr = await this.getArray(group, page);
                return arr.slice(0, 20);
            } else return await getChunkOfWords(group, page);
        }
    }

    // async isWordNotEasy({ id }: IWord) {
    //     const { userId, token } = state.getItem('auth');
    //     const word = await API.getUserWordById(userId, <string>id, token);

    //     if (typeof word === 'object' && word.difficulty === 'easy') {
    //         return false;
    //     }

    //     return true;
    // }

    handlerToButtons(e: MouseEvent, iterator: IterableIterator<[string, string]>) {
        if ((<HTMLElement>e.target).closest('.btn-yes')) {
            this.checkRightTranslate(iterator, true);
        } else if ((<HTMLElement>e.target).closest('.btn-no')) {
            this.checkRightTranslate(iterator, false);
        }
    }

    handlerKeysDown(e: KeyboardEvent, iterator: IterableIterator<[string, string]>) {
        if (state.isGame) {
            if (e.key === 'ArrowLeft') {
                this.addActiveToButtonYes();
                this.checkRightTranslate(iterator, true);
            } else if (e.key === 'ArrowRight') {
                this.addActiveToButtonNo();
                this.checkRightTranslate(iterator, false);
            }
        }
    }

    handlerKeysUp = (e: KeyboardEvent) => {
        if (state.isGame) {
            this.keyboardListenerState = 2;
            if (e.key === 'ArrowLeft') {
                this.deleteActiveToButtonYes();
            } else if (e.key === 'ArrowRight') {
                this.deleteActiveToButtonNo();
            }
        }
    };

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
            state.isGame = false;
        }
    }

    async showStatistic() {
        state.isGame = false;
        const wrapper = <HTMLElement>document.querySelector('.wrapper');
        wrapper.parentNode?.removeChild(wrapper);

        document.body.insertAdjacentHTML('beforeend', templateStatisticGameSprint());
        this.setArrayLinesWithWords();

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

    setArrayLinesWithWords() {
        const table = <HTMLElement>document.body.querySelector('.statistic-sprint__table');
        this.arrayTappedWords = this.arrayWords.slice(0, this.numberOfTimesPressed);

        this.arrayTappedWords.map((iword) => {
            const { audio, word, transcription, wordTranslate } = iword;
            const isRight = <boolean>this.resultOfGame.get(word);

            table.insertAdjacentHTML(
                'beforeend',
                templateTableLine(audio, word, transcription, wordTranslate, isRight)
            );
        });
        const isAuth = <boolean>state.getItem('isAuth');
        if (isAuth) {
            this.writeStatisticWords().then(() => {
                this.getStatistic();
                this.setStatisticDay();
            });
        }
    }

    async writeStatisticWords() {
        const isHardWord = state.getItem('complexity') === '6';
        const promises = this.arrayTappedWords.map(async (iword) => {
            let id = '';
            if (isHardWord) {
                id = <string>iword._id;
            } else id = <string>iword.id;
            const word = iword.word;

            const isRight = <boolean>this.resultOfGame.get(word);
            await this.setStatisticWord(id, isRight);
        });
        return Promise.all(promises);
    }

    async setStatisticWord(wordId: string, isRight: boolean) {
        const { userId, token } = state.getItem('auth');
        const initOption = <IOptionalToWord>{
            sprintCorrect: 0,
            sprintTotal: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
            correctInLineCount: 0,
        };

        let userWord = await API.getUserWordById(userId, wordId, token);
        if (typeof userWord === 'string') {
            this.statisticDay.newWordInGame += 1;
            this.newWordInGame += 1;
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
                this.learnedWords += 1;
            }
        } else {
            userWord.optional.correctInLineCount = 0;
            if (userWord.difficulty === 'easy') userWord.difficulty = 'normal';
        }

        userWord.optional.sprintTotal += 1;
        const noteToWord = <NoteToWord>{
            difficulty: userWord.difficulty,
            optional: JSON.parse(JSON.stringify(userWord.optional)),
        };
        const res = await API.updateUserWord(userId, wordId, token, noteToWord);
        console.log(res);
    }

    getStatistic() {
        const arrayAnswers = [...this.resultOfGame.values()];
        const sprintTotal = arrayAnswers.length;
        const stringArr = arrayAnswers
            .map((item) => (item === true ? '1' : '0'))
            .join('')
            .split('0');
        const sprintCorrect = stringArr.reduce((acc, item) => acc + item.length, 0);

        const longestSequenceCorrectAnswers = Math.max(...stringArr.map((item) => item.length));

        this.statisticDay.longestSequenceCorrectAnswers = longestSequenceCorrectAnswers;
        this.statisticDay.sprintCorrect = sprintCorrect;
        this.statisticDay.sprintTotal = sprintTotal;

        return this.statisticGame;
    }

    async setStatisticDay() {
        const { userId, token } = state.getItem('auth');
        const currentDay = new Date().toISOString().slice(0, 10);
        // const currentDay = '2022-08-31';
        let currenDayObject = <IStatisticGamePerDay>{
            learnedWords: 0,
            sprintCorrect: 0,
            sprintTotal: 0,
            sprintNewWords: 0,
            audioCallNewWords: 0,
            sprintCorrectInLineCount: 0,
            audioCallCorrectInLineCount: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
        };
        const initStat = <Statistic>{
            learnedWords: 0,
            optional: {
                [currentDay]: currenDayObject,
            },
        };
        const response = await API.getStatistics(userId, token);

        if (typeof response !== 'string') {
            const { learnedWords, optional } = response;
            initStat.learnedWords = learnedWords;
            initStat.optional = JSON.parse(JSON.stringify(optional));
        }

        const optional = initStat.optional;

        // eslint-disable-next-line no-prototype-builtins
        if (optional.hasOwnProperty(currentDay)) {
            currenDayObject = JSON.parse(JSON.stringify(optional[currentDay]));
        } else optional[currentDay] = currenDayObject;

        const { sprintCorrect, sprintTotal, longestSequenceCorrectAnswers, newWordInGame } = this.statisticDay;

        currenDayObject.sprintCorrectInLineCount =
            currenDayObject.sprintCorrectInLineCount > longestSequenceCorrectAnswers
                ? currenDayObject.sprintCorrectInLineCount
                : longestSequenceCorrectAnswers;
        currenDayObject.sprintNewWords += newWordInGame;
        currenDayObject.sprintCorrect += sprintCorrect;
        currenDayObject.sprintTotal += sprintTotal;
        currenDayObject.learnedWords += this.learnedWords;

        optional[currentDay] = currenDayObject;
        initStat.optional = optional;
        initStat.learnedWords += this.learnedWords;
        console.log(initStat);

        API.upsertStatistics(userId, token, initStat);
    }

    async getArray(group: string, page: string) {
        const tempArr = await API.getChunkOfWords(group, page);
        const { userId, token } = state.getItem('auth');
        const [{ paginatedResults }] = await API.getAllUserAggWords(userId, token, {
            group: group,
            page: '0',
            wordsPerPage: Constants.MAX_NUMBER_WORDS_IN_GROUP.toString(),
            filter: JSON.stringify({
                'userWord.difficulty': 'easy',
            }),
        });

        const easyKeyArray = <Array<string>>paginatedResults.map((iword) => iword._id);

        const filteredArray = tempArr.filter((iword) => {
            return !easyKeyArray.includes(<string>iword.id);
        });
        console.log(filteredArray);

        async function rec(group: string, page: string, array: Array<IWord>): Promise<Array<IWord>> {
            if (array.length >= Constants.QUANTITY_WORD_IN_GAME_SPRINT) return array;
            if (Number(page) < 0) return array;

            const tempArr = await API.getChunkOfWords(group, page);
            const filteredArray = tempArr.filter((iword) => !easyKeyArray.includes(<string>iword.id));

            return await rec(group, (Number(page) - 1).toString(), [...array, ...filteredArray]);
        }

        return await rec(group, page, filteredArray);
    }

    getSortArray(arr: Array<string>) {
        // 20,18,16 - quantity of words per page, experimental numbers
        if (arr.length === 20 || arr.length === 18 || arr.length === 16) {
            if (Math.random() < 0.6) {
                const permanenetArray = [];
                let changeableArray = [];
                const isReverse = Math.random() > 0.5;
                for (let i = 0; i < arr.length; i++) {
                    const el = arr[i];
                    if (isReverse) {
                        i % 2 === 0 ? permanenetArray.push(el) : changeableArray.push(el);
                    } else {
                        i % 2 !== 0 ? permanenetArray.push(el) : changeableArray.push(el);
                    }
                }
                changeableArray = shuffle(changeableArray);
                const res = [];
                for (let i = 0; i < permanenetArray.length; i++) {
                    const elem1 = permanenetArray[i];
                    const elem2 = changeableArray[i];
                    if (isReverse) {
                        res.push(elem1);
                        res.push(elem2);
                    } else {
                        res.push(elem2);
                        res.push(elem1);
                    }
                }

                return res;
            } else return shuffle(arr);
        } else return shuffle(arr);
    }
}
