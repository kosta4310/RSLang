import { Router } from './components/Router/router';
import './style.scss';
import './state';
import { state } from './state';

state.init();

const router = new Router();
router.init();
