import { Router } from './components/Router/router';
import './style.scss';
import './state';
// import { state } from './state';
// import * as API from './components/api/api';



state.init();

// const { userId, token, refreshToken } = state.getItem('auth');
// API.getNewUserToken(userId, refreshToken);

const router = new Router();
router.init();
