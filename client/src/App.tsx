import { BrowserRouter, Route, Routes } from "react-router";
import SignInForm from "./pages/sign-in";
import SignUpForm from "./pages/sign-up";
// import Header from "./components/common/Header";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        {/* <Route path="/" element={<SignInForm />}></Route> */}
        {/* <Route path="*" element={<SignInForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
