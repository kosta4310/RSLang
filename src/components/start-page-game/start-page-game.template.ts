import './start-page-game.scss';

export const START_PAGE_GAME_TEMPLATE = (title: string, description: string) => {
    return `<div class="container">
    <div class="start-game_container">
      <h1 class="title">${title}</h1>
      <div class="description-container"><h3 class = "description">${description}</h3></div>
      <div class="start-game-complexity__container">
      <div class="complexity">Выберите сложность игры:</div>
            <div class="complexity__buttons">
                <div class="learnbook__button learnbook__button_selected" data-complexity="0">
                    <div class="learnbook__icon-container">
                        <span>A1</span>
                    </div>
                </div>  
                <div class="learnbook__button" data-complexity="1">
                    <div class="learnbook__icon-container">
                        <span>A2</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="2">
                    <div class="learnbook__icon-container">
                        <span>B1</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="3">
                    <div class="learnbook__icon-container">
                        <span>B2</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="4">
                    <div class="learnbook__icon-container">
                        <span>C1</span>
                    </div>
                </div>
                <div class="learnbook__button" data-complexity="5">
                    <div class="learnbook__icon-container">
                        <span>C2</span>
                    </div>
                </div>
            </div>
        </div>
            <button class="start-game">Начать</button>
    </div>    
    </div>`;
};

