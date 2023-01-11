import { css } from "lit-element";

export const iconosEstados = css`
    .iconos-estados[estado="PENDIENTE"] svg {
        color: var(--pending);
        fill: var(--pending);
    }
    .iconos-estados[estado="APROBADA"] svg {
        color: var(--ok);
        fill: var(--ok);
    }
    .iconos-estados[estado="RECHAZADA"] svg {
        color: var(--error);
        fill: var(--error);
    }
    .iconos-estados[estado="EN REVISION DE FKD"] svg {
        color: var(--in-review);
        fill: var(--in-review);
    }
`;
