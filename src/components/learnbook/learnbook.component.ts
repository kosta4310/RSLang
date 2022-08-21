import './learnbook.style.scss'

export class LearnBook {
    render() {
        const template = `
        <div class="learnbook__container">
            <div class="games__container">
                <span class="title">Игры</span>
                <div class="games_buttons">
                    <div class="learnbook__button pr10">
                        <div class="learnbook__icon-container mr10">
                            <img class="learnbook__icon" src="./assets/learnbook/sound.svg" alt="" class="src">
                        </div>
                        <span>Аудио</span>
                    </div>  
                    <div class="learnbook__button pr10">
                        <div class="learnbook__icon-container mr10">
                            <img class="learnbook__icon" src="./assets/learnbook/timer.svg" alt="" class="src">
                        </div>
                        <span>Спринт</span>
                    </div>
                </div>
            </div>
            <div class="complexity__container">
                <span class="title">Сложность</span>
                <div class="complexity__buttons">
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>A1</span>
                        </div>
                    </div>  
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>A2</span>
                        </div>
                    </div>
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>B1</span>
                        </div>
                    </div>
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>B2</span>
                        </div>
                    </div>
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>C1</span>
                        </div>
                    </div>
                    <div class="learnbook__button">
                        <div class="learnbook__icon-container">
                            <span>C2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        document.body.insertAdjacentHTML('beforeend', template);
        this.listen();
    }

    listen() {
        // (<HTMLElement>document.querySelector('.links-btn')).addEventListener('click', (event) => {
        //     const target = event?.target as HTMLElement;
        //     if (target.classList.contains('links-btn__signUp')) {
        //         (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.remove('active-link');
        //         (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.add('active-link');
        //         (<HTMLElement>document.querySelector('.signIn-container')).classList.add('form-signIn-left');
        //         (<HTMLElement>document.querySelector('.signUp-container')).classList.add('form-signUp-left');

        //         console.log(1);
        //     }
        //     if (target.classList.contains('links-btn__signIn')) {
        //         (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.remove('active-link');
        //         (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.add('active-link');
        //         (<HTMLElement>document.querySelector('.signIn-container')).classList.remove('form-signIn-left');
        //         (<HTMLElement>document.querySelector('.signUp-container')).classList.remove('form-signUp-left');
        //     }
        //     console.log(target);
        // });
    }
}
