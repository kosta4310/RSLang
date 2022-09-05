import { state } from '../state';
import * as API from './api/api';
import { Auth, Difficulty, NoteToWord } from './api/types';
import { IOptionalToWord } from './types';

export const getTodayString = function () {
    return new Date().toISOString().slice(0, 10);
};

export const saveWord = async function (
    wordId: string,
    complexity: Difficulty = 'hard',
    options: Partial<IOptionalToWord> = {}
) {
    const { token, userId } = <Auth>state.getItem('auth');

    const initOption = <IOptionalToWord>{
        sprintCorrect: 0,
        sprintTotal: 0,
        audioCallCorrect: 0,
        audioCallTotal: 0,
        correctInLineCount: 0,
    };

    const body: NoteToWord = {
        difficulty: complexity,
        optional: initOption,
    };

    const userWord = await API.getUserWordById(userId, wordId, token);
    if (typeof userWord === 'string') {
        Object.assign(body.optional, options);
        await API.createUserWord(userId, wordId, token, body);
    } else {
        Object.assign(body.optional, userWord.optional);
        await API.updateUserWord(userId, wordId, token, body);
    }
};

export function shuffle<T>(array: Array<T>): Array<T> {
    return array.sort(() => Math.random() - 0.5);
}
