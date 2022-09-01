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
    console.log(userId, wordId, token);

    const initOption = <IOptionalToWord>{
        sprintCorrect: 0,
        sprintTotal: 0,
        audioCallCorrect: 0,
        audioCallTotal: 0,
        correctInLineCount: 0,
    };

    // инициализируем с нулевыми значениями
    const body: NoteToWord = {
        difficulty: complexity,
        optional: initOption,
    };

    const userWord = await API.getUserWordById(userId, wordId, token);
    let result;
    if (typeof userWord === 'string') {
        console.log('POST');
        // и потом присваиваем новые свойства если есть
        Object.assign(body.optional, options);
        result = await API.createUserWord(userId, wordId, token, body);
    } else {
        console.log('PUT');
        Object.assign(body.optional, userWord.optional);
        // Object.assign(body.optional, options)
        result = await API.updateUserWord(userId, wordId, token, body);
    }
    console.log(result);
};

export function shuffle<T>(array: Array<T>): Array<T> {
    return array.sort(() => Math.random() - 0.5);
}
