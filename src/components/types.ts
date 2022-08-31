type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

type IndexObject = {
    [key: string]: string | boolean;
};

interface IStatistic {
    // ключ - строка-дата вида '2022-08-29' (new Date().toISOString().slice(0, 10))
    learnedWordCount: number; // кол-во выученных слов в этот день, увеличиваем этот счетчик когда какому-то слову меняем значение difficulty на 'easy'
    sprintCorrect: number; // кол-во правильно угаданных
    sprintTotal: number;
    sprintNewWords: number;
    audioCallNewWords: number;
    sprintCorrectInLineCount: number; // серия правильных ответов
    sprintAudioCallCorrect: number;
    audioCallTotal: number;
}

interface IOptionalToStatistic {
    [date: string]: IStatistic;
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
    HUGE_NUMBER = 10000
}

export { StateParam, ParamPage, IndexObject, IOptionalToWord, Constants };

