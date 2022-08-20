import { Router } from './components/Router/router';
import './style.scss';
import './components/first-page/first-page.component';
import './components/header/header.component';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';

const header = new Header();
header.init();

const footer = new Footer();
footer.init();

const router = new Router();
router.init();
