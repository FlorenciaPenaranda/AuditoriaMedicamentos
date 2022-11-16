/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiExpedientes = SERVICE_URL;
let webApiMedicamentos = SERVICE_URL + "/Medicamentos";

const expedienteOdataFactory = ODataFetchFactory({
    fetch: fetch,
    domain: webApiExpedientes,
});

export const autorizacionFetch = fetchFactory(webApiMedicamentos, "Autorizacion");

export const facturasCabeceraPendientesFetch = fetchFactory(webApiMedicamentos, "getFacturasCabecera");
export const facturaDetalleByIdFetch = fetchFactory(webApiMedicamentos, "getFacturaDetalleById");
export const ImagenesByFacturaFetch = fetchFactory(webApiMedicamentos, "getImagenesByFactura");

export const aprobarImagenFetch = fetchFactory(webApiMedicamentos, "AprobarImagen");
export const rechazarImagenFetch = fetchFactory(webApiMedicamentos, "RechazarImagen");

export const MotivosRechazoFetch = fetchFactory(webApiMedicamentos, "motivosRechazoImagenes");
