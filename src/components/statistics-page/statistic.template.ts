import { IStatisticDataAll, IStatisticGamePerDay } from '../types';
import './statistic.scss';

export const STATISTIC_TEMPLATE = (statisticGamePerDay: IStatisticGamePerDay, statisticDataAll: IStatisticDataAll) => {
    const rateAudioCall =
        statisticGamePerDay.audioCallTotal &&
        Math.floor((statisticGamePerDay.audioCallCorrect / statisticGamePerDay.audioCallTotal) * 100);
    const rateSprint =
        statisticGamePerDay.sprintTotal &&
        Math.floor((statisticGamePerDay.sprintCorrect / statisticGamePerDay.sprintTotal) * 100);

    return `
    <div class="wrapper">
    <div class="stat__container container">
        <h2 class="statistic-title">Статистика по играм за день</h2>
        <div class="stat__game-container">
            <div class="stat__game-card">
                <h2>Аудиовызов</h2>
                <div class="stat__game-line-container">
                    <div class="answer-title">количество новых слов</div>
                    <div class="right-word">${statisticGamePerDay.audioCallNewWords}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${rateAudioCall}%</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">самая длинная серия правильных ответов</div>
                    <div class="right-word">${statisticGamePerDay.audioCallCorrectInLineCount}</div>
                </div>
            </div>
            <div class="stat__game-card">
                <h2>Спринт</h2>
                <div class="stat__game-line-container">
                    <div class="answer-title">количество новых слов</div>
                    <div class="right-word">${statisticGamePerDay.sprintNewWords}</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${rateSprint}%</div>
                </div>
                <div class="stat__game-line-container">
                    <div class="answer-title">самая длинная серия правильных ответов</div>
                    <div class="right-word">${statisticGamePerDay.sprintCorrectInLineCount}</div>
                </div>
            </div>
        </div>
        <h2 class="statistic-title">Статистика по словам за день</h2>
        <div class="stat__word-container">
            <div class="stat__word-card">
                <div class="stat__word-line-container">
                    <div class="answer-title">количество новых слов</div>
                    <div class="right-word">${statisticDataAll.quantityNewWord}</div>
                </div>
                <div class="stat__word-line-container">
                    <div class="answer-title">процент правильных ответов</div>
                    <div class="right-word">${statisticDataAll.rateRightAnswers}%</div>
                </div>
                <div class="stat__word-line-container">
                    <div class="answer-title">количество изученных слов</div>
                    <div class="right-word">${statisticDataAll.learnedWords}</div>
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
    </div>
    </div>`;
};

export const YOR_ARE_NOT_AUTHENTIFICATION_TEMPLATE = `
<div class="wrapper wrapper__not-auth">
      <div class="container container__not-auth">
         <div class="not-auth">
            <h1 class="not-auth__title">
               Вы не авторизованы.<br>
               Статистика доступна только авторизованным<br> пользователям.
            </h1>
         </div>
      </div>
   </div>`;
