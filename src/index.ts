import { Router } from './components/Router/router';
import './style.scss';
import './state';
import { state } from './state';
// import * as API from './components/api/api';

function initState() {
  const page = state.getItem('page') ?? '0';
  const complexity = state.getItem('complexity') ?? '0';
  state.setItem({ page: page, complexity: complexity });
}

initState();

// const { userId, token, refreshToken } = state.getItem('auth');
// API.getNewUserToken(userId, refreshToken);

const router = new Router();
router.init();
