import { useQuery } from "@apollo/client";
import { GET_STATS } from "../gql";
import { GetMedsStats, TMedsStats } from "../types";
import { format } from "date-fns";
import { LoadingScreen } from "../components/loading.tsx";
import {
  Box,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { StatCard, StyledCard, XMLContainer } from "../components/report-components.tsx";


const getKindColor = (kind: string) => {
  const colors: Record<string, string> = {
    TABLETA: "primary",
    JARABE: "secondary",
    POLVO: "success",
    GOTAS: "warning",
  };
  return colors[kind] || "default";
};

export const XMLReport = () => {
  const { data, loading, error } = useQuery<GetMedsStats>(GET_STATS);

  const generateXML = (stats: TMedsStats) => {
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

  const downloadXML = () => {
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

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  const stats = data?.getMedicinesStats;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <AssessmentIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Reporte de Medicamentos
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadXML}
            sx={{ fontWeight: "bold" }}
          >
            Descargar XML
          </Button>
        </Box>
      </Box>

      {/* Estadísticas Principales */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <StatCard>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h3" component="div" fontWeight="bold" mb={1}>
                {stats?.totalMeds}
              </Typography>
              <Typography variant="h6" component="div">
                Total de Medicamentos
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                Distribución por Tipo
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                {stats?.percentagePerType.split(", ").map((item, index) => {
                  const [tipo, porcentaje] = item.split(": ");
                  return (
                    <Chip
                      key={index}
                      label={`${tipo} ${porcentaje}`}
                      color={getKindColor(tipo)}
                      variant="filled"
                      sx={{ fontWeight: "medium" }}
                    />
                  );
                })}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Visualización del Árbol XML */}
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <CodeIcon color="primary" />
            <Typography variant="h5" component="h2" fontWeight="bold">
              Visualización del Árbol XML
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <XMLContainer elevation={0}>
            <Typography
              component="pre"
              sx={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "text.primary",
              }}
            >
              {generateXML(stats as TMedsStats)}
            </Typography>
          </XMLContainer>
        </CardContent>
      </StyledCard>

    </Box>

  )
    ;
};