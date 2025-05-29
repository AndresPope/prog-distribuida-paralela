import { Route, Routes } from "react-router";
import { MedicinesList } from "./pages";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./gql";
import { XMLReport } from "./pages/xml-report.tsx";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path={"/"} element={<MedicinesList />} />
          <Route path={"/xml"} element={<XMLReport />} />
        </Routes>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
