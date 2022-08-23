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
        let isPlayed = false;
        let audio: HTMLAudioElement | null = null;
        let audio1: HTMLAudioElement | null = null;
        let audio2: HTMLAudioElement | null = null;
        const playAudio1 = async () => {
            await audio1?.play();
        }
        const playAudio2 = async () => {
            await audio2?.play();
            isPlayed = false;
        }

        function playAudioArray(soundTracks: Array<string>) {
            if (isPlayed) {
                audio?.removeEventListener('ended', playAudio1)
                audio1?.removeEventListener('ended', playAudio2)
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
        // для оптимизации вешаем обработчик на весь блок - делегирование событий
        // а не на каждую кнопку
        const words = document.body.querySelector('#words')
        words?.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if (target.classList.contains('speaker')) {
                const card = <HTMLElement>(<HTMLElement>e.target).closest('.card');
                const pathAudio = `${BASE}/${card.getAttribute('data-audio')}`;
                const pathAudioMeaning = `${BASE}/${card.getAttribute('data-audioMeaning')}`;
                const pathAudioExample = `${BASE}/${card.getAttribute('data-audioExample')}`;

                playAudioArray([pathAudio, pathAudioMeaning, pathAudioExample]);
            }
        })
    }
}
