import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useTravelContext } from "../context/TravelContext";
import Spinner from "./Spinner";

const Layout: React.FC = () => {
  const location = useLocation();
  const { isLoaded } = useTravelContext();

  const showFooterUrl = "/travels";

  const shouldShowFooter = location.pathname.includes(showFooterUrl);
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Spinner />
        <p className="mt-4 text-gray-500">{"Cargando..."}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-400 text-white p-4 flex justify-center">
        <h1 className="text-xl font-bold">TripGet</h1>
      </header>
      <div className="pb-[70px] pt-[60px]">
        <Outlet />
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
