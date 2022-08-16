import * as api from './components/api/api';
import { IUser } from './components/api/types';
import './style.scss';

console.log('index.js start');
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
//     }
// });
const userId = '62fbeda3bc3a4e2688933d6e';
const token = <string>localStorage.getItem('token');
const refreshToken = <string>localStorage.getItem('refreshToken');

// api.getUser(userId, token).then((res) => {
//     console.log(res);
// });

// api.updateUser(userId, token, {
//     email: 'kostya@gmail.com',
//     password: '12345678',
// });

// api.deleteUser(userId, token).then((res) => console.log(res));

// api.getNewUserToken(userId, refreshToken, token).then((res) => console.log(res));

// api.getChunkOfWords('1', '1').then((res) => console.log(res));

// api.getWordById('5e9f5ee35eb9e72bc21af70c').then((res) => console.log(res));
