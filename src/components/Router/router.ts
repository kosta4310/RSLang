import { AudioCall } from './../audio-call/audio-call.components';
import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/learnbook.component';
import { Sprint } from '../sprint/sprint.component';
import { Statistic } from '../statistics-page/statistic.component';
import { state } from './../../state';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    audioCall: AudioCall;
    sprint: Sprint;
    statistic: Statistic

    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
        this.audioCall = new AudioCall();
        this.sprint = new Sprint();
        this.statistic = new Statistic()
    }
    
    init() {
        this.router
            .on('/', () => {
                state.isGame = false;
                this.homePage.init();
            })
            .on('/learnbook', () => {
                state.isGame = false;
                this.book.init();
            })
            .on('/statistic', () => {
                state.isGame = false;
                this.statistic.init();
            })
            .on('/audio-call', () => {
                state.isGame = false;
                this.audioCall.init();
            })
            .on('/sprint', () => {
                state.isGame = false;
                this.sprint.init();
            })
            .on('/auth', () => {
                state.isGame = false;
                this.authorization.init();
            })
            .resolve();
    }
}
