import { Authorization } from './../authorization/authorization.components';
import Navigo from 'navigo';
import { HomePage } from '../first-page/homepage.component';
import { Book } from '../learn-book/LearnBook';
import { Sprint } from '../sprint/sprint.component';

type Params =  {[key: string]: string}

// https://stackoverflow.com/a/2091331
// парсинг строки вида "from-learn-book=1&some-other=125" 
// в объект {from-learn-book: '1', text: '2'}
function getQueryParamsObject(queryString: string) {
    const params = queryString.split('&');
    const obj: Params = {};
    for (let i = 0; i < params.length; i++) {
        const pair = params[i].split('=');
        const key: string = decodeURIComponent(pair[0]);
        if (key) {
            obj[key] = decodeURIComponent(pair[1]);
        }
    }
    return obj;
}

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
            .on('/game-sprint', (match) => {
                // https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#reading-get-params
                // http://localhost:8080/#/game-sprint?from-learn-book=1 - если из лернбука [1]
                // http://localhost:8080/#/game-sprint - просто
                // http://localhost:8080/#/game-sprint?from-learn-book=1&some-other=125 - если несколько параметров
                const queryString = match?.queryString ?? '';
                console.log(`queryString: ${queryString}`);
                const obj = getQueryParamsObject(queryString);
                console.log(obj);
                // параметр отвечающий за то был переход с learn-book или нет (через ссылку [1] выше)
                let fromLearnBookParam = 0;
                if (Object.keys(obj).includes('from-learn-book')) {
                    fromLearnBookParam = +obj['from-learn-book'];
                }
                console.log('game sprint');
                this.sprint.init(fromLearnBookParam);
            })
            .on('/auth', () => {
                this.authorization.init();
            })
            .resolve();
    }
}
