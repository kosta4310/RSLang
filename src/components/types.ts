type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

type IndexObject = {
    [key: string]: string | boolean;
};

type WordComplexity = "hard" | "easy";

export { StateParam, ParamPage, IndexObject, WordComplexity };
