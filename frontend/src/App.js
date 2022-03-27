import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import BarberLandingPage from "./pages/BarberLandingPage";
import BarberOfferPage from "./pages/BarberOfferPage";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TestPrivatePage from "./pages/TestPrivatePage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#F0F0F0" }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Navigate to="/customer" />} />
            <Route element={<SignInPage />} path="/customer/signin" />
            <Route
              element={<SignUpPage accountType={"CUSTOMER"} />}
              path="/customer/signup"
            />
            <Route element={<CustomerLandingPage />} path="/customer" />
            <Route
              element={<SignUpPage accountType={"BARBER"} />}
              path="/hairdresser/signup"
            />
            <Route
              element={<BarberOfferPage accountType={"CUSTOMER"} />}
              path="/hairdresser/service_offer/:offer_id"
            />
            <Route element={<BarberLandingPage />} path="/hairdresser" />
            <Route path="/privpage" element={<PrivateRoute />}>
              <Route exact path="/privpage" element={<TestPrivatePage />} />
            </Route>
            <Route path="/not_found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
