import { Route, Routes } from "react-router";
import { Layout } from "./components/layout.tsx";
import { OwnersList } from "./pages";
import { InfractionsList } from "./pages/infractions.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { VehiclesList } from "./pages/vehicles.tsx";
import { queryClient } from "./api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<OwnersList />} />
            <Route path={"/infractions"} element={<InfractionsList />} />
            <Route path={"/vehicles"} element={<VehiclesList />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
