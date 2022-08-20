import { Router } from './components/Router/router';
import './style.scss';
import './components/first-page/first-page.component';
import { header } from './components/header/header.template';
import './components/header/header.component';

const router = new Router();
router.init();
console.log('init');
