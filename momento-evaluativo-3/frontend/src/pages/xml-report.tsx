import { useQuery } from "@apollo/client";
import { GET_STATS } from "../gql";
import { GetMedsStats, TMedsStats } from "../types";
import { LoadingScreen } from "../components/loading.tsx";
import {
  Box,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Divider, Stack, IconButton,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  Code as CodeIcon,
  Refresh,
} from "@mui/icons-material";
import { StatCard, StyledCard, XMLContainer } from "../components/report-components.tsx";
import { downloadXML, generateXML, getKindColor } from "../functions";

export const XMLReport = () => {
  const { data, loading, error, refetch } = useQuery<GetMedsStats>(GET_STATS);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const stats = data?.getMedicinesStats;

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <AssessmentIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Reporte de Medicamentos
          </Typography>
        </Box>
        <Stack direction={"row"} gap={1}>
          <IconButton onClick={() => refetch()} color={"primary"} size={"large"}>
            <Refresh />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => downloadXML(data)}
            sx={{ fontWeight: "bold" }}
          >
            Descargar XML
          </Button>
        </Stack>
      </Box>

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
                  const [kind, percentage] = item.split(": ");
                  return (
                    <Chip
                      key={index}
                      label={`${kind} ${percentage}`}
                      color={getKindColor(kind)}
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