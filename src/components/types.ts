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

export { StateParam, ParamPage, IndexObject, IOptionalToWord };
