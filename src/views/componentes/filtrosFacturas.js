/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";

import { SEARCH } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

//const SETFILTRO = "filtro.timeStamp"

export class filtrosFacturas extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.tipoComprobantes = [];
        this.periodos = [];
        this.estados = [];
        this.periodoActual = null;
        this.open = false;
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            ${input}
            ${select}
            :host {
                overflow-y: auto;
            }

            :host([hidden]) {
                display: none;
            }

            h1,
            h2,
            h3,
            h4 {
                margin: 0;
            }

            .oculto {
                display: none !important;
            }

            .tarjeta {
                padding: 0.5rem;
                background-color: white;
                box-shadow: var(--shadow-elevation-2-box);
            }
            .sublabel {
                color: var(--color-azul-oscuro);
                font-size: 0.8rem;
            }
            .primaryColor {
                color: var(--primary-color);
            }
            .primaryColorInvert {
                color: white;
                background-color: var(--primary-color);
                padding: 0.3rem;
                border-radius: 4px;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `;
    }
    render() {
        return html`
            <div class="grid fit" style="grid-gap:0">
                <div class="grid column">
                    <button btn3 @click="${this.limpiar}">Limpiar Filtros</button>
                    <button btn1 @click="${this.buscar}">Buscar</button>
                    <button btn1 @click="${this.cerrar}">Cerrar</button>
                </div>

                <div class="input">
                    <label>Orden</label>
                    <input type="number" id="orden" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>DNI</label>
                    <input type="number" id="hiscli" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>Expte</label>
                    <input type="number" id="expediente" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="select">
                    <label>Período</label>
                    <select id="periodo">
                        <option value="-1">Cualquier Período</option>
                        ${this.periodos.map((c) => {
                            return html`<option value="${c}">${c}</option>`;
                        })}
                    </select>
                </div>

                <div class="input">
                    <label>CUIT</label>
                    <input type="number" id="cuit" autocomplete="off" maxlength="11" @input=${this.maxLength} />
                </div>

                <div class="select">
                    <label>Tipo</label>
                    <select id="tipo">
                        <option value="-1" selected>Todos</option>
                        ${this.tipoComprobantes.map((c) => {
                            return html`<option value="${c.Id}">${c.Nombre}</option>`;
                        })}
                    </select>
                </div>
                <div class="input">
                    <label>Punto de venta</label>
                    <input type="number" id="sucursal" autocomplete="off" maxlength="4" @input=${this.maxLength} />
                </div>
                <div class="input">
                    <label>Número</label>
                    <input type="number" id="numero" autocomplete="off" maxlength="8" @input=${this.maxLength} />
                </div>
                <div class="select">
                    <label>Estados</label>
                    <select id="estados" ?disabled=${this.estado != 0 && this.estado != -1}>
                        <option value="-1">Todos</option>
                        ${this.estados.map((c) => {
                            return html`<option value="${c.Id}" ?selected=${c.Id == this.estado}>${c.Descripcion}</option>`;
                        })}
                    </select>
                </div>
                <div class="select">
                    <label>Integracion</label>
                    <select id="esIntegracion">
                        <option value="-1">Todos</option>
                        <option selected value="4">Integración</option>
                        <option value="22">No Integración</option>
                    </select>
                </div>
            </div>
        `;
    }

    cerrar() {
        this.isOpen = false;
        this.update();
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["filtrosFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
                const estados = this.shadowRoot.querySelector("#estados");
            }
            this.update();
        }
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String,
            },
            estado: {
                type: Number,
                reflect: true,
                value: 0,
            },
            isOpen: {
                type: Boolean,
                reflect: true,
                value: false,
            },
        };
    }
}
window.customElements.define("filtros-facturas", filtrosFacturas);
