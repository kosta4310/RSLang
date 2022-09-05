import { LEARNBOOK_PAGE_TEMPLATE } from './learnbook.template';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import * as API from '../api/api';
import { getCard } from './card/card.template';
import { BASE } from '../../config';
import { ControlPanel } from './controlPanel/controlPanel.component';
import { Pagination } from './pagination/pagination.component';
import { state } from '../../state';
import { saveWord } from '../utils';
import { IWord, Statistic } from '../api/types';
import { Constants, IStatisticGamePerDay } from '../types';

export class Book {
    page = 0;
    _complexity = 0;
    controlPanel: ControlPanel;
    pagination: Pagination;

    get complexity() {
        return this._complexity ?? 0;
    }

    set complexity(value: number) {
        const container = <HTMLElement>document.querySelector('.wrapper-book');
        container?.setAttribute('data-complexity', value.toString());
        this._complexity = value;
    }

    constructor() {
        this.controlPanel = new ControlPanel(this);
        this.pagination = new Pagination(this);
    }

    async init() {
        document.body.innerHTML = '';

        document.body.insertAdjacentHTML('afterbegin', LEARNBOOK_PAGE_TEMPLATE);
        this.complexity = +(state.getItem('complexity') ?? 0);
        this.page = +(state.getItem('page') ?? 0);

        document.body.insertAdjacentHTML('afterbegin', templateHeader);
        new Header().init();
        this.controlPanel.render();
        this.pagination.render();

        this.renderLoading();
        await this.renderWords();
        this.listen();
    }

    renderLoading() {
        const words = <HTMLElement>document.body.querySelector('#words');
        words.innerHTML =
            '<div class="loader-container"><img class="loader" src="./assets/svg/loader.svg" alt=""></div>';
    }

    checkForAllLearned() {
        const learnedWords = document.querySelectorAll('.learned-word');
        const wrapper = document.querySelector('.wrapper-book');
        if (this.complexity === Constants.COMPLEXITY_HARDWORDS) {
            this.controlPanel.enableAllLearnedText(false);
            wrapper?.classList.remove('all-learned');
            const allCards = document.querySelectorAll('.card');
            this.controlPanel.enableGamesButtons(!!allCards.length);
            return;
        }

        if (learnedWords.length >= Constants.WORDS_PER_PAGE) {
            this.controlPanel.enableGamesButtons(false);
            this.controlPanel.enableAllLearnedText(true);
            wrapper?.classList.add('all-learned');
        } else {
            this.controlPanel.enableGamesButtons(true);
            this.controlPanel.enableAllLearnedText(false);
            wrapper?.classList.remove('all-learned');
        }
    }

    updatePagination() {
        this.pagination.currentPage = this.page + 1;
        const isDisplay = !(this.complexity === Constants.COMPLEXITY_HARDWORDS);
        this.pagination.redraw(isDisplay);
    }

    async renderWords() {
        const { userId, token } = state.getItem('auth') ?? {};

        let arrayWords: IWord[];
        if (userId) {
            if (this.complexity === Constants.COMPLEXITY_HARDWORDS) {
                arrayWords = await this.getArrayHardUserWords(userId, token);
            } else {
                arrayWords = await this.getArrayUserWords(this.complexity, this.page, userId, token);
            }
        } else {
            arrayWords = await this.getArrayWords(this.complexity, this.page);
        }

        const words = <HTMLElement>document.body.querySelector('#words');
        words.setAttribute('data-complexity', this.complexity.toString());
        words.innerHTML = '';

        if (this.complexity === Constants.COMPLEXITY_HARDWORDS && !arrayWords.length) {
            this.displayNoHardWords();
        } else {
            const isAuth = <boolean>state.getItem('isAuth');
            arrayWords.map((word) => {
                words.insertAdjacentHTML('beforeend', getCard(word, isAuth));
            });
        }

        this.updatePagination();
        this.checkForAllLearned();
    }

    displayNoHardWords() {
        const words = <HTMLElement>document.body.querySelector('#words');
        words.innerHTML = '';
        this.controlPanel.enableGamesButtons(false);
        words.innerHTML = '<div class="no-hard-words"><div>Нет сложных слов<div></div>';
    }

    async getArrayWords(complexity: number, page: number) {
        return API.getChunkOfWords(complexity.toString(), page.toString());
    }

    async getArrayUserWords(complexity: number, page: number, userId: string, token: string) {
        const response = await API.getAllUserAggWords(userId, token, {
            wordsPerPage: Constants.WORDS_PER_PAGE.toString(),
            filter: JSON.stringify({ $and: [{ group: complexity }, { page: page }] }),
        });

        const [{ paginatedResults }] = response;
        return paginatedResults;
    }

    async getArrayHardUserWords(userId: string, token: string) {
        const response = await API.getAllUserAggWords(userId, token, {
            wordsPerPage: Constants.TOTAL_AVAILABLE_WORDS.toString(),
            filter: JSON.stringify({ $and: [{ 'userWord.difficulty': 'hard' }] }),
        });

        const [{ paginatedResults }] = response;
        return paginatedResults;
    }

    async increaseLearnedWordsInStatisticsToday() {
        const { userId, token } = state.getItem('auth');
        const currentDay = new Date().toISOString().slice(0, 10);
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

        currenDayObject.learnedWords += 1;
        optional[currentDay] = currenDayObject;
        initStat.optional = optional;
        initStat.learnedWords += 1;

        await API.upsertStatistics(userId, token, initStat);
    }

    listen() {
        let isPlayed = false;
        let audio: HTMLAudioElement | null = null;
        let audio1: HTMLAudioElement | null = null;
        let audio2: HTMLAudioElement | null = null;
        const playAudio1 = async () => {
            await audio1?.play();
        };
        const playAudio2 = async () => {
            await audio2?.play();
            isPlayed = false;
        };

        function playAudioArray(soundTracks: Array<string>) {
            if (isPlayed) {
                audio?.removeEventListener('ended', playAudio1);
                audio1?.removeEventListener('ended', playAudio2);
                audio?.pause();
                audio1?.pause();
                audio2?.pause();
            }

            audio = new Audio(soundTracks[0]);
            audio1 = new Audio(soundTracks[1]);
            audio2 = new Audio(soundTracks[2]);
            isPlayed = true;
            audio.play();
            audio.addEventListener('ended', playAudio1);
            audio1.addEventListener('ended', playAudio2);
        }

        const words = document.body.querySelector('#words');
        words?.addEventListener('click', async (e) => {
            const target = <HTMLElement>e.target;
            const buttonSound = target.closest('.sound');
            if (buttonSound) {
                const card = <HTMLElement>target.closest('.card');
                const pathAudio = `${BASE}/${card.getAttribute('data-audio')}`;
                const pathAudioMeaning = `${BASE}/${card.getAttribute('data-audioMeaning')}`;
                const pathAudioExample = `${BASE}/${card.getAttribute('data-audioExample')}`;

                playAudioArray([pathAudio, pathAudioMeaning, pathAudioExample]);
                return;
            }
            const buttonHard = target.closest('.hard-word');
            if (buttonHard) {
                const card = <HTMLElement>target.closest('.card');
                const wordId = <string>card.getAttribute('data-id');
                if (!buttonHard.classList.contains('selected')) {
                    await saveWord(wordId, 'hard', {});
                    buttonHard.classList.add('selected');
                    card.querySelector('.easy-word')?.classList.remove('selected');
                    card.classList.add('learned-word');
                    this.checkForAllLearned();
                }
                if (buttonHard.classList.contains('selected') && this.complexity === Constants.COMPLEXITY_HARDWORDS) {
                    await saveWord(wordId, 'normal', {});
                    card.remove();
                    const allCards = document.querySelectorAll('.card');
                    if (!allCards.length) {
                        this.displayNoHardWords();
                    }
                }
                return;
            }
            const easyWord = target.closest('.easy-word');
            if (easyWord) {
                if (!easyWord.classList.contains('selected')) {
                    const card = <HTMLElement>target.closest('.card');
                    const wordId = <string>card.getAttribute('data-id');
                    await saveWord(wordId, 'easy', {});
                    await this.increaseLearnedWordsInStatisticsToday();
                    card.classList.add('learned-word');
                    this.checkForAllLearned();
                    if (this.complexity === Constants.COMPLEXITY_HARDWORDS) {
                        card.remove();
                        const allCards = document.querySelectorAll('.card');
                        if (!allCards.length) {
                            this.displayNoHardWords();
                        }
                    } else {
                        easyWord.classList.add('selected');
                        card.querySelector('.hard-word')?.classList.remove('selected');
                    }
                }
                return;
            }
        });
    }
}
