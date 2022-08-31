import './statistic.scss';

export const STATISTIC_TEMPLATE = (rightCount: number, wrongCount: number) => {
    return `<div class="statistic-container">
    <div class="statistic-title">Результаты</div>
    <div class="words-container">
        <div class="right-container">
            <div class="answer-title">Я знаю<span class="right-count">${rightCount}</span></div>
            <div class="right-word"></div>
        </div>
        <div class="wrong-container">
            <div class="answer-title">Я не знаю<span class="wrong-count">${wrongCount}</span></div>
            <div class="wrong-word"></div>
        </div>
    </div>
    </div>`;
};

export const STATISTIC_WORD = (audio: string, word: string, wordTranslate: string) => {
    return `<div class="word-result">
    <div class="sound-btn" data-audio=${audio}><svg class="sound-svg" height="30" width="30" fill="#000"><use xlink:href="../../../assets/svg/icons.svg#sound" height="30" width="30"></use></svg>
    </div>
    <div class="word">
       <div class="word-statistic word-english">${word}</div>
       <div class="word-statistic word-wordTranslate">${wordTranslate}</div>
    </div>
    </div>`;
};
