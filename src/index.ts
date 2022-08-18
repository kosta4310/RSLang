import * as api from './components/api/api';
import { IUser } from './components/api/types';
import './style.scss';

document.body.innerHTML = `<img src="./assets/images/GitHub-Mark/PNG/GitHub-Mark-32px.png" alt="logo">`;

const user: IUser = {
    name: 'john',
    email: 'ajdfafj@yandex.ru',
    password: '13345678',
};

// api.createUser(user).then((res) => {
//     console.log(res);
// });

// api.signIn(user).then((res) => {
//     if (typeof res !== 'string') {
//         localStorage.token = res.token;
//         localStorage.refreshToken = res.refreshToken;
//         localStorage.userId = res.userId;
//     }
// });
const userId = <string>localStorage.getItem('userId');
const token = <string>localStorage.getItem('token');
const refreshToken = <string>localStorage.getItem('refreshToken');
const wordId = '5e9f5ee35eb9e72bc21af70c';
// api.getUser(userId, token).then((res) => {
//     console.log(res);
// });

// api.updateUser(userId, token, {
//     email: 'kostya@gmail.com',
//     password: '12345678',
// });

// api.deleteUser(userId, token).then((res) => console.log(res));

// api.getNewUserToken(userId, refreshToken).then((res) => console.log(res));

// api.getChunkOfWords('1', '1').then((res) => console.log(res));

// api.getWordById(wordId).then((res) => console.log(res));

// api.createUserWord(userId, wordId, token, { difficulty: 'middle', optional: { repeat: 'true' } }).then((res) =>
//     console.log(res)
// );

// api.getAllUserWords(userId, token).then((res) => console.log(res));

// api.getUserWordById(userId, wordId, token).then((res) => console.log(res));

// api.updateUserWord(userId, wordId, token, { difficulty: 'light', optional: { repeat: 'false' } }).then((res) =>
//     console.log(res)
// );

// api.deleteUserWord(userId, wordId, token).then((res) => console.log(res));

api.getAllUserAggWords(userId, token, {
    page: '0',
    group: '1',
    wordsPerPage: '5',
    filter: JSON.stringify({ 'userWord.difficulty': 'middle' }),
}).then((res) => console.log(res));

// const res = new URLSearchParams({
//     page: '9',
//     group: '1',
//     wordsPerPage: '5',
//     filter: JSON.stringify({ 'userWord.difficulty': 'easy' }),
// });
// console.log(res.toString());
