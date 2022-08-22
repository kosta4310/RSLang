import { templateFooter } from '../footer/footer.template';
import { Header } from '../header/header.component';
import { templateHeader } from '../header/header.template';
import { templateInitPage } from './initPage.template';
import * as API from '../api/api';
import { getCard } from './card.template';
import { BASE } from '../../config';

export class Book {
    async init() {
        const arrayWords = await this.getArrayWords();
        document.body.innerHTML = '';
        //   document.body.style.height = '100%';
        document.body.insertAdjacentHTML('afterbegin', templateInitPage);
        document.body.insertAdjacentHTML('afterbegin', templateHeader);
        document.body.insertAdjacentHTML('beforeend', templateFooter);
        new Header().init();
        const words = <HTMLElement>document.body.querySelector('#words');
        await arrayWords.map(async (obj) => {
            words.insertAdjacentHTML('beforeend', await getCard(obj));
        });
        this.listen();
    }

    async getArrayWords() {
        return API.getChunkOfWords('1', '1');
    }

    listen() {
        const arrSpeakers = <NodeListOf<HTMLElement>>document.body.querySelectorAll('.speaker');
        function playAudioArray(soundTracks: Array<string>) {
            const audio = new Audio(soundTracks[0]);
            const audio1 = new Audio(soundTracks[1]);
            const audio2 = new Audio(soundTracks[2]);
            audio.play();
            audio.addEventListener('ended', () => {
                audio1.play();
            });
            audio1.addEventListener('ended', () => {
                audio2.play();
            });
        }
        arrSpeakers.forEach((speaker) =>
            speaker.addEventListener('click', (e) => {
                const card = <HTMLElement>(<HTMLElement>e.target).closest('.card');
                const pathAudio = `${BASE}/${card.getAttribute('data-audio')}`;
                const pathAudioMeaning = `${BASE}/${card.getAttribute('data-audioMeaning')}`;
                const pathAudioExample = `${BASE}/${card.getAttribute('data-audioExample')}`;

                playAudioArray([pathAudio, pathAudioMeaning, pathAudioExample]);
            })
        );
    }
}
