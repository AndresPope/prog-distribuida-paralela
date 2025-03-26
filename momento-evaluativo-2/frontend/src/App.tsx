import { Route, Routes } from "react-router";
import { Layout } from "./components/layout.tsx";
import { OwnersList } from "./pages";
import { InfractionsList } from "./pages/infractions.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VehiclesList } from "./pages/vehicles.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<OwnersList />} />
          <Route path={"/infractions"} element={<InfractionsList />} />
          <Route path={"/vehicles"} element={<VehiclesList />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
