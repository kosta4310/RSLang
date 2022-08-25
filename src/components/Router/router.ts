import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';
import { Sprint } from '../sprint/sprint.component';
import { Header } from '../header/header.component';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    sprint: Sprint;
    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
        this.sprint = new Sprint();
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
                this.sprint.init();
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .resolve();
    }
}
