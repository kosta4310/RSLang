type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
    isGame: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

type IndexObject = {
    [key: string]: string | boolean;
};

// interface IStatistic {
//     // ключ - строка-дата вида '2022-08-29' (new Date().toISOString().slice(0, 10))
//     learnedWords: number; // кол-во выученных слов в этот день, увеличиваем этот счетчик когда какому-то слову меняем значение difficulty на 'easy'
//     optional: IOptionalToStatistic;
// }

interface IOptionalToStatistic {
    [currentDay: string]: {
        sprintCorrect: number; // кол-во правильно угаданных
        sprintTotal: number;
        sprintNewWords: number;
        audioCallNewWords: number;
        sprintCorrectInLineCount: number; // серия правильных ответов
        audioCallCorrectInLineCount: number; // серия правильных ответов
        audioCallCorrect: number;
        audioCallTotal: number;
    };
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
}

interface IStatisticDay {
    newWordInGame: number;
    longestSequenceCorrectAnswers: number;
    sprintCorrect: number;
    sprintTotal: number;
}

export { StateParam, ParamPage, IndexObject, IOptionalToWord, Constants, IOptionalToStatistic, IStatisticDay };
