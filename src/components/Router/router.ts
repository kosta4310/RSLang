import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';


export class Router {
    router: Navigo;
    authorization: Authorization;
    constructor() {
        this.router = new Navigo('/', { hash: true });
        this.authorization = new Authorization()
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
                this.authorization.render()
            })
            .resolve();
    }
}
