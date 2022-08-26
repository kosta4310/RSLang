type StateParam = {
    page: string;
    group: string;
    isFromBook: boolean;
};

type ParamPage = Pick<StateParam, 'page' | 'group'>;

export { StateParam, ParamPage };
