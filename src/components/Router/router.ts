import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
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
            .on('/game-listen', () => {
                console.log('game listen');
            })
            .on('/game-sprint', () => {
                console.log('game sprint');
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .resolve();
    }
}
