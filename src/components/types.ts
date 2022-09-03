import { Auth } from './api/types';

type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
    isGame: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

type IndexObject = {
    [key: string]: string | boolean | Auth;
};

interface IOptionalToStatistic {
    [currentDay: string]: IStatisticGamePerDay;
}

interface IStatisticGamePerDay {
    learnedWords: number;
    sprintCorrect: number; // кол-во правильно угаданных
    sprintTotal: number;
    sprintNewWords: number;
    audioCallNewWords: number;
    sprintCorrectInLineCount: number; // серия правильных ответов
    audioCallCorrectInLineCount: number; // серия правильных ответов
    audioCallCorrect: number;
    audioCallTotal: number;
}

interface IStatisticDataAll {
    learnedWords: number;
    quantityNewWord: number;
    rateRightAnswers: number;
}

interface IOptionalToWord {
    sprintCorrect: number;
    sprintTotal: number;
    audioCallCorrect: number;
    audioCallTotal: number;
    correctInLineCount: number;
}

enum Constants {
    COMPLEXITY_HARDWORDS = 6,
    WORDS_PER_PAGE = 20,
    TOTAL_AVAILABLE_WORDS = 3600,
    QUANTITY_WORD_IN_GAME_SPRINT = 20,
    TIME_OF_SPRINT_GAME = 59,
    MAX_NUMBER_WORDS_IN_GROUP = 600,
    STATUS_CODE_NULL_DATA = 1,
    KLS_ONE = 1 /**Показывает что слушатель для клавиатуры еще не добавлен */,
    KLS_TWO = 2 /**Показывает что слушатель для клавиатуры уже добавлен */,
}

interface IStatisticDay {
    newWordInGame: number;
    longestSequenceCorrectAnswers: number;
    sprintCorrect: number;
    sprintTotal: number;
}
interface IStatisticDayAudioCall {
    newWordInGame: number;
    longestSequenceCorrectAnswers: number;
    audioCallCorrect: number;
    audioCallTotal: number;
}

export {
    StateParam,
    ParamPage,
    IndexObject,
    IOptionalToWord,
    Constants,
    IOptionalToStatistic,
    IStatisticDay,
    IStatisticDayAudioCall,
    IStatisticGamePerDay,
    IStatisticDataAll,
};
