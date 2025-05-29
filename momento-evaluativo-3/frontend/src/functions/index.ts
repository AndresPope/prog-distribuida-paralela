import { OverridableStringUnion } from "@mui/types";
import { ChipPropsColorOverrides } from "@mui/material";
import { GetMedsStats, TMedsStats } from "../types";
import { format } from "date-fns";

type ChipColors = OverridableStringUnion<
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning",
  ChipPropsColorOverrides
>

export const getKindColor = (kind: string) => {
  const colors: Record<string, ChipColors> = {
    TABLETA: "primary",
    JARABE: "secondary",
    POLVO: "success",
    GOTAS: "warning",
  };

  return colors[kind] || "default";
};

export const generateXML = (stats: TMedsStats) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<reporte_medicamentos>
  <resumen>
    <total_medicamentos>${stats.totalMeds}</total_medicamentos>
    <porcentaje_por_tipo>${stats.percentagePerType}</porcentaje_por_tipo>
  </resumen>
  <medicamentos>
${stats.meds.map(med => `    <medicamento>
      <id>${med.id}</id>
      <nombre>${med.name}</nombre>
      <tipo>${med.kind}</tipo>
      <laboratorio>${med.laboratory}</laboratorio>
      <cantidad>${med.quantity}</cantidad>
      <fecha_expiracion>${format(med.expirationDate, "dd/MM/yyyy")}</fecha_expiracion>
      <fecha_ingreso>${format(med.registrationDate, "dd/MM/yyyy")}</fecha_ingreso>
    </medicamento>`).join("\n")}
  </medicamentos>
</reporte_medicamentos>`;
};

export const downloadXML = (data: GetMedsStats | undefined) => {
  if (data?.getMedicinesStats) {
    const xml = generateXML(data.getMedicinesStats);
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_medicamentos.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
