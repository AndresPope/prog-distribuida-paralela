import { Route, Routes } from "react-router";
import { Layout } from "./components/layout.tsx";
import { MedicinesList } from "./pages";
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
            <Route path={"/"} element={<MedicinesList />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
