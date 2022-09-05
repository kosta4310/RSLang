import './audio-call.scss';

export const AUDIO_CALL_TITLE = 'Аудиовызов';
export const AUDIO_CALL_DESCRIPTION = 'Тренировка Аудиовызов улучшает ваше восприятие речи на слух.';
export const AUDIO_CALL_TEMPLATE = (audio: string) => {
    return `
    <div class="container">
    <div class="game-container__audio-call">
        <div class="audio-call__cancel">
            <svg class="btn-cancel__svg" width="55" height="55">
            <use xlink:href="../../assets/svg/icons.svg#cancel"></use>
            </svg>
            </a>
        </div>
        <div class="game-wrapper">      
        <div class="audio-call__sound">
        <div class="sound-btn" data-audio=${audio}><svg class="sound-svg" height="100" width="100" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound" height="100" width="100"></use></svg>
        </div>
        </div>
        <div class="audio-call__choiceBtns">
        </div>
        <button class="next">Не знаю</button>
        </div>
    </div>    
    </div>`;
};

export const AUDIO_CALL_BUTTONS = (word: string,index:number) => {
    return `<button class="btn-choice" data-word=${word}>${index} ${word}</button>`;
};

export const RIGHT_ANSWER_IMAGE = (pathImage: string) => {
    return `<div class="right-image"><img class="right-image" src="${pathImage}"</div>`;
};
export const RIGHT_ANSWER_WORD = (word: string) => {
    return `<div class="right-word">${word}</div>`;
};
 export const SOUND_SVG = (size:number)=>{
    return `<svg class="sound-svg" height="${size}" width="${size}" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound" height="${size}" width="${size}"></use></svg>`
 }
 export const LOADER_TEMPLATE=`<div class="loader-container_forGame"><img class="loader" src="./assets/svg/loader.svg" alt=""></div>`