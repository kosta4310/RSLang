import { IOptionalToStatistic, IOptionalToWord } from '../types';

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IWord {
    _id?: string;
    id?: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    userWord?: NoteToWord;
    option?: IOptionalToWord;
}

type CreatedUser = {
    id: string;
    name: string;
    email: string;
};

type Auth = {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
};

type Difficulty = 'normal' | 'hard' | 'easy';

type NoteToWord = {
    difficulty: Difficulty;
    optional: IOptionalToWord;
};

type UserWord = NoteToWord & {
    id: string;
    wordId: string;
};

type InputAllUserAggWords = {
    page?: string;
    group?: string;
    wordsPerPage?: string;
    filter?: string;
};

type OmitWord = Omit<IWord, 'id'>;
type AggregatedWord = OmitWord & { _id: string };

type AggregatedWordCount = { count: number };
type AggregatedWordItem = {
    paginatedResults: Array<IWord>;
    totalCount: AggregatedWordCount[];
};

type AggregatedWordResponse = AggregatedWordItem[];

type Statistic = {
    optional: IOptionalToStatistic;
    learnedWords: number;
};

export {
    CreatedUser,
    IUser,
    Auth,
    IWord,
    NoteToWord,
    UserWord,
    InputAllUserAggWords,
    Statistic,
    AggregatedWordResponse,
    Difficulty,
    AggregatedWord,
};
