import './statistic.scss';

export const STATISTIC_TEMPLATE = (rightCount: number, wrongCount: number) => {
    return `
    <div class="stat__container">
        <h2 class="statistic-title">Статистика по играм</h2>
        <div class="stat__game-container">
            <div class="stat__game-card">
                <h2>Аудиовызов</h2>
                <div class="stat__game-line-container">
                    <div class="answer-title">количество новых слов за день</div>
                    <div class="right-word">${20}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${50}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">самая длинная серия правильных ответов</div>
                    <div class="right-word">${40}</div>
                </div>
            </div>
            <div class="stat__game-card">
                <h2>Спринт</h2>
                <div class="stat__game-line-container">
                    <div class="answer-title">количество новых слов за день</div>
                    <div class="right-word">${20}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${50}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">самая длинная серия правильных ответов</div>
                    <div class="right-word">${40}</div>
                </div>
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
