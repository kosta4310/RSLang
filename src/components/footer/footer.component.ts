import { footer } from "./footer.template";

export class Footer {
   init() {
      document.body.insertAdjacentHTML('beforeend', footer);
   }
}