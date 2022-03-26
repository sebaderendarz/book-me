import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import NotFoundPage from "./pages/NotFoundPage";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import BarberLandingPage from "./pages/BarberLandingPage";
import TestPrivatePage from "./pages/TestPrivatePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#fdfdfd" }}>
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
            <Route element={<BarberLandingPage />} path="/hairdresser" />
            <Route path="/privpage" element={<PrivateRoute />}>
              <Route exact path="/privpage" element={<TestPrivatePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
