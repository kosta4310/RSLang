import { Router } from './components/Router/router';
import { HomePage } from './components/first-page/homepage.component';
import './style.scss';

const homePage = new HomePage();
homePage.init();

const router = new Router();
router.init();
