import { BrowserRouter, Route, Routes } from "react-router";
import SignInForm from "./pages/sign-in";
import SignUpForm from "./pages/sign-up";
// import Header from "./components/common/Header";
import Home from "./pages/home";
import UserRegistrationForm from "./pages/userform";
import Dashboard from "./pages/admin-dashboard";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<UserRegistrationForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
