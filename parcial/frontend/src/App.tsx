import { Route, Routes } from "react-router";
import { Layout } from "./components/layout.tsx";
import { OwnersList } from "./pages";
import { InfractionsList } from "./pages/infractions.tsx";
import { VehiclesList } from "./pages/vehicles.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./gql";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<OwnersList />} />
            <Route path={"/infractions"} element={<InfractionsList />} />
            <Route path={"/vehicles"} element={<VehiclesList />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
