interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IWord {
    _id?: string; // если данные приходят через AggregatedWords, там такой id
    id: string;
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

// Предлагаю такой объект для хранения всей дополнительной информации по словам
type OptionalData = {
    // игра спринт - счетчики угаданных и всего
    sprintCorrect?: number;
    sprintTotal?: number;
    // игра аудивызов - счетчики угаданных и всего
    audioCallCorrect?: number;
    audioCallTotal?: number;
    // счётчик - угадано раз подряд, если ошибка - обнуляем
    correctInLineCount?: number;
    // дата когда был угадан последний раз, можно потом строить статистику по этому значению
    // new Date().toISOString().slice(0, 10)
    // '2022-08-29'
    lastCorrectDate?: string;
};

type NoteToWord = {
    difficulty: string;
    optional: OptionalData;
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

type AggregatedWordCount = { count: number; }
type AggregatedWordItem = {
    paginatedResults: IWord[],
    totalCount: AggregatedWordCount[]
}

type AggregatedWordResponse = AggregatedWordItem[]

type Statistic = {
    optional: object,
    learnedWords: string
}

export { CreatedUser, IUser, Auth, IWord, NoteToWord, UserWord, InputAllUserAggWords, Statistic, AggregatedWordResponse };
