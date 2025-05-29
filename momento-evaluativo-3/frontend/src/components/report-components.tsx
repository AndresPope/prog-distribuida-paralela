import { Card, Paper, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

export const XMLContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(3),
  fontFamily: "Monaco, Menlo, \"Ubuntu Mono\", monospace",
  fontSize: "14px",
  lineHeight: 1.5,
  overflow: "auto",
  maxHeight: "500px",
  border: `1px solid ${theme.palette.divider}`,
}));

export const StatCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  height: "100%",
}));