/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { goTo } from "../../redux/routing/actions";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { CLOSE } from "../../../assets/icons/svgs";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { dialog } from "@brunomon/template-lit/src/views/css/dialog";
import { aprobarImagen, rechazarImagen } from "../../redux/facturas/actions";
import { Image } from "@material-ui/icons";
import { showAlert, showRecahzarImagen } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FACTURA_DETALLE = "facturas.facturaDetalletimeStamp";
const IMAGENES_BY_FACTURA = "facturas.imagenesByFacturatimeStamp";
const SELECCIONAR_IMAGEN = "facturas.currentImagentimeStamp";
const APROBAR_IMAGEN_SUCCESS = "facturas.aprobarImagenTimeStamp";
const RECHAZAR_IMAGEN_SUCCESS = "facturas.rechazarImagenTimeStamp";
const SHOW_AUDITAR_IMAGEN = "ui.showAuditarImagenTimeStamp";
const HIDE_AUDITAR_IMAGEN = "ui.hideAuditarImagenTimeStamp";

export class auditarImagen extends connect(
    store,
    MEDIA_CHANGE,
    SCREEN,
    FACTURA_DETALLE,
    IMAGENES_BY_FACTURA,
    SELECCIONAR_IMAGEN,
    SHOW_AUDITAR_IMAGEN,
    HIDE_AUDITAR_IMAGEN,
    APROBAR_IMAGEN_SUCCESS,
    RECHAZAR_IMAGEN_SUCCESS
)(LitElement) {
    constructor() {
        super();
        //this.area = "body";
        this.currentFactura = [];
        this.facturaDetalle = null;
        this.imagenesByFactura = null;
        this.currentImagen = [];
        this.imagenUrl = null;
        this.observaciones = "";
        this.motivosRechazoImagenes = null;
        this.item = {};
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            :host {
                position: fixed;
                top: 0;
                left: 0;
                backdrop-filter: blur(30px);
                z-index: 1000;
                display: grid;
                align-content: start;
                overflow-x: auto;
                //background-color: var(--formulario);
                height: 100vh;
                width: 100vw;
                /top: 0;
                left: 0;
                justify-self: center;
            }
            .contenedor {
                position: absolute;
                cursor: pointer;
                z-index: 1000;
                display: grid;
                align-content: start;
                background-color: var(--formulario);
                height: 88%;
                width: 98%;
                top: 53%;
                left: 50%;
                justify-self: center;
                transform: translate(-50%, -50%);
                border-radius: 10px;
                overflow-y: auto;
            }

            .contenedor::-webkit-scrollbar {
                width: 7px;
            }
            .contenedor::-webkit-scrollbar-thumb {
                background-color: var(--primario);
                border-radius: 20px;
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
            .contenedor {
                gap: 32px !important;
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
            .detalleMedicamento {
                border: 0.7px solid var(--on-formulario);
                padding: 8px;
            }
            .precioMedicamento {
                border-block: 1px solid var(--on-formulario);
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
            .cabeceraBotones {
                grid-template-columns: 50% 40%;
                justify-content: end;
                padding: 0.8rem;
            }
            .botones {
                justify-items: end;
            }
            .Contenedorbotones {
                grid-template-columns: auto auto auto;
                gap: 0;
                background-color: var(--on-terciario);
                width: 195px;
                place-content: center;
                border-radius: 500px;
            }
            #aprobar,
            #pendiente,
            #rechazar {
                border: none;
                background-color: transparent;
                text-decoration: none;
                outline: none;
                cursor: pointer;
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
                padding: 1rem 4rem;
                border-style: none;
                background-color: var(--formulario);
                color: var(--on-formulario);
                text-align-last: start;
                border-bottom: 1px solid var(--on-formulario-separador);
            }
            .imagenDetalle {
                grid-template-columns: 50% 48%;
                color: var(--on-formulario);
            }
            #iframePDF {
                z-index: 1000;
                border: none;
                height: 35vw;
                width: 100%;
            }
            .detalleDatos {
                //grid-template-rows: 210px 210px;
            }
            .detalleList label {
                font-size: 1.2rem;
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
            embed {
                width: 555px;
                height: 430px;
                border-style: none;
            }
            .close {
                justify-self: self-end;
            }
        `;
    }

    render() {
        return html`<div class="contenedor">
            <div class="cabeceraBotones inner-grid column">
                <div class="botones grid columns">
                    <div class="Contenedorbotones grid columns">
                        <button id="aprobar" @click=${this.aprobar}>Aprobar</button>
                        <button id="pendiente">Pendiente</button>
                        <button id="rechazar" @click=${this.rechazar}>Rechazar</button>
                    </div>
                </div>
                <div class="close grid" @click=${this.comeBack}>${CLOSE}</div>
            </div>
            <div class="contenedor grid body column">
                <div class="imagenDetalle inner-grid column">
                    <div class="iframe grid row ">
                        <embed type="application/pdf" src="${this.imagenUrl}" />
                    </div>

                    <div class="detalleDatos grid row">
                        <div class="detalleList inner-grid row">
                            ${this.facturaDetalle?.map((item) => {
                                return html`<div .item=${item}>
                                    <div class="grid column">
                                        <label>EXPEDIENTE:</label>
                                        <div>${item.Expediente}</div>
                                        <label>TROQUEL:</label>
                                        <div>${item.Troquel}</div>
                                    </div>

                                    <div class="detalleMedicamento">
                                        <div class="grid column">
                                            <label>DESCRIPCIÓN:</label>
                                            <div>${item.Descripcion}</div>
                                        </div>

                                        <div class="precioMedicamento grid column">
                                            <div class="inner-grid row">
                                                <label>PRECIO UNITARIO:</label>
                                                <div>${item.PrecioUnitario}</div>
                                            </div>
                                            <div class="inner-grid row">
                                                <label>CANTIDAD:</label>
                                                <div>X ${item.Cantidad}</div>
                                            </div>
                                            <div class="inner-grid row">
                                                <label>PRECIO TOTAL:</label>
                                                <div>${item.PrecioTotal}</div>
                                            </div>
                                        </div>
                                        <div class="grid column">
                                            <label>GETIN:</label>
                                            <div>${item.GTIN}</div>
                                        </div>
                                    </div>
                                </div> `;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div> `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["auditarImagen"].includes(state.screen.name);
            //if (isInLayout(state, this.area) && isCurrentScreen) {            }
            this.update();
        }

        if (name == FACTURA_DETALLE) {
            this.facturaDetalle = state.facturas.facturaDetalle.value;
            this.update();
        }

        if (name == SELECCIONAR_IMAGEN) {
            this.currentImagen = state.facturas.imagenesByFactura.filter((item) => {
                if (state.facturas.imagenSelected.DocumentacionDescripcion == item.DocumentacionDescripcion) return item;
            });
            this.imagenUrl = this.currentImagen[0].UrlNom;

            this.update();
        }

        if (name == IMAGENES_BY_FACTURA) {
            this.imagenesByFactura = state.facturas.imagenesByFactura;
            this.update();
        }

        if (name == APROBAR_IMAGEN_SUCCESS || name == RECHAZAR_IMAGEN_SUCCESS) {
            this.hidden = true;

            this.update();
        }

        if (name == SHOW_AUDITAR_IMAGEN) {
            this.hidden = false;

            this.update();
        }

        if (name == HIDE_AUDITAR_IMAGEN) {
            this.hidden = true;

            this.update();
        }
    }

    comeBack() {
        this.hidden = true;

        this.update();
    }

    aprobar(e) {
        let imagen = this.imagenesByFactura.filter((item) => {
            if (item.UrlNom == this.imagenUrl) return item.IdImagen;
        });

        const imagenAAprobar = {
            Params: {
                IdFactura: imagen[0].IdFacturaCabecera,
                IdImagen: imagen[0].IdImagen,
            },
        };

        store.dispatch(aprobarImagen(imagenAAprobar));
    }

    rechazar() {
        store.dispatch(showRecahzarImagen());
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
window.customElements.define("auditar-imagen", auditarImagen);
