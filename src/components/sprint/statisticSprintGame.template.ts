export function templateStatisticGameSprint() {
    return `<div class="wrapper wrapper__statistic-sprint">
      <div class="container container__statistic-sprint">
         <div class="statistic-sprint">
            <div class="statistic-sprint__cancel">
                    <button class="btn-cancel">
                        <svg class="btn-cancel__svg">
                            <use xlink:href="../../assets/svg/icons.svg#cancel"></use>
                        </svg>
                    </button>
            </div>
            <div class="statistic-sprint__main">
            <h1 class="statistic-sprint__title">
                  Рузультаты
            </h1>
            <div class="statistic-sprint__block">
               <div class="statistic-sprint__table">
                  
               </div>
            </div>
            </div>
         </div>
      </div>
   </div>`;
}

export function templateTableLine(
    audio: string,
    word: string,
    transcription: string,
    wordTranslate: string,
    isRight: boolean
) {
    return `
   <div class="table__line">
      <button class="table__sound" data-sound=${audio}>
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
