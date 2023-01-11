/** @format */

import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SET_MEDIA,
    SET_MEDIA_ORIENTATION,
    SELECTION,
    STEP,
    SHOW_ALERT,
    SHOW_CONFIRM,
    LOGUEAR_CON_NUEVO_USUARIO,
    BUSCAR,
    ORDENAR,
    SHOW_AUDITAR_IMAGEN,
    HIDE_AUDITAR_IMAGEN,
    SHOW_RECHAZAR_IMAGEN,
    HIDE_RECHAZAR_IMAGEN,
} from "./actions";

const initialState = {
    spinner: {
        loading: 0,
    },
    error: {
        message: "",
        timestamp: null,
    },
    media: {
        size: "large",
        orientation: "landscape",
        timeStamp: null,
    },
    menu: {
        timeStamp: null,
        option: "",
    },
    alert: {
        timeStamp: null,
        titulo: null,
        mensaje: null,
    },
    confirm: {
        timeStamp: null,
        titulo: null,
        mensaje: null,
        onOk: null,
        onCancel: null,
    },
    loginOk: false,
    steps: {
        step: 1,
    },
    loguearConNuevoUsuarioTimeStamp: null,
    busqueda: {
        texto: null,
        timeStamp: null,
    },
    ordenar: {
        timeStamp: null,
        order: null,
    },
    showAuditarImagenTimeStamp: null,
    hideAuditarImagenTimeStamp: null,
    showRechazarImagenTimeStamp: null,
    hideRechazarImagenTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.spinner.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.spinner.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = action.message;
            break;
        case HIDE_ERROR:
            newState.error.timeStamp = new Date().getTime();
            newState.error.messages = null;
            break;
        case SET_MEDIA:
            newState.media.size = action.size;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SET_MEDIA_ORIENTATION:
            newState.media.orientation = action.orientation;
            newState.media.timeStamp = new Date().getTime();
            break;
        case SELECTION:
            newState.menu.timeStamp = new Date().getTime();
            newState.menu.option = action.option;
            break;
        case SHOW_ALERT:
            newState.alert.timeStamp = new Date().getTime();
            newState.alert.titulo = action.titulo;
            newState.alert.mensaje = action.mensaje;
            break;
        case SHOW_CONFIRM:
            newState.confirm.timeStamp = new Date().getTime();
            newState.confirm.titulo = action.titulo;
            newState.confirm.mensaje = action.mensaje;
            newState.confirm.onOk = action.onOk;
            newState.confirm.onCancel = action.onCancel;
            break;
        case STEP:
            newState.steps.step = action.step;
            break;
        case LOGUEAR_CON_NUEVO_USUARIO:
            newState.loguearConNuevoUsuarioTimeStamp = new Date().getTime();
            break;
        case BUSCAR:
            newState.busqueda.timeStamp = new Date().getTime();
            newState.busqueda.texto = action.texto;
            break;
        case ORDENAR:
            newState.ordenar.timeStamp = new Date().getTime();
            newState.ordenar.order = action.order;
            break;
        case SHOW_AUDITAR_IMAGEN:
            newState.showAuditarImagenTimeStamp = new Date().getTime();
            break;
        case HIDE_AUDITAR_IMAGEN:
            newState.hideAuditarImagenTimeStamp = new Date().getTime();
            break;
        case SHOW_RECHAZAR_IMAGEN:
            newState.showRechazarImagenTimeStamp = new Date().getTime();
            break;
        case HIDE_RECHAZAR_IMAGEN:
            newState.hideRechazarImagenTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
