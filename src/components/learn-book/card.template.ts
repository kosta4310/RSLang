import { IWord } from '../api/types';
import { BASE } from '../../config';

export async function getCard(word: IWord) {
    const pathImage = `${BASE}/${word.image}`;
    return `
<div class="card" data-id=${word.id} data-audio=${word.audio} data-audioMeaning=${word.audioMeaning} data-audioExample=${word.audioExample}>
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
   </div>
   <div class="card__button">
       <img class="speaker" src="../../../assets/images/wordAudio.png" alt="speaker">
       <img src="../../../assets/images/wordLearned.png" alt="learned">
       <img src="../../../assets/images/wordHard.png" alt="hard">
   </div>
</div>`;
}
