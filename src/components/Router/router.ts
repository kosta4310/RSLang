import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';
import { Sprint } from '../sprint/sprint.component';
import { StartGamePage } from '../start-page-game/start-game-page.components';
import { Header } from '../header/header.component';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    sprint: Sprint;
    startGamePage: StartGamePage;
    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
        this.sprint = new Sprint();
        this.startGamePage = new StartGamePage();
    }
    init() {
        this.router
            .on('/', () => {
                console.log('start page');

                this.homePage.init();
            })
            .on('/learnbook', () => {
                console.log('learn book');
                this.book.init();
            })
            .on('/statistic', () => {
                console.log('statistic');
            })
            .on('/audio-call', () => {
                console.log('game listen');
            })
            .on('/game-sprint', () => {
                console.log('game sprint');
                this.startGamePage.init('Sprint', 'This game for the real men', false);
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .on('/learnbook/game-sprint', () => {
                console.log('learnbook game sprint');
                this.startGamePage.init('Sprint', 'This game for the real men', true);
            })
            .resolve();
    }
}
