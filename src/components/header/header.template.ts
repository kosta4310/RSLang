export const templateHeader = `
<div class="wrapper-header">
    <div class="container">
        <div class="header">
            <div class="left">
                <nav>
                    <div id="burger" class="burger">
                        <span class="burger__line"></span>
                    </div>
                    <ul id="menu" class="menu">
                        <li>
                            <a href="/" data-navigo>
                                <img class="learnbook__icon" src="./assets/svg/home.svg" alt="" class="src">
                                <span>Домой</span>
                            </a>
                        </li>
                        <li>
                            <a href="/learnbook" data-navigo>
                                <img class="learnbook__icon" src="./assets/svg/book.svg" alt="" class="src">
                                <span>Учебник</span>
                            </a>
                        </li>
                        <li>
                        <a href="/audio-call" class="audio-call" data-navigo>                       
                                <img class="learnbook__icon" src="./assets/svg/sound.svg" alt="" class="src">
                                <span>Аудиовызов</span>
                            </a>
                            </li>
                        <li>
                            <a href="/sprint" class="sprint" data-navigo>
                                <img class="learnbook__icon" src="./assets/svg/timer.svg" alt="" class="src">
                                <span>Спринт</span>
                            </a>
                        </li>
                        <li>
                            <a href="/statistic" data-navigo>
                                <img class="learnbook__icon" src="./assets/svg/stat.svg" alt="" class="src">
                                <span>Статистика</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="title">
                <a class="logo-link" href="/" data-navigo><h1>RSLang</h1></a>
                </div>
            </div>
            <a href="/auth" class="btn-enter" data-navigo>Войти</a>
        </div>
    </div>
</div>
<div><div class="header__mt"></div></div>
`;
