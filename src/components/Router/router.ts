import { AudioCall } from './../audio-call/audio-call.components';
import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/learnbook.component';
import { Sprint } from '../sprint/sprint.component';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    audioCall: AudioCall;
    sprint: Sprint;

    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
        this.audioCall = new AudioCall();
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
                this.audioCall.init();
                console.log('game listen');
            })
            .on('/sprint', () => {
                this.sprint.init();
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .resolve();
    }
}
