import './statistic.scss';

export const STATISTIC_TEMPLATE = (rightCount: number, wrongCount: number) => {
    return `
    <div class="stat__container">
        <h2 class="statistic-title">Статистика по играм за день</h2>
        <div class="stat__game-container">
            <div class="stat__game-card">
                <h2>Аудиовызов</h2>
                <div class="stat__game-line-container">
                    <div class="answer-title">количество новых слов</div>
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
        <h2 class="statistic-title">Статистика по словам за день</h2>
        <div class="stat__word-container">
            <div class="stat__word-card">
                <div class="stat__word-line-container">
                    <div class="answer-title">количество новых слов</div>
                    <div class="right-word">${20}</div>
                </div>
                <div class="stat__word-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${50}</div>
                </div>
                <div class="stat__word-line-container">
                    <div class="answer-title">количество изученных слов</div>
                    <div class="right-word">${40}</div>
                </div>
            </div>
        </div>
        <h2 class="statistic-title">Статистика за всё время</h2>
        <div class="stat__plot-container">
            <div class="stat__subplot-container">
                <h2>Количество новых слов за каждый день</h2>
                <div id="plot1"></div>
            </div>
            <div class="stat__subplot-container">
                <h2>Количество изученных слов накопительным итогом за весь период обучения</h2>
                <div id="plot2"></div>
            </div>
        </div>
    </div>`;
};
