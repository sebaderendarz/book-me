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
import BarberLandingPage from "./pages/TestPrivatePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TestPrivatePage from "./pages/TestPrivatePage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Navigate to="/customer" />} />
            <Route element={<CustomerLandingPage />} path="/customer" />
            <Route element={<BarberLandingPage />} path="/hairdresser" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignUpPage />} path="/register" />
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
