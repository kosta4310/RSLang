import './audio-call.scss';

export const AUDIO_CALL_TITLE = 'Аудиовызов';
export const AUDIO_CALL_DESCRIPTION = 'Тренировка Аудиовызов улучшает ваше восприятие речи на слух.';
export const AUDIO_CALL_TEMPLATE = `
<div class="wrapper">
<div class="container">
<div class="game-container__audio-call">
    <div class="audio-call__cancel">
        <svg class="btn-cancel__svg" width="55" height="55">
        <use xlink:href="../../assets/svg/icons.svg#cancel"></use>
        </svg>
        </a>
    </div>
    <div class="game-wrapper">
    <div class="audio-call__sound"><svg height="100" width="100" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound" height="100" width="100"></use></svg>
    </div>
    <div class="audio-call__choiceBtns">
        <button class="btn-choice">1</button>
        <button class="btn-choice">2</button>
        <button class="btn-choice">3</button>
        <button class="btn-choice">4</button>
        <button class="btn-choice">5</button>
    </div>
    <button class="next">Не знаю</button>
    </div>
</div>    
</div>
</div>`;
