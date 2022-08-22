import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';

export class Router {
    router: Navigo;
    homePage: HomePage;
    constructor() {
        this.homePage = new HomePage();
        this.router = new Navigo('/', { hash: true });
    }
    init() {
        this.router
            .on('/', () => {
                console.log('start page');

                this.homePage.init();
            })
            .on('/learnbook', () => {
                console.log('learn book');
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
                console.log('auth');
            })
            .resolve();
    }
}
