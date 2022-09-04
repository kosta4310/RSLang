import './audio-call.statistic.scss';

export const TEMPLATE_STATISTIC_AUDIO_CALL = `<div class="wrapper wrapper__statistic-audio-call">
      <div class="container container__statistic-audio-call">
         <div class="statistic-audio-call">
            <div class="audio-call__cancel">
                    <button class="btn-cancel">
                        <svg class="btn-cancel__svg">
                            <use xlink:href="../../assets/svg/icons.svg#cancel"></use>
                        </svg>
                    </button>
            </div>
            <div class="statistic-audio-call__main">
            <h1 class="statistic-audio-call__title">
                  Результаты
            </h1>
            <div class="statistic-audio-call__block">
               <div class="statistic-audio-call__table">
                  
               </div>
            </div>
            </div>
         </div>
      </div>
   </div>`;

export function TEMPLATE_TABLE_LINE(
    audio: string,
    word: string,
    transcription: string,
    wordTranslate: string,
    isRight: boolean
) {
    return `
   <div class="table__line">
      <button class="table__sound sound-btn" data-audio=${audio}>
         <svg height="26" width="31" viewBox="0 0 26 31" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound"></use></svg>
      </button>
      <div class="table__word-en">${word}</div>
      <div class="table__word-transcript">${transcription}</div>
      <div class="table__word-translate">${wordTranslate}</div>
      <div class="table__word-result">
         <svg viewBox="0 0 25 25" fill="#000"><use xlink:href=${getLink(isRight)}></use></svg>
      </div>
   </div>`;
}

function getLink(isRight: boolean) {
    return isRight ? '../../../assets/svg/icons.svg#correct' : '../../../assets/svg/icons.svg#incorrect';
}
