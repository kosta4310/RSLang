import Navigo from 'navigo';


export class Router {
    router: Navigo;
    constructor() {
        this.router = new Navigo('/', { hash: true });
    }
    init() {
        this.router
            .on('/', () => {
                console.log('start page');
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
