import { ControlPanel } from "./controlpanel.component";
import { Pagination } from "./pagination.component";

const controlPanel = new ControlPanel()
const pagination = new Pagination(350)

export const templateInitPage = `
<div class="wrapper-book">
        <div class="container">
            <div class="book">
                ${controlPanel.render()}
                <div id="words" class="card-words">
                </div>
                ${pagination.render()}
            </div>
        </div>
    </div>`;
