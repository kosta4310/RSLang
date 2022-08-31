type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

type IndexObject = {
    [key: string]: string | boolean;
};

// interface IOptionalToStatistic {
//     [key: string]: IOptionalToWord;
// }

interface IOptionalToWord {
    sprintCorrect: number;
    sprintTotal: number;
    audioCallCorrect: number;
    audioCallTotal: number;
    correctInLineCount: number;
}


enum Constants {
    // 0 - это А1, ... 5 - это C2, поэтому будем считать что цифра 6 - это страница со сложными словами
    COMPLEXITY_HARDWORDS = 6,
    WORDS_PER_PAGE = 20,
    HUGE_NUMBER = 10000
}


export { StateParam, ParamPage, IndexObject, IOptionalToWord, Constants };
