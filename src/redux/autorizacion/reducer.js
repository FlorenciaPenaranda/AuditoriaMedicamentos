/** @format */

import { AUTORIZACION, AUTORIZACION_SUCCESS, AUTORIZACION_ERROR, ACCEPT_SUCCESS, ACCEPT_ERROR } from "./actions";

const initialState = {
    entities: null,
    tokenAutentication: null,
    timeStamp: null,
    errorTimeStamp: null,
    acceptTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case AUTORIZACION:
            newState.tokenAutentication = action.token;
            break;
        case AUTORIZACION_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case AUTORIZACION_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ACCEPT_SUCCESS:
            newState.acceptTimeStamp = new Date().getTime();
            break;
        case AUTORIZACION_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
