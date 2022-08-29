import { Router } from './components/Router/router';
import './style.scss';
import './state';
import { state } from './state';

state.setItem({ page: '0', complexity: '0' });

const router = new Router();
router.init();

