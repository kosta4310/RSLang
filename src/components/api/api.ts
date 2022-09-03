import {
    AggregatedWordResponse,
    Auth,
    InputAllUserAggWords,
    IUser,
    IWord,
    NoteToWord,
    RefreshTokenResponse,
    Statistic,
    UserWord,
} from './types';
import { StatusCodes } from 'http-status-codes';
import { BASE } from '../../config';
import { state } from '../../state';

const USERS = `${BASE}/users`;
const WORDS = `${BASE}/words`;

async function getNewUserToken(userId: string, refreshToken: string): Promise<RefreshTokenResponse | string> {
    const response = await fetch(`${USERS}/${userId}/tokens`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            accept: 'application/json',
        },
    });

    if (response.status === StatusCodes.FORBIDDEN || response.status === StatusCodes.UNAUTHORIZED) {
        // перейти на главную страницу
        // state.setItem({ isAuth: false });
        // state.delItem('auth');
        // window.location.href = '/';
    }

    return response.status === StatusCodes.OK ? response.json() : response.text();
}

// функция-обёртка
// Если token истёк, пробуем получить новый и отправить запрос заново
async function retry(input: RequestInfo | URL, init?: RequestInit | undefined) {
    let response = await fetch(input, init);
    // 402 для /users/{id}/words
    // 401 для других эндпоинтов
    if (response.status === StatusCodes.UNAUTHORIZED || response.status === StatusCodes.PAYMENT_REQUIRED) {
        console.log(`TOKEN HAS EXPIRED, TRY TO GET NEW TOKEN`);
        const { userId, refreshToken } = state.getItem('auth');
        if (refreshToken) {
            const refreshTokenResponse = await getNewUserToken(userId, refreshToken);
            if (typeof refreshTokenResponse === 'string') {
                // не получили новый токен, поэтому возвращаем просто предыдущий ответ
                return response;
            }
            const auth = state.getItem('auth') ?? {};
            Object.assign(auth, refreshTokenResponse);
            // иначе считаем что получили токен и сохраняем его в хранилище
            state.setItem({ auth: auth, isAuth: true });
            // делаем запрос снова, но уже с другим токеном авторизации
            if (init?.headers) {
                Object.assign(init.headers, { Authorization: `Bearer ${refreshTokenResponse.token}` });
            }
            response = await fetch(input, init);
        }
    }
    return response;
}

async function createUser(user: IUser): Promise<IUser | number> {
    const response = await retry(USERS, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    return response.status === StatusCodes.OK ? response.json() : response.status;
}

async function getUser(userId: string, token: string): Promise<IUser | string> {
    const response = await retry(`${USERS}/${userId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function signIn(user: IUser): Promise<Auth | number> {
    const response = await retry(`${BASE}/signin`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    return response.status === StatusCodes.OK ? response.json() : response.status;
}

async function updateUser(userId: string, token: string, body: Omit<IUser, 'name'>): Promise<Auth | string> {
    const response = await retry(`${USERS}/${userId}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function deleteUser(userId: string, token: string): Promise<Response | boolean> {
    const response = await retry(`${USERS}/${userId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: '/',
        },
    });
    return response.status === StatusCodes.NO_CONTENT ? true : response;
}

async function getChunkOfWords(group: string, page: string): Promise<Array<IWord>> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}

async function getWordById(wordId: string): Promise<IWord> {
    const response = await fetch(`${WORDS}/${wordId}`);
    return response.json();
}

async function getAllUserWords(userId: string, token: string): Promise<Array<UserWord> | string> {
    const response = await retry(`${USERS}/${userId}/words`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function createUserWord(
    userId: string,
    wordId: string,
    token: string,
    body: NoteToWord
): Promise<UserWord | string> {
    const response = await retry(`${USERS}/${userId}/words/${wordId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function getUserWordById(userId: string, wordId: string, token: string): Promise<UserWord | string> {
    const response = await retry(`${USERS}/${userId}/words/${wordId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function updateUserWord(
    userId: string,
    wordId: string,
    token: string,
    body: NoteToWord
): Promise<UserWord | string> {
    const response = await retry(`${USERS}/${userId}/words/${wordId}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function deleteUserWord(userId: string, wordId: string, token: string): Promise<Response | boolean> {
    const response = await retry(`${USERS}/${userId}/words/${wordId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: '/',
        },
    });
    return response.status === StatusCodes.NO_CONTENT ? true : response;
}

// Вернет массив или пустой или со словом по ID и если это слово помечено пользователем то оно будет
// иметь поле userWord со своими полями
async function getAllUserAggWords(
    userId: string,
    token: string,
    param: InputAllUserAggWords
): Promise<AggregatedWordResponse> {
    const urlSearchParams = new URLSearchParams(param);

    const response = await retry(`${USERS}/${userId}/aggregatedWords?${urlSearchParams}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

// Вернет массив или пустой или со словом по ID и если это слово помечено пользователем то оно будет
// иметь поле userWord со своими полями
async function getUserAggWordById(userId: string, wordId: string, token: string) {
    const response = await retry(`${USERS}/${userId}/aggregatedWords/${wordId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function getStatistics(userId: string, token: string): Promise<(Statistic & { id: string }) | string> {
    const response = await retry(`${USERS}/${userId}/statistics`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

async function upsertStatistics(
    userId: string,
    token: string,
    body: Statistic
): Promise<(Statistic & { id: string }) | string> {
    const response = await retry(`${USERS}/${userId}/statistics`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === StatusCodes.OK ? response.json() : response.text();
}

export {
    createUser,
    getUser,
    signIn,
    updateUser,
    deleteUser,
    getChunkOfWords,
    getWordById,
    getAllUserWords,
    getNewUserToken,
    createUserWord,
    getUserWordById,
    updateUserWord,
    deleteUserWord,
    getAllUserAggWords,
    getUserAggWordById,
    upsertStatistics,
    getStatistics,
};
