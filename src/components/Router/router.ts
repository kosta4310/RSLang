import { AudioCall } from './../audio-call/audio-call.components';
import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';
import { Sprint } from '../sprint/sprint.component';
import { StartGamePage } from '../start-page-game/start-game-page.components';
import { Header } from '../header/header.component';
import { on } from 'events';

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
        this.audioCall = new AudioCall()     
        this.sprint = new Sprint();

    }
    init() {
        console.log('router');
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
                console.log('game listen');

            })
            .on('/game-start', () => {
                this.startGamePage.init('Sprint', 'This game for the real men', false);
                this.sprint.init();
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .on('/learnbook/game-start', () => {
                console.log('learnbookgamestart');

                this.startGamePage.init('Sprint', 'This game for the real men', true);
                this.sprint.init();
            })
            .on('/start-game-sprint', () => {
                this.sprint.startGame();
            })
            .resolve();
    }
}