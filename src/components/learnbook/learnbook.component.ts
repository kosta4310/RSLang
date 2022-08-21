import './learnbook.style.scss'

export class LearnBook {
    render() {
        const template = `<div class="container">
        <div class="auth-wrapper">
        <ul class="links-btn">
            <li class="links-btn__signIn active-link">Вход</li>  
            <li class="links-btn__signUp">Регистрация</li>      
        </ul>
        <div class="signs-container">
        <div class="signIn-container">
            <div class="form-title">Войдите и начните улучшать свой английский прямо сейчас</div>
            <form class="form form-signIn" action="" method="post" name="form">
                <input class="form-styling" type="email" name="username" autocomplete="off" placeholder="email"/>
                <input class="form-styling" type="password" name="password" placeholder="password"/>
                <button type="submit" class="submit-signIn">Войти</button></p>
            </form>
        </div>
        <div class="signUp-container">
            <div class="form-title">Присоединяйся к сообществу</div>
            <form class="form form-signUp" action="" method="post" name="form">
                <input class="form-styling" type="text" name="username" autocomplete="off" placeholder="Name"/>
                <input class="form-styling" type="email" name="username" autocomplete="off" placeholder="email"/>
                <input class="form-styling" type="password" name="password" placeholder="password"/>
                <button type="submit" class="submit-signUp">Регистрация</button></p>
            </form>
        </div>
        </div>
        </div>
        </div>`
        document.body.insertAdjacentHTML('beforeend', template);
        this.listen();
    }

    listen() {
        (<HTMLElement>document.querySelector('.links-btn')).addEventListener('click', (event) => {
            const target = event?.target as HTMLElement;
            if (target.classList.contains('links-btn__signUp')) {
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.add('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.add('form-signUp-left');

                console.log(1);
            }
            if (target.classList.contains('links-btn__signIn')) {
                (<HTMLElement>document.querySelector('.links-btn__signUp')).classList.remove('active-link');
                (<HTMLElement>document.querySelector('.links-btn__signIn')).classList.add('active-link');
                (<HTMLElement>document.querySelector('.signIn-container')).classList.remove('form-signIn-left');
                (<HTMLElement>document.querySelector('.signUp-container')).classList.remove('form-signUp-left');
            }
            console.log(target);
        });
    }
}
