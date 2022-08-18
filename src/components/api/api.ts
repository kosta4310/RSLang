import { Auth, CreatedUser, inputAllUserAggWords, IUser, IWord, NoteToWord, NoteToWordUser } from './types';

const BASE = 'http://127.0.0.1:3001';
// const BASE = 'https://rs-lang-command-task.herokuapp.com';
const USERS = `${BASE}/users`;
const WORDS = `${BASE}/words`;

// ToDo types for httpstatus

async function createUser(user: IUser): Promise<IUser | string> {
    const response = await fetch(USERS, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function getUser(userId: string, token: string): Promise<IUser | string> {
    const response = await fetch(`${USERS}/${userId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function signIn(user: IUser): Promise<Auth | string> {
    const response = await fetch(`${BASE}/signin`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function updateUser(userId: string, token: string, body: Omit<IUser, 'name'>): Promise<Auth | string> {
    const response = await fetch(`${USERS}/${userId}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === 200 ? response.json() : response.text();
}

async function deleteUser(userId: string, token: string): Promise<Response | boolean> {
    const response = await fetch(`${USERS}/${userId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: '/',
        },
    });
    return response.status === 204 ? true : response;
}

async function getNewUserToken(userId: string, refreshToken: string): Promise<Auth | string> {
    const response = await fetch(`${USERS}/${userId}/tokens`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            accept: 'application/json',
        },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function getChunkOfWords(group: string, page: string): Promise<Array<IWord>> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}

async function getWordById(wordId: string): Promise<IWord> {
    const response = await fetch(`${WORDS}/${wordId}`);
    return response.json();
}

async function getAllUserWords(userId: string, token: string): Promise<Array<NoteToWordUser> | string> {
    const response = await fetch(`${USERS}/${userId}/words`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function createUserWord(
    userId: string,
    wordId: string,
    token: string,
    body: NoteToWord
): Promise<NoteToWordUser | string> {
    const response = await fetch(`${USERS}/${userId}/words/${wordId}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === 200 ? response.json() : response.text();
}

async function getUserWordById(userId: string, wordId: string, token: string): Promise<NoteToWordUser | string> {
    const response = await fetch(`${USERS}/${userId}/words/${wordId}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.status === 200 ? response.json() : response.text();
}

async function updateUserWord(
    userId: string,
    wordId: string,
    token: string,
    body: NoteToWord
): Promise<NoteToWordUser | string> {
    const response = await fetch(`${USERS}/${userId}/words/${wordId}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.status === 200 ? response.json() : response.text();
}

async function deleteUserWord(userId: string, wordId: string, token: string): Promise<Response | boolean> {
    const response = await fetch(`${USERS}/${userId}/words/${wordId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: '/',
        },
    });
    return response.status === 204 ? true : response;
}

async function getAllUserAggWords(userId: string, token: string, param: inputAllUserAggWords) {
    const urlSearchParams = new URLSearchParams(param);

    const response = await fetch(`${USERS}/${userId}/aggregatedWords?${urlSearchParams}`, {
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
};
