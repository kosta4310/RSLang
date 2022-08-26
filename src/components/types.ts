type StateParam = {
    page: string;
    complexity: string;
    isFromBook: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'complexity'>;

export { StateParam, ParamPage };
