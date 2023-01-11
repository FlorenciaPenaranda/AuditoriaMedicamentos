import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { BUSCAR, DELETE } from "../../../assets/icons/svgs";
import { LitElement, html, css } from "lit-element";
import { buscar } from "../../redux/ui/actions";
import { button } from "@brunomon/template-lit/src/views/css/button";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class busquedaComponent extends connect(store, SCREEN)(LitElement) {
    constructor() {
        super();
        this.oculto = true;
    }

    static get properties() {
        return {};
    }

    static get styles() {
        return css`
            ${button}
            /*:host {
            }*/
            :host([hidden]) {
                display: none;
            }
            #busqueda {
                box-sizing: border-box;
                width: 85%;
                padding: 0.5rem;
                background-color: var(--formulario);
                border: 1px solid var(--on-formulario);
                color: var(--on-formulario);
                font-size: var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
                outline: none;
                border-radius: 5px;
                font-family: inherit;
            }
        `;
    }

    render() {
        return html` <input placeholder="Busqueda..." id="busqueda" type="text" @input="${this.click}" /> `;
    }

    stateChanged(state, name) {
        if (state.screen.name == "auditoriaFacturas") {
            this.shadowRoot.querySelector("#busqueda").value = "";
        }
    }

    click(e) {
        let texto = this.shadowRoot.querySelector("#busqueda").value;
        store.dispatch(buscar(texto));
    }
}
window.customElements.define("busqueda-component", busquedaComponent);
