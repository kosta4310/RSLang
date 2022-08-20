import { Router } from './components/Router/router';
import './style.scss';
import './components/first-page/first-page.component';
import './components/header/header.component';
import { Header } from './components/header/header.component';

const header = new Header();
header.init();

const router = new Router();
router.init();
