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
    LOADER_TEMPLATE,
} from './audio-call.template';
import { StartGamePage } from '../start-page-game/start-page-game.components';
import {
    createUserWord,
    getAllUserAggWords,
    getChunkOfWords,
    getStatistics,
    getUserWordById,
    updateUserWord,
    upsertStatistics,
} from '../api/api';
import { IWord, NoteToWord, Statistic, UserWord } from '../api/types';
import { STATISTIC_TEMPLATE } from '../statistic/statistic.template';
import { IOptionalToWord, IStatisticDayAudioCall } from '../types';

export class AudioCall {
    header: Header;
    startPage: StartGamePage;
    complexity: number;
    page: number;
    learnBookGame: boolean;
    indexWord: number;
    isRightAnswer: boolean;
    answers: { right: IWord[]; wrong: IWord[] };
    arraySeriesOfCorrectAnswers: number[];
    seriesOfCorrectAnswers: number;
    statisticDay: IStatisticDayAudioCall;
    learnedWords: number;

    constructor() {
        this.header = new Header();
        this.startPage = new StartGamePage();
        this.complexity = 0;
        this.page = 0;
        this.indexWord = 0;
        this.learnBookGame = false;
        this.isRightAnswer = false;
        this.arraySeriesOfCorrectAnswers = [];
        this.seriesOfCorrectAnswers = 0;
        this.answers = {
            right: [],
            wrong: [],
        };
        this.statisticDay = {
            newWordInGame: 0,
            longestSequenceCorrectAnswers: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
        };
        this.learnedWords = 0;
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
        this.resetParam();
        state.isFromBook = false;
        this.imitationKeydown();

        document.querySelector('.start-game')?.addEventListener('click', () => {
            if (!this.learnBookGame) {
                this.complexity = state.complexityMainGame;
                this.page = Math.floor(Math.random() * 20);
            } else {
                this.complexity = state.getItem('complexity');
                this.page = state.getItem('page');
            }
            this.renderLoading();
            this.game();
            state.isGame = true;
        });
    }

    async game() {
        const arrayWords = await this.getArrayForGame(
            this.complexity.toString(),
            this.page.toString(),
            this.learnBookGame,
            state.getItem('isAuth')
        );
        this.renderWord(arrayWords, this.indexWord);
        this.mouseGame(arrayWords);
        this.keyboardGame(arrayWords);
    }

    renderLoading() {
        const words = <HTMLElement>document.body.querySelector('.start-game_container');
        words.innerHTML = LOADER_TEMPLATE;
    }

    async getArrayForGame(group: string, page: string, isFromBook: boolean, isAuth: boolean) {
        if (!isAuth) return await getChunkOfWords(group, page);
        const { userId, token } = state.getItem('auth');
        if (group === '6') {
            const res = await getAllUserAggWords(userId, token, {
                filter: JSON.stringify({ 'userWord.difficulty': 'hard' }),
            });
            const [{ paginatedResults }] = res;
            return paginatedResults;
        } else {
            if (isFromBook && isAuth) {
                return await this.getArray(group, page);
            } else return await getChunkOfWords(group, page);
        }
    }

    async getArray(group: string, page: string) {
        const tempArr = await getChunkOfWords(group, page);
        const { userId, token } = state.getItem('auth');
        const [{ paginatedResults }] = await getAllUserAggWords(userId, token, {
            group: group,
            page: '0',
            wordsPerPage: '600',
            filter: JSON.stringify({
                'userWord.difficulty': 'easy',
            }),
        });
        const easyKeyArray = <Array<string>>paginatedResults.map((iWord) => iWord._id);
        const filteredArray = tempArr.filter((iWord) => {
            return !easyKeyArray.includes(<string>iWord.id);
        });

        async function rec(group: string, page: string, array: Array<IWord>): Promise<Array<IWord>> {
            if (array.length >= 20) return array;
            if (Number(page) <= 0) return array;

            const tempArr = await getChunkOfWords(group, (Number(page) - 1).toString());
            const filteredArray = tempArr.filter((iWord) => !easyKeyArray.includes(<string>iWord.id));
            const newArray = [...array, ...filteredArray].slice(0, 20);

            return newArray.length < 20 ? await rec(group, (Number(page) - 1).toString(), newArray) : newArray;
        }

        return await rec(group, page, filteredArray);
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
                    this.seriesOfCorrectAnswers += 1;
                } else {
                    target.classList.add('wrong-answer');
                    this.playSound('../../assets/sounds/incorrect2.mp3');
                    this.rightAnswer(pathImage, searchWord);
                    this.answers.wrong.push(searchWord);
                    this.checkLastWord(arrayWords);
                    this.seriesOfCorrectAnswers += 0;
                }
                this.isRightAnswer = true;
            }
            if (target.classList.contains('next')) {
                this.nextButton(arrayWords, searchWord, pathImage);
            }
        });
    }

    keyboardGame(arrayWords: IWord[]) {
        const keyboard = (event: KeyboardEvent) => {
            if (state.isGame) {
                const searchWord = arrayWords[this.indexWord];
                const pathImage = `${BASE}/${searchWord.image}`;
                const buttons = document.querySelectorAll<HTMLButtonElement>('.btn-choice');
                const keyboardButton = (index: number) => {
                    if (buttons[index].innerHTML === searchWord.wordTranslate) {
                        this.rightAnswer(pathImage, searchWord);
                        this.playSound('../../assets/sounds/correct2.mp3');
                        this.answers.right.push(searchWord);
                        this.checkLastWord(arrayWords);
                        this.seriesOfCorrectAnswers += 1;
                    } else {
                        this.playSound('../../assets/sounds/incorrect2.mp3');
                        this.rightAnswer(pathImage, searchWord);
                        this.answers.wrong.push(searchWord);
                        this.checkLastWord(arrayWords);
                        buttons[index].classList.add('wrong-answer');
                        this.arraySeriesOfCorrectAnswers.push(this.seriesOfCorrectAnswers);
                        this.seriesOfCorrectAnswers = 0;
                    }
                    this.isRightAnswer = true;
                };
                switch (event.code) {
                    case 'Space':
                        this.nextButton(arrayWords, searchWord, pathImage);
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

    nextButton(arrayWords: IWord[], searchWord: IWord, pathImage: string) {
        if (!this.isRightAnswer) {
            this.rightAnswer(pathImage, searchWord);
            this.isRightAnswer = true;
            this.answers.wrong.push(searchWord);
            this.playSound('../../assets/sounds/incorrect2.mp3');
            this.checkLastWord(arrayWords);
            this.seriesOfCorrectAnswers = 0;
        } else {
            this.arraySeriesOfCorrectAnswers.push(this.seriesOfCorrectAnswers);
            if (this.indexWord === arrayWords.length - 1) {
                this.showStatistic(this.answers.right, this.answers.wrong);
            } else {
                this.indexWord++;
                this.renderWord(arrayWords, this.indexWord);
                this.isRightAnswer = false;
            }
        }
    }

    checkLastWord(arrayWords: IWord[]) {
        if (this.indexWord === arrayWords.length - 1) {
            (<HTMLButtonElement>document.querySelector('.next')).innerHTML = 'Статистика';
        }
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
                this.resetParam();
            }
        });
    }

    resetParam() {
        this.indexWord = 0;
        state.complexityMainGame = 0;
        this.isRightAnswer = false;
        state.isGame = false;
        this.answers = {
            right: [],
            wrong: [],
        };
        this.arraySeriesOfCorrectAnswers = [];
        this.seriesOfCorrectAnswers = 0;
        this.statisticDay = {
            newWordInGame: 0,
            longestSequenceCorrectAnswers: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
        };
        this.learnedWords = 0;
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
        const renderWordStatistic = (arr: IWord[], className: string) => {
            arr.forEach((el) => {
                document
                    .querySelector(className)
                    ?.insertAdjacentHTML('beforeend', STATISTIC_WORD(el.audio, el.word, el.wordTranslate));
            });
        };
        renderWordStatistic(rightWords, '.right-word');
        renderWordStatistic(wrongWords, '.wrong-word');
        const soundBtns = document.querySelectorAll<HTMLElement>('.sound-btn');
        soundBtns.forEach((el) => {
            const pathAudio = `${BASE}/${el.getAttribute('data-audio')}`;
            this.playWordOnClick(el, pathAudio);
        });
        const isAuth = <boolean>state.getItem('isAuth');
        if (isAuth) {
            this.getStatistic();
            this.setStatisticWord(this.answers.right, true);
            this.setStatisticWord(this.answers.wrong, false);
            this.setStatisticDay();
        }
    }

    async setStatisticWord(array: IWord[], isRight: boolean) {
        const isHardWord = state.getItem('complexity') === '6';
        array.forEach((el) => {
            let id = '';
            if (isHardWord) {
                id = <string>el._id;
            } else id = <string>el.id;
            this.statisticWord(id, isRight);
        });
    }

    getStatistic() {
        const audioCallCorrect = this.answers.right.length;
        const audioCallTotal = this.answers.right.length + this.answers.wrong.length;
        const longestSequenceCorrectAnswers = this.arraySeriesOfCorrectAnswers.sort((a, b) => b - a)[0];

        this.statisticDay.longestSequenceCorrectAnswers = longestSequenceCorrectAnswers;
        this.statisticDay.audioCallCorrect = audioCallCorrect;
        this.statisticDay.audioCallTotal = audioCallTotal;
    }

    async statisticWord(wordId: string, isRight: boolean) {
        const { userId, token } = state.getItem('auth');
        const initOption = <IOptionalToWord>{
            sprintCorrect: 0,
            sprintTotal: 0,
            audioCallCorrect: 0,
            audioCallTotal: 0,
            correctInLineCount: 0,
        };

        let userWord = await getUserWordById(userId, wordId, token);
        if (typeof userWord === 'string') {
            this.statisticDay.newWordInGame += 1;
            userWord = <UserWord>(
                await createUserWord(userId, wordId, token, { difficulty: 'normal', optional: initOption })
            );
        }

        if (isRight) {
            userWord.optional.audioCallCorrect += 1;
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

        userWord.optional.audioCallTotal += 1;
        const noteToWord = <NoteToWord>{
            difficulty: userWord.difficulty,
            optional: JSON.parse(JSON.stringify(userWord.optional)),
        };
        await updateUserWord(userId, wordId, token, noteToWord);
    }

    async setStatisticDay() {
        const { userId, token } = state.getItem('auth');
        const currentDay = new Date().toISOString().slice(0, 10);
        let currentDayObject = {
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
                [currentDay]: currentDayObject,
            },
        };
        const response = await getStatistics(userId, token);

        if (typeof response !== 'string') {
            const { learnedWords, optional } = response;
            initStat.learnedWords = learnedWords;
            initStat.optional = JSON.parse(JSON.stringify(optional));
        }

        const optional = initStat.optional;

        // eslint-disable-next-line no-prototype-builtins
        if (optional.hasOwnProperty(currentDay)) {
            currentDayObject = JSON.parse(JSON.stringify(optional[currentDay]));
        } else optional[currentDay] = currentDayObject;

        const { audioCallCorrect, audioCallTotal, longestSequenceCorrectAnswers, newWordInGame } = this.statisticDay;

        currentDayObject.sprintCorrectInLineCount =
            currentDayObject.sprintCorrectInLineCount > longestSequenceCorrectAnswers
                ? currentDayObject.sprintCorrectInLineCount
                : longestSequenceCorrectAnswers;
        currentDayObject.sprintNewWords += newWordInGame;
        currentDayObject.sprintCorrect += audioCallCorrect;
        currentDayObject.sprintTotal += audioCallTotal;

        optional[currentDay] = currentDayObject;
        initStat.optional = optional;
        initStat.learnedWords += this.learnedWords;

        upsertStatistics(userId, token, initStat);
    }
}
