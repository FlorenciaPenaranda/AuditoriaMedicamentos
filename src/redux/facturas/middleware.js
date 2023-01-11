import { facturasCabeceraPendientesFetch, facturaDetalleByIdFetch, ImagenesByFacturaFetch, aprobarImagenFetch, rechazarImagenFetch, MotivosRechazoFetch } from "../fetchs.js";
import {
    GET_FACTURAS_PENDIENTES,
    GET_FACTURAS_PENDIENTES_SUCCESS,
    GET_FACTURAS_PENDIENTES_ERROR,
    GET_FACTURAS_DETALLE,
    GET_FACTURAS_DETALLE_SUCCESS,
    GET_FACTURAS_DETALLE_ERROR,
    GET_IMAGENES_BY_FACTURA,
    GET_IMAGENES_BY_FACTURA_SUCCESS,
    GET_IMAGENES_BY_FACTURA_ERROR,
    APROBAR_IMAGEN,
    APROBAR_IMAGEN_SUCCESS,
    APROBAR_IMAGEN_ERROR,
    RECHAZAR_IMAGEN,
    RECHAZAR_IMAGEN_SUCCESS,
    RECHAZAR_IMAGEN_ERROR,
    MOTIVO_RECHAZO,
    MOTIVO_RECHAZO_SUCCESS,
    MOTIVO_RECHAZO_ERROR,
    aprobarImagen,
} from "./actions";
import { apiRequest } from "../api/actions";
import { goTo } from "../routing/actions.js";
import { RESTAdd, RESTRequest } from "../rest/actions.js";
import { imagenesByFactura as getImagenesByFactura } from "./actions";
import { showAlert } from "../ui/actions.js";

export const getFacturasPendientes =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_PENDIENTES) {
            dispatch(
                RESTRequest(
                    facturasCabeceraPendientesFetch,
                    "?FacturasEstado=" + 1 + "&FechaDesde=" + "" + "&FechaHasta=" + "" + "&Comprobante=" + "" + "&Prestador=" + "",
                    GET_FACTURAS_PENDIENTES_SUCCESS,
                    GET_FACTURAS_PENDIENTES_ERROR,
                    ""
                )
            );
            //dispatch({ type: GET_SUCCESS });
        }
    };
//?FacturasEstado=2&FechaDesde=2022-01-01&FechaHasta=2022-08-01&Comprobante='00053A00011283'&Prestador=6914
export const getFacturaDetalle =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_FACTURAS_DETALLE) {
            dispatch(RESTRequest(facturaDetalleByIdFetch, "?idFactura=" + action.id, GET_FACTURAS_DETALLE_SUCCESS, GET_FACTURAS_DETALLE_ERROR, ""));
            //dispatch({ type: GET_SUCCESS });
        }
    };

export const imagenesByFactura =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_IMAGENES_BY_FACTURA) {
            dispatch(RESTRequest(ImagenesByFacturaFetch, "?idFactura=" + action.idFactura, GET_IMAGENES_BY_FACTURA_SUCCESS, GET_IMAGENES_BY_FACTURA_ERROR, ""));
            //dispatch({ type: GET_SUCCESS });
        }
    };

export const aprobarImagenByFactura =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);

        //body[action.name] = action.value;
        if (action.type === APROBAR_IMAGEN) {
            dispatch(RESTAdd(aprobarImagenFetch, action.item, APROBAR_IMAGEN_SUCCESS, APROBAR_IMAGEN_ERROR, "", ""));
        }
    };

export const aprobarImagenByFacturaSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === APROBAR_IMAGEN_SUCCESS) {
            dispatch(getImagenesByFactura(getState().facturas.currentSelection.Id));
            dispatch(showAlert("", "La factura fue aprobada correctamente"));
        }
    };

export const rechazarImagenByFactura =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        const body = {
            Params: action.item,
        };

        if (action.type === RECHAZAR_IMAGEN) {
            dispatch(RESTAdd(rechazarImagenFetch, body, RECHAZAR_IMAGEN_SUCCESS, RECHAZAR_IMAGEN_ERROR, "", ""));
        }
    };

export const rechazarImagenByFacturaSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === RECHAZAR_IMAGEN_SUCCESS) {
            dispatch(getImagenesByFactura(getState().facturas.currentSelection.Id));
            dispatch(showAlert("", "La factura fue rechazada correctamente"));
        }
    };

export const motivoRechazo =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === MOTIVO_RECHAZO) {
            dispatch(RESTRequest(MotivosRechazoFetch, "", MOTIVO_RECHAZO_SUCCESS, MOTIVO_RECHAZO_ERROR, ""));
            //dispatch({ type: GET_SUCCESS });
        }
    };
export const middleware = [
    getFacturasPendientes,
    getFacturaDetalle,
    imagenesByFactura,
    aprobarImagenByFactura,
    aprobarImagenByFacturaSuccess,
    rechazarImagenByFactura,
    rechazarImagenByFacturaSuccess,
    motivoRechazo,
];
