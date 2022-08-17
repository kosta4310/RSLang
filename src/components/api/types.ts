interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IWord {
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

type NoteToWord = {
    difficulty: string;
    optional: object;
};

type NoteToWordUser = NoteToWord & {
    id: string;
    wordId: string;
};

export { CreatedUser, IUser, Auth, IWord, NoteToWord, NoteToWordUser };
