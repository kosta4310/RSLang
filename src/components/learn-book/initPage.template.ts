import { ControlPanel } from "./controlpanel.component";

const controlPanel = new ControlPanel()

export const templateInitPage = `
<div class="wrapper-book">
        <div class="container">
            <div class="book">
                ${controlPanel.render()}
                <div id="words" class="card-words">
                </div>
            </div>
        </div>
    </div>`;
