import {
    GET_FACTURAS_PENDIENTES,
    GET_FACTURAS_PENDIENTES_SUCCESS,
    GET_FACTURAS_PENDIENTES_ERROR,
    GET_FACTURAS_DETALLE_SUCCESS,
    GET_FACTURAS_DETALLE_ERROR,
    GET_IMAGENES_BY_FACTURA_SUCCESS,
    GET_IMAGENES_BY_FACTURA_ERROR,
    CURRENT_FACTURA,
    APROBAR_IMAGEN_SUCCESS,
    APROBAR_IMAGEN_ERROR,
    RECHAZAR_IMAGEN_SUCCESS,
    RECHAZAR_IMAGEN_ERROR,
    MOTIVO_RECHAZO_SUCCESS,
    MOTIVO_RECHAZO_ERROR,
} from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    errorTimeStamp: null,
    currentSelection: null,
    currentSelectiontimeStamp: null,
    currentSelectionerrorTimeStamp: null,
    facturaDetalle: null,
    facturaDetalletimeStamp: null,
    errorFacturaDetalleTimeStamp: null,
    imagenesByFactura: [],
    imagenesByFacturaTimeStamp: null,
    errorImagenesByFacturaTimeStamp: null,
    aprobarImagenTimeStamp: null,
    rechazarImagenTimeStamp: null,
    motivosRechazo: null,
    motivoRechazoTimeStamp: null,
    errorMotivoRechazoTimeStamp: null,
};

export const reducer = (state = initialState, action, e) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_FACTURAS_PENDIENTES:
            // newState.entities = action.payload.receive;
            break;
        case GET_FACTURAS_PENDIENTES_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_PENDIENTES_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_DETALLE_SUCCESS:
            newState.facturaDetalle = action.payload.receive;
            newState.facturaDetalletimeStamp = new Date().getTime();
            break;
        case GET_FACTURAS_DETALLE_ERROR:
            newState.errorFacturaDetalleTimeStamp = new Date().getTime();
            break;
        case CURRENT_FACTURA:
            newState.currentSelection = action.item;
            newState.currentSelectiontimeStamp = new Date().getTime();
            break;
        case GET_IMAGENES_BY_FACTURA_SUCCESS:
            newState.imagenesByFactura = action.payload.receive.value;
            newState.imagenesByFacturatimeStamp = new Date().getTime();
            break;
        case GET_IMAGENES_BY_FACTURA_ERROR:
            newState.errorImagenesByFacturaTimeStamp = new Date().getTime();
            break;
        case APROBAR_IMAGEN_SUCCESS:
            newState.aprobarImagenTimeStamp = new Date().getTime();
            break;
        case RECHAZAR_IMAGEN_SUCCESS:
            newState.rechazarImagenTimeStamp = new Date().getTime();
            break;
        case MOTIVO_RECHAZO_SUCCESS:
            newState.motivosRechazo = action.payload.receive;
            newState.motivoRechazoTimeStamp = new Date().getTime();
            break;
        case MOTIVO_RECHAZO_ERROR:
            newState.errorMotivoRechazoTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
