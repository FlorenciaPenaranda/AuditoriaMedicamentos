/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { goTo } from "../../redux/routing/actions";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { PENDING, CHECK, CLOSE, SEARCH } from "../../../assets/icons/svgs";
import { iconosEstados } from "../css/iconosEstados";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { imagenSelected, aprobarImagen, rechazarImagen } from "../../redux/facturas/actions";
import { auditarImagen } from "./auditarImagen";
import { Image, Store } from "@material-ui/icons";
import { showAuditarImagen, SHOW_COMPONENT } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const CURRENT_FACTURA = "facturas.currentSelectiontimeStamp";
const FACTURA_DETALLE = "facturas.facturaDetalletimeStamp";
const IMAGENES_BY_FACTURA = "facturas.imagenesByFacturatimeStamp";
const MOTIVO_RECHAZO = "facturas.motivoRechazoTimeStamp";

export class detalleFactura extends connect(store, MEDIA_CHANGE, SCREEN, CURRENT_FACTURA, FACTURA_DETALLE, IMAGENES_BY_FACTURA, MOTIVO_RECHAZO)(LitElement) {
    constructor() {
        super();
        this.area = "body";

        this.currentFactura = [];
        this.facturaDetalle = null;
        this.imagenesByFactura = null;

        this.svgs = {
            1: { estado: "PENDIENTE", imagen: PENDING },
            2: { estado: "APROBADA", imagen: CHECK },
            3: { estado: "RECHAZADA", imagen: CLOSE },
            4: { estado: "EN REVISION DE FKD", imagen: SEARCH },
        };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            ${iconosEstados}
            :host {
                display: grid;
                align-content: start;
                overflow-x: auto;
                background-color: var(--aplicacion);
            }
            :host([hidden]) {
                display: none;
            }
            :host::-webkit-scrollbar {
                width: 7px;
                border-radius: 20px;
            }
            :host::-webkit-scrollbar-thumb {
                background-color: var(--primario);
            }
            .contenedor,
            .cuerpo {
                gap: 32px !important;
            }
            .cuerpo {
                position: relative;
            }
            .cabeceraFactura {
                display: grid;
                grid-template-areas:
                    "fecha letra comprobante"
                    "prestador letra  ."
                    "nombre tipo  importe  ";
                grid-template-columns: auto auto auto;
                grid-template-rows: auto auto auto auto;
                background-color: var(--formulario);
                color: var(--on-formulario);
                box-shadow: var(--shadow-elevation-2-box);
                font-size: 0.9rem;
                gap: 0;
                z-index: 1;

                align-items: center;
                border-radius: 0.5rem;
                padding: 16px 16px;
            }
            .detalleFactura {
                position: relative;
                background-color: var(--formulario);
                gap: 0 !important;
                border-radius: 0.5rem;
                box-shadow: var(--shadow-elevation-2-box);
            }
            .cabeceraDetalle {
                position: absolute;
                background-color: var(--secundario);
                padding: 1.2rem 6rem;
                border-radius: 8px;
                z-index: 100;
                top: -6%;
                left: 35%;
                color: var(--on-primario);
                font-size: 2vh;
                font-weight: bold;
            }
            .descImagenes {
                padding: 0px 16px 0px 16px;
            }
            .botonera {
                grid-template-columns: 50% 45%;
                justify-content: end;
                padding: 0.8rem;
            }
            .botones {
                grid-template-columns: 28% 28%;
                justify-content: end;
                padding: 0.8rem;
            }
            #fecha {
                grid-area: fecha;
                align-content: center;
            }
            #letra {
                grid-area: letra;
            }
            .let {
                font-weight: bold;
                border: 2px solid;
                font-size: 1rem;
            }
            #comprobante {
                grid-area: comprobante;
            }
            #prestador {
                grid-area: prestador;
            }
            #nombre {
                grid-area: nombre;
            }
            #importe {
                grid-area: importe;
            }
            .etiqueta *:first-child {
                color: var(--dark-separator);
                font-weight: bold;
            }
            .documentos {
                margin: 50px 0px 25px 0px;
            }
            .documento {
                grid-template-columns: 2rem auto;
                padding: 1rem 4rem !important;
                border-style: none;
                background-color: var(--formulario);
                color: var(--on-formulario);
                text-align-last: start;
                border-bottom: 1px solid var(--on-formulario-separador);
                cursor: pointer;
            }
            .boton {
                padding: 0.5rem 1rem;
                border-style: none;
                background-color: var(--formulario);
                color: var(--on-formulario);
                text-align-last: start;
                cursor: pointer;
            }
            .imagenDetalle {
                grid-template-columns: 40% 60%;
                color: var(--on-formulario);
            }
            iframePDF {
                margin: auto;
                width: 55vw;
                height: 100vh;
                border-radius: 20px;
                box-shadow: var(--shadow-elevation-4-box);
                border: none;
            }
            .detalleList label {
                font-size: 1.5rem;
                font-weight: bold;
            }
            .obrservaciones {
                display: grid;
                align-content: baseline;
                gap: 0.5rem;
            }
            .textarea textarea {
                box-sizing: border-box;
                width: 100%;
                padding: 0.5rem;
                color: var(--on-formulario);
                cursor: pointer;
                font-size: var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
                border-radius: var(--control-radius);
                outline: 0px;
                box-shadow: none;
                border: 1px solid var(--on-formulario);
                background-image: none;
                background-color: transparent;
                appearance: initial;
            }
            .textarea label {
                font-size: var(--font-label-size);
                font-weight: var(--font-label-weight);
                color: var(--on-formulario);
            }
            *[hidden] {
                display: none;
            }
            .popup {
                position: absolute;
                left: 0px;
                top: 32%;
                left: 7%;
                border-radius: 10px;
                background-color: var(--on-formulario);
                color: var(--formulario);
                display: none;
                z-index: 1000;
                cursor: pointer;
            }
            #estadoImagen:hover .popup {
                position: relative;
                display: grid;
                color: var(--on-primario);
                font-size: 0.8rem;
                text-align: start;
                padding: 0rem 0rem;
            }
        `;
    }

    render() {
        return html`
            <div class="contenedor grid body">
                <div class="cuerpo grid">
                    <div class="cabeceraFactura grid rows">
                        <div id="fecha" class="etiqueta inner-grid column start ">
                            <label>Fecha:</label>
                            <div>${new Date(this.currentFactura.FechaComprobante).toLocaleDateString()}</div>
                        </div>
                        <div id="letra" class="inner-grid rows center">
                            <div class="let grid center">${this.currentFactura.TipoDocumento}</div>
                            <div class="grid center">${this.currentFactura.TipoComprobante}</div>
                        </div>
                        <div id="comprobante" class="justify-self-end etiqueta inner-grid column">
                            <label>Nro comprobante: </label>
                            <div>${this.currentFactura.PuntoVenta} - ${this.currentFactura.NumeroComprobante}</div>
                        </div>
                        <div id="prestador" class="etiqueta inner-grid column start">
                            <label> Nro Prestador: </label>
                            <div>${this.currentFactura.Prestador}</div>
                        </div>
                        <div id="nombre" class="etiqueta inner-grid column start">
                            <label>Nombre: </label>
                            <div>${this.currentFactura.Nombre}</div>
                        </div>
                        <div id="importe" class="justify-self-end etiqueta inner-grid column">
                            <label>Importe: </label>
                            <div>$${this.currentFactura.ImporteTotalFactura} .-</div>
                        </div>
                    </div>

                    <div class="detalleFactura inner-grid columns">
                        <div class="cabeceraDetalle">IMAGENES DE FACTURA</div>

                        <div class="descImagenes">
                            <div class="documentos inner-grid row align-start">
                                ${this.imagenesByFactura?.map((item) => {
                                    return html` <div class="documento inner-grid column align-start">
                                        <div class="iconos-estados" id="estadoImagen" title=${this.svgs[item.IdImagenesEstado].estado} estado=${this.svgs[item.IdImagenesEstado].estado}>
                                            ${this.svgs[item.IdImagenesEstado].imagen}
                                        </div>
                                        <button tabs class="boton" .item=${item} .option=${"auditarImagen"} @click=${this.seleccionarImagen}>${item.DocumentacionDescripcion}</button>
                                    </div>`;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["detalleFactura"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }

            this.update();
        }

        if (name == CURRENT_FACTURA) {
            this.currentFactura = state.facturas.currentSelection;
            this.update();
        }

        if (name == FACTURA_DETALLE) {
            this.facturaDetalle = state.facturas.facturaDetalle.value;
            this.update();
        }

        if (name == IMAGENES_BY_FACTURA) {
            this.imagenesByFactura = state.facturas.imagenesByFactura;
            this.update();
        }
    }

    atras(e) {
        store.dispatch(goTo(e.currentTarget.option));

        this.update();
    }

    seleccionarImagen(e) {
        store.dispatch(imagenSelected(e.currentTarget.item));
        store.dispatch(showAuditarImagen());

        this.update();
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
            item: {
                type: Object,
                state: true,
            },
            currentFactura: {
                type: Object,
                reflect: true,
            },
            facturaDetalle: {
                type: Object,
                reflect: true,
            },
            imagenesByFactura: {
                type: Object,
                reflect: true,
            },
            currentImagen: {
                type: Object,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("detalle-factura", detalleFactura);
