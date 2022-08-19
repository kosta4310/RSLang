import Navigo from 'navigo';

export class Router {
    router: Navigo;
    constructor() {
        this.router = new Navigo('/', { hash: true });
    }
    init() {
        this.router
            .on('/', function () {
                console.log(1);
            })
            .resolve();
    }
}