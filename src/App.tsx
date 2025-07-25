import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { TravelProvider } from "./context/TravelContext";
import Expenses from "./pages/Expenses";
import Layout from "./components/Layout";
import TravelDetails from "./pages/TravelDetails";

function App() {
  return (
    <TravelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/travels/:id" element={<TravelDetails />} />
            <Route path="/travels/:id/day/:dayDate" element={<Expenses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TravelProvider>
  );
}

export default App;
