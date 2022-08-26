import { AudioCall } from './../audio-call/audio-call.components';
import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';

export class Router {
    router: Navigo;
    authorization: Authorization;
    homePage: HomePage;
    book: Book;
    audioCall: AudioCall;
    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization();
        this.book = new Book();
        this.audioCall = new AudioCall()
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
           this.audioCall.init()
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
