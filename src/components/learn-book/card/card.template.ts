import { IWord } from '../../api/types';
import { BASE } from '../../../config';
import './card.style.scss';

export function getCard(word: IWord, isAuth: boolean) {
    const pathImage = `${BASE}/${word.image}`;
    return `
<div class="card ${word.userWord?.difficulty && word.userWord?.difficulty !== 'normal' ? 'learned-word': ''}" data-id=${word.id ?? word._id} data-audio=${word.audio} data-audioMeaning=${
        word.audioMeaning
    } data-audioExample=${word.audioExample}>
    <div class="card__image">
        <img src="${pathImage}" alt="${word.word}">
    </div>
    <div class="card__context">
        <div class="card__header">
            <div class="card__left">
                <div class="card__word">${word.word}</div>
                <div class="card__transcription">${word.transcription}</div>
            </div>
            <div class="card__right">
                <div class="card__translate">${word.wordTranslate}</div>
            </div>
        </div>
        <div class="card__meaning">${word.textMeaning}</div>
        <div class="card__example">${word.textExample}</div>
        <div class="card__translate-meaning">${word.textMeaningTranslate}</div>
        <div class="card__translate-example">${word.textExampleTranslate}</div>
        <div class="card__statistics  ${isAuth ? '' : 'none'}">
            <div class="card__statistics-left">
                Правильно угадано:
            </div>
            <div class="card__statistics-container">
                <div class="card__statistics-line">
                    <div class="card__statistics-title">
                        Аудиовызов
                    </div>
                    <div class="">
                        ${word.userWord?.optional?.audioCallCorrect ?? 0} из ${word.userWord?.optional?.audioCallTotal ?? 0}
                    </div>
                </div>
                <div class="card__statistics-line">
                    <div class="card__statistics-title">
                        Спринт
                    </div>
                    <div class="">
                        ${word.userWord?.optional?.sprintCorrect ?? 0} из ${word.userWord?.optional?.sprintTotal ?? 0}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card__button">
        <button class="sound"><svg height="62" width="62" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound"></use></svg></button>
        <button class="easy-word ${isAuth ? 'auth' : 'none'} ${(word.userWord?.difficulty === 'easy') ? 'selected': ''}">
            <svg height="62" width="62" fill="#CBCBCB">
                <use xlink:href="../../../assets/svg/icons.svg#easy"></use>
            </svg>
        </button>
        <button class="hard-word ${isAuth ? 'auth' : 'none'} ${(word.userWord?.difficulty === 'hard') ? 'selected': ''}">
            <svg  height="62" width="62" fill="#CBCBCB">
                <use xlink:href="../../../assets/svg/icons.svg#hard"></use>
            </svg>
        </button>
    </div>
</div>`;
}
