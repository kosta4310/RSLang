import './mywords.style.scss'

export class MyWords {
    render() {
        const template = `
        <div class="mywords__container">
            <div class="mywords__title">
                <span>Мои слова</span>
            </div>
            <div class="words_buttons">
                <div class="learnbook__button pr10">
                    <div class="learnbook__icon-container mr10">
                        <img class="learnbook__icon" src="./assets/learnbook/learned.svg" alt="" class="src">
                    </div>
                    <span>Изученное</span>
                </div>  
                <div class="learnbook__button pr10">
                    <div class="learnbook__icon-container mr10">
                        <img class="learnbook__icon" src="./assets/learnbook/fire.svg" alt="" class="src">
                    </div>
                    <span>Сложные</span>
                </div>
            </div>
        </div>`;
        return template;
    }

    listen() {
        // do nothing
    }
}
