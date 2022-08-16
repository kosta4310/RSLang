import { Auth, CreatedUser, IUser, IWord } from './types';

const BASE = 'http://127.0.0.1:3001';
const USERS = `${BASE}/users`;
const WORDS = `${BASE}/words`;

// ToDo types for httpstatus
// function checkStatusCode(response: Response): Promise<IUser | string> {
//     return response.status === 200 ? response.json() : response;
// }

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

async function deleteUser(userId: string, token: string): Promise<number> {
    const response = await fetch(`${USERS}/${userId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${token}`,
            accept: '/',
        },
    });
    return response.status;
}

// async function getNewUserToken(userId: string, token: string, refreshToken: string) {
//     const response = await fetch(`${USERS}/${userId}/${refreshToken}`, {
//         method: 'GET',
//         credentials: 'same-origin',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             accept: 'application/json',
//         },
//     });
//     return response;
// }

async function getChunkOfWords(group: string, page: string): Promise<Array<IWord>> {
    const response = await fetch(`${WORDS}?group=${group}&page=${page}`);
    return response.json();
}

async function getWordById(wordId: string): Promise<IWord> {
    const response = await fetch(`${WORDS}/${wordId}`);
    return response.json();
}

export { createUser, getUser, signIn, updateUser, deleteUser, getChunkOfWords, getWordById };
