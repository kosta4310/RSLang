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

export { CreatedUser, IUser, Auth, IWord };
