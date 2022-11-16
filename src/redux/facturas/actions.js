export const GET_FACTURAS_PENDIENTES = "[facturas] get facturas pendientes";
export const GET_FACTURAS_PENDIENTES_SUCCESS = "[facturas] get facturas pendiente ssucces";
export const GET_FACTURAS_PENDIENTES_ERROR = "[facturas] get facturas pendientes error";

export const GET_FACTURAS_DETALLE = "[facturas] get facturas detalle";
export const GET_FACTURAS_DETALLE_SUCCESS = "[facturas] get facturas detalle ssucces";
export const GET_FACTURAS_DETALLE_ERROR = "[facturas] get facturas detalle error";

export const GET_IMAGENES_BY_FACTURA = "[facturas] get imagenes by factura";
export const GET_IMAGENES_BY_FACTURA_SUCCESS = "[facturas] get imagenes by factura ssucces";
export const GET_IMAGENES_BY_FACTURA_ERROR = "[facturas] get imagenes by factura error";

export const APROBAR_IMAGEN = "[facturas] aprobar by factura";
export const APROBAR_IMAGEN_SUCCESS = "[facturas] aprobar by factura ssucces";
export const APROBAR_IMAGEN_ERROR = "[facturas] aprobar by factura error";

export const RECHAZAR_IMAGEN = "[facturas] rechazar by factura";
export const RECHAZAR_IMAGEN_SUCCESS = "[facturas] rechazar by factura ssucces";
export const RECHAZAR_IMAGEN_ERROR = "[facturas] rechazar by factura error";

export const CURRENT_FACTURA = "[facturas] Current factura";

export const MOTIVO_RECHAZO = "[facturas] motivo rechazo by factura";
export const MOTIVO_RECHAZO_SUCCESS = "[facturas] motivo rechazo by factura ssucces";
export const MOTIVO_RECHAZO_ERROR = "[facturas] motivo rechazo by factura error";

export const getFacturasPendientes = (item) => ({
    type: GET_FACTURAS_PENDIENTES,
    item: item,
});
export const getFacturaDetalle = (id) => ({
    type: GET_FACTURAS_DETALLE,
    id: id,
});

export const getImagenesByFactura = (idFactura) => ({
    type: GET_IMAGENES_BY_FACTURA,
    idFactura: idFactura,
});

export const currentFactura = (item) => ({
    type: CURRENT_FACTURA,
    item: item,
});

export const aprobarImagen = (item) => ({
    type: APROBAR_IMAGEN,
    item: item,
});

export const rechazarImagen = (item) => ({
    type: RECHAZAR_IMAGEN,
    item: item,
});

export const MotivosRechazo = () => ({
    type: MOTIVO_RECHAZO,
});
