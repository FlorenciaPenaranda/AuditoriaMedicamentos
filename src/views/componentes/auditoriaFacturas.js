/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { goTo } from "../../redux/routing/actions";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { SEARCH, PERSON, COPY } from "../../../assets/icons/svgs";

import { currentFactura, getFacturaDetalle, getImagenesByFactura, MotivosRechazo } from "../../redux/facturas/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURAS_PENDIENTES = "facturas.timeStamp";
const FACTURA_DETALLE = "facturas.facturaDetalletimeStamp";

export class auditoriaFacturas extends connect(store, MEDIA_CHANGE, SCREEN, FACTURAS_PENDIENTES, FACTURA_DETALLE)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.items = [];
        this.facturaDetalle = null;
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            :host {
                display: grid;
                padding: 1rem;
                background-color: var(--aplicacion);
            }
            :host([hidden]) {
                display: none;
            }
            .contenedor {
                background-color: var(--formulario);
                box-shadow: var(--shadow-elevation-2-box);
                align-content: start;
            }
            .cabecera {
                justify-content: space-between;
            }
            .columnas {
                grid-template-columns: 0.3fr 1fr 2fr 1.5fr 1fr 2fr 1fr 2fr 1fr;
                color: var(--on-formulario);
                fill: var(--on-formulario);
                stroke: var(--on-formulario);
                font-size: 0.9rem;
                font-weight: bold;
                border-bottom: 2px solid var(--primario);
            }
            label {
                font-family: "Nunito", sans-serif;
                color: var(--on-formulario);
                font-size: 0.8rem;
                justify-content: end;
            }
            svg {
                height: 1.3rem;
                width: 1.3rem;
                align-content: center;
                fill: var(--on-formulario);
                stroke: var(--on-formulario);
            }
            .registrosList {
                grid-template-columns: 0.3fr 1fr 2fr 1.5fr 1fr 2fr 1fr 2fr 1fr;
                color: var(--on-formulario);
                fill: var(--on-formulario);
                stroke: var(--on-formulario);

                font-size: 0.8rem;
                cursor: pointer;
                border-bottom: 1px solid var(--on-formulario-separador);
            }
            .lista {
                overflow-y: auto;
                height: 68vh;
            }
            .lista::-webkit-scrollbar {
                width: 7px;
            }
            .lista::-webkit-scrollbar-thumb {
                background-color: var(--primario);
                border-radius: 20px;
            }
        `;
    }

    render() {
        return html` <div class="contenedor grid row">
            <div class="cabecera grid column">
                <button flat .option=${"filtrosFacturas"} @click=${this.filtrosFactura}>${SEARCH}</button>
                <label>${COPY} Cantidad:</label>
            </div>

            <div class="grid row">
                <div class="columnas inner-grid column">
                    <div>${PERSON}</div>
                    <div>Fecha</div>
                    <div>Tipo Comprobante</div>
                    <div>Punto de Venta</div>
                    <div>Letra</div>
                    <div>Número de Comprobante</div>
                    <div>Prestador</div>
                    <div>Prestador Nombre</div>
                    <div>Importe</div>
                </div>

                <div class="lista inner-grid ">
                    ${this.items?.map((item) => {
                        return html`<div class="registrosList grid column " @click=${this.click} .item=${item} .option=${"detalleFactura"}>
                            <div></div>
                            <div>${new Date(item.FechaComprobante).toLocaleDateString()}</div>
                            <div>${item.TipoComprobante}</div>
                            <div>${item.PuntoVenta}</div>
                            <div>${item.TipoDocumento}</div>
                            <div>${item.NumeroComprobante}</div>
                            <div>${item.Prestador}</div>
                            <div>${item.Nombre}</div>
                            <div>${item.ImporteTotalFactura}</div>
                        </div> `;
                    })}
                </div>
            </div>
        </div>`;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["auditoriaFacturas"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == FACTURAS_PENDIENTES) {
            this.items = state.facturas.entities.value;
        }

        if (name == FACTURA_DETALLE) {
            this.facturaDetalle = state.facturas.facturaDetalle;
        }

        this.currentValueImagen = -1;
    }

    click(e) {
        this.hidden = false;
        store.dispatch(goTo(e.currentTarget.option));
        store.dispatch(currentFactura(e.currentTarget.item));
        store.dispatch(getFacturaDetalle(e.currentTarget.item.Id));
        store.dispatch(getImagenesByFactura(e.currentTarget.item.Id));
        store.dispatch(MotivosRechazo());
    }

    filtrosFactura(e) {
        //store.dispatch(goTo(e.currentTarget.option));
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            items: {
                type: Array,
                state: true,
            },
            facturaDetalle: {
                type: Object,
                state: true,
            },
        };
    }
}
window.customElements.define("auditoria-facturas", auditoriaFacturas);
