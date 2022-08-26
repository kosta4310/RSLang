export const SPRINT_TEMPLATE = `
<div class="wrapper">
        <div class="container">
            <div class="sprint">
                <div class="sprint__cancel">
                    <a href="/game-start" class="btn-cancel" data-navigo>
                        <svg class="btn-cancel__svg" width="55" height="55">
                            <use xlink:href="../../assets/svg/icons.svg#cancel"></use>
                        </svg>
                    </a>
                </div>
                <div class="watch">
                    <svg class="watch__svg">
                        <use xlink:href="../../assets/svg/icons.svg#watch"></use>
                    </svg>
                </div>
                <div class="timer">
                    <span class="timer__time"></span>
                    <span>сек</span>
                </div>
                <div class="words">
                    <div class="words__en">immigrant</div>
                    <span>это</span>
                    <div class="words__ru">иммигрант</div>
                </div>
                <div class="sprint__buttons">
                    <button class="btn-yes">да</button>
                    <button class="btn-no">нет</button>
                </div>
            </div>
        </div>
    </div>`;
