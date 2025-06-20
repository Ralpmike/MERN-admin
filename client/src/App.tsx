import { BrowserRouter, Route, Routes } from "react-router";
import SignInForm from "./pages/sign-in";
import SignUpForm from "./pages/sign-up";
// import Header from "./components/common/Header";
import Home from "./pages/home";
import UserRegistrationForm from "./pages/userform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route index element={<UserRegistrationForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Route>
        {/* <Route path="/" element={<SignInForm />}></Route> */}
        {/* <Route path="*" element={<SignInForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
