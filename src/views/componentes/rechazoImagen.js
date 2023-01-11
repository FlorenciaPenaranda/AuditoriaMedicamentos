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
const IMAGENES_BY_FACTURA = "facturas.imagenesByFacturatimeStamp";
const SELECCIONAR_IMAGEN = "facturas.currentImagentimeStamp";
const MOTIVO_RECHAZO = "facturas.motivoRechazoTimeStamp";
const RECHAZAR_IMAGEN_SUCCESS = "facturas.rechazarImagenTimeStamp";
const SHOW_RECHAZAR_IMAGEN = "ui.showRechazarImagenTimeStamp";
const HIDE_RECHAZAR_IMAGEN = "ui.hideRechazarImagenTimeStamp";

export class rechazoImagen extends connect(
    store,
    MEDIA_CHANGE,
    SCREEN,
    IMAGENES_BY_FACTURA,
    SELECCIONAR_IMAGEN,
    MOTIVO_RECHAZO,
    RECHAZAR_IMAGEN_SUCCESS,
    SHOW_RECHAZAR_IMAGEN,
    HIDE_RECHAZAR_IMAGEN
)(LitElement) {
    constructor() {
        super();
        this.area = "body";

        this.imagenesByFactura = null;
        this.currentImagen = [];
        this.imagenUrl = null;
        this.observaciones = "";
        this.motivosRechazoImagenes = null;
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${select}
            ${button}
            ${gridLayout}
            :host {
                position: fixed;
                top: 0;
                left: 0;
                backdrop-filter: blur(30px);
                z-index: 1000;
                display: grid;
                align-content: start;
                overflow-x: auto;
                height: 100vh;
                width: 100vw;
                /top: 0;
                left: 0;
                justify-self: center;
            }
            .observaciones {
                position: relative;
                z-index: 1000;
                display: grid;
                align-content: start;
                overflow-x: auto;
                background-color: var(--formulario);
                height: 100%;
                width: 69%;
                justify-self: center;
                transform: translate(0%, 90%);
                border-radius: 10px;
            }
            :host([hidden]) {
                display: none;
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
            .close {
                justify-self: self-end;
            }
            #rechazar {
                width: 15%;
            }
            .botones {
                place-items: center;
            }
        `;
    }

    render() {
        return html`
            <div class="observaciones grid row">
                <div class="close grid" @click=${this.comeBack}>${CLOSE}</div>
                <div class="select">
                    <label>Seleccion Motivo de rechazo: </label>
                    <select id="select">
                        <option value="" disabled selected>Selecciona una opción</option>
                        ${this.motivosRechazoImagenes?.map((item) => {
                            return html`<option .value=${item.Id}>${item.Descripcion}</option> `;
                        })}
                    </select>
                </div>
                <div class="textarea">
                    <label>Observaciones del rechazo : </label>
                    <textarea id="comentarios" @change="${this.observacionesChange}" .value="${this.observaciones}"></textarea>
                </div>
                <div class="botones grid columns">
                    <button raised id="rechazar" @click=${this.rechazar}>Rechazar</button>
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
            const isCurrentScreen = ["rechazoImagen"].includes(state.screen.name);
            //if (isInLayout(state, this.area) && isCurrentScreen) {            }
            //this.shadowRoot.querySelector("#select").value = "";
            //this.shadowRoot.querySelector("#comentarios").value = "";
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

        if (name == MOTIVO_RECHAZO) {
            this.motivosRechazoImagenes = state.facturas.motivosRechazo.value;
            this.update();
        }

        if (name == RECHAZAR_IMAGEN_SUCCESS) {
            this.hidden = true;

            this.update();
        }

        if (name == SHOW_RECHAZAR_IMAGEN) {
            this.hidden = false;

            this.update();
        }
    }

    comeBack() {
        this.hidden = true;

        this.update();
    }

    rechazar(e) {
        let imagen = this.imagenesByFactura.filter((item) => {
            if (item.UrlNom == this.imagenUrl) return item.IdImagen;
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
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }
}
window.customElements.define("rechazo-imagen", rechazoImagen);
