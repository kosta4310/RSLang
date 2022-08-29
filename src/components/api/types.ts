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
type OptionalWordData = {
    // игра спринт - счетчики угаданных и всего
    sprintCorrect?: number;
    sprintTotal?: number;
    // игра аудивызов - счетчики угаданных и всего
    audioCallCorrect?: number;
    audioCallTotal?: number;
    // счётчик - угадано раз подряд, если ошибка - обнуляем
    correctInLineCount?: number;
};

type Difficulty = 'normal' | 'hard' | 'easy'

type NoteToWord = {
    difficulty: Difficulty;
    optional: OptionalWordData;
};

// эти данные можно помещать в Optional при запросе upsertStatistics
// так чтобы при работе со страницей статистики разом получить всю информацию через один getStatistics запрос
type OptionalStatData = {
    [dayDate: string]: { // ключ - строка-дата вида '2022-08-29' (new Date().toISOString().slice(0, 10))
        learnedWordCount: number; // кол-во выученных слов в этот день
        sprintCorrect?: number;
        sprintTotal?: number;
        audioCallCorrect?: number;
        audioCallTotal?: number;
    }
}

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
