import { LEARNBOOK_PAGE_TEMPLATE } from './learnbook.template';
import { templateFooter } from '../footer/footer.template';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import * as API from '../api/api';
import { getCard } from './card/card.template';
import { BASE } from '../../config';
import { ControlPanel } from './controlPanel/controlPanel.component';
import { Pagination } from './pagination/pagination.component';
import { state } from '../../state';

export class Book {
    complexity: number;
    page: number;

    constructor() {
        this.complexity = Number(state.getItem('complexity'));
        this.page = state.getItem('page');
    }

    async init() {
        document.body.innerHTML = '';
        //   document.body.style.height = '100%';
        document.body.insertAdjacentHTML('afterbegin', LEARNBOOK_PAGE_TEMPLATE);
        document.body.insertAdjacentHTML('afterbegin', templateHeader);
        document.body.insertAdjacentHTML('beforeend', templateFooter);
        new Header().init();
        const controlPanel = new ControlPanel(this);
        controlPanel.render();
        const pagination = new Pagination(this);
        pagination.render();

        await this.renderWords();
        this.listen();
    }

    async renderWords() {
        const arrayWords = await this.getArrayWords(this.complexity, this.page);
        const words = <HTMLElement>document.body.querySelector('#words');
        words.setAttribute('data-complexity', this.complexity.toString());
        words.innerHTML = '';
        const isAuth = <boolean>state.getItem('isAuth');
        console.log(isAuth);

        await arrayWords.map(async (obj) => {
            words.insertAdjacentHTML('beforeend', await getCard(obj, isAuth));
        });
    }

    async getArrayWords(complexity: number, page: number) {
        return API.getChunkOfWords(complexity.toString(), page.toString());
    }

    listen() {
        let isPlayed = false;
        let audio: HTMLAudioElement | null = null;
        let audio1: HTMLAudioElement | null = null;
        let audio2: HTMLAudioElement | null = null;
        const playAudio1 = async () => {
            await audio1?.play();
        };
        const playAudio2 = async () => {
            await audio2?.play();
            isPlayed = false;
        };

        function playAudioArray(soundTracks: Array<string>) {
            if (isPlayed) {
                audio?.removeEventListener('ended', playAudio1);
                audio1?.removeEventListener('ended', playAudio2);
                audio?.pause();
                audio1?.pause();
                audio2?.pause();
            }

            audio = new Audio(soundTracks[0]);
            audio1 = new Audio(soundTracks[1]);
            audio2 = new Audio(soundTracks[2]);
            isPlayed = true;
            audio.play();
            audio.addEventListener('ended', playAudio1);
            audio1.addEventListener('ended', playAudio2);
        }

        const words = document.body.querySelector('#words');
        words?.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            const buttonSound = target.closest('.sound');
            if (buttonSound) {
                const card = <HTMLElement>target.closest('.card');
                const pathAudio = `${BASE}/${card.getAttribute('data-audio')}`;
                const pathAudioMeaning = `${BASE}/${card.getAttribute('data-audioMeaning')}`;
                const pathAudioExample = `${BASE}/${card.getAttribute('data-audioExample')}`;

                playAudioArray([pathAudio, pathAudioMeaning, pathAudioExample]);
            }
        });
    }
}
