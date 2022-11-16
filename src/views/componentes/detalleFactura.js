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
import { aprobarImagen, rechazarImagen } from "../../redux/facturas/actions";
import { Image } from "@material-ui/icons";

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
        this.hidden = true;
        this.currentFactura = [];
        this.facturaDetalle = null;
        this.imagenesByFactura = null;
        this.currentImagen = [];
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
            .contenedor {
                gap: 0 !important;
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
                padding: 0.3rem;
                align-items: center;
            }
            .detalleFactura {
                background-color: var(--formulario);
                gap: 0 !important;
            }
            .descImagenes {
                box-shadow: var(--shadow-elevation-2-box);
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
                background-color: var(--aplicacion);

                place-self: end;
                padding: 0px;
                gap: 0 !important;
            }
            .documento {
                background-color: var(--primario10);
                color: var(--on-formulario);
                border-style: none;
                font-size: 0.9rem;
                font-weight: bold;
                height: 6vh;
                padding: 0px 25px 0px 25px;
                gap: 0 !important;
                margin-top: 1rem;
            }
            .documento {
                opacity: 0.6;
                transition-property: opacity;
                transition-duration: 1s;
            }
            .documento[tabs]:focus {
                opacity: 100%;
                top: 0;
                left: 100%;
            }
            .opacity {
                background-color: red;
            }
            .imagenDetalle {
                grid-template-columns: 40% 60%;
                color: var(--on-formulario);
            }
            #iframePDF {
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
        `;
    }

    render() {
        return html`
            <div class="contenedor grid body">
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


                    <div class="documentos inner-grid column align-start">                               
                            ${this.imagenesByFactura?.map((item) => {
                                return html` <button tabs class="documento" .item=${item} @click=${this.imagen}>${item.DocumentacionDescripcion}</button>`;
                            })}                      
                    </div>

                <div class="detalleFactura inner-grid columns">
                    <div class="descImagenes">
                        <div class="imagenDetalle inner-grid column">   
                            <div class="detalleList inner-grid row" >                        
                                ${this.facturaDetalle?.map((item) => {
                                    return html`<div .item=${item}>
                                        <div class="inner-grid column">
                                            <label>Expediente:</label>
                                            <div>${item.Expediente}</div>
                                            <label>Troquel:</label>
                                            <div>${item.Troquel}</div>
                                        </div>
                                        <div class="inner-grid column">
                                            <div class="inner-grid row">
                                                <label>PrecioUnitario:</label>
                                                <div>${item.PrecioUnitario}</div>
                                            </div>
                                            <div class="inner-grid row">
                                                <label>Cantidad:</label>
                                                <div>X ${item.Cantidad}</div>
                                            </div>
                                            <div class="inner-grid row">
                                                <label>PrecioTotal:</label>
                                                <div>${item.PrecioTotal}</div>
                                            </div>
                                        </div>
                                        <label>Descripcion:</label>
                                        <div>${item.Descripcion}</div>
                                        <div class="inner-grid column">
                                            <label>GETIN:</label>
                                            <div>${item.GTIN}</div>
                                        </div>
                                    </div> `;
                                })}
                            </div> 

                            <div class="iframe grid row ">
                                <iframe  id="iframePDF"  type="application/pdf" src="${this.currentImagen}"></iframe>
                            </div>

                      
                        </div>
                    

                        <div class="botonera grid columns">
                            
                            <div class="observaciones grid row">
                                <div class="select" >
                                    <label>Seleccion Motivo de rechazo: </label>
                                    <select id="select" >
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    ${this.motivosRechazoImagenes?.map((item) => {
                                        return html`<option .value=${item.Id}>${item.Descripcion}</option> `;
                                    })}
                                    </select>
                                </div >
                                <div class="textarea">
                                    <label>Observaciones del rechazo : </label>
                                    <textarea  id="comentarios" @change="${this.observacionesChange}" .value="${this.observaciones}"></textarea>
                                </div>
                            </div>
                            <div class="botones grid columns">
                                    <button  raised id="aprobar" @click=${this.aprobar}>Aprobar</button>
                                    <button link id="rechazar" @click=${this.rechazar}>Rechazar</button>
                            </div>
                            
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
                this.imagen;
            }
            this.update();
        }

        this.currentImagen = null;

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
            this.currentImagen = this.imagenesByFactura[0].UrlNom;
            this.update();
        }

        if (name == MOTIVO_RECHAZO) {
            this.motivosRechazoImagenes = state.facturas.motivosRechazo.value;
            this.update();
        }
    }

    atras(e) {
        store.dispatch(goTo(e.currentTarget.option));

        this.update();
    }

    imagen(e) {
        this.currentImagen = e.currentTarget.item.UrlNom;
    }

    aprobar(e) {
        let imagen = this.imagenesByFactura.filter((item) => {
            if (item.UrlNom == this.currentImagen) return item.IdImagen;
        });

        console.log(imagen);

        const imagenAAprobar = {
            Params: {
                IdFactura: imagen[0].IdFacturaCabecera,
                IdImagen: imagen[0].IdImagen,
            },
        };

        store.dispatch(aprobarImagen(imagenAAprobar));
    }

    rechazar(e) {
        let imagen = this.imagenesByFactura.filter((item) => {
            if (item.UrlNom == this.currentImagen) return item.IdImagen;
        });

        const imagenARechazar = {
            IdFactura: imagen[0].IdFacturaCabecera,
            IdImagen: imagen[0].IdImagen,
            IdMotivoRechazo: this.shadowRoot.querySelector("#select").value,
            Comentario: this.shadowRoot.querySelector("#comentarios").value,
        };

        store.dispatch(rechazarImagen(imagenARechazar));
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
