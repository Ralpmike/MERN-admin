import Header from "@/components/common/Header";
// import UserRegistrationForm from "./userform";
import { Outlet } from "react-router";
// import BootcampRegistrationForm from "./bootcamp-registration-form"

function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full py-6">
        <Outlet />
      </div>
      <footer className="bg-gray-800 text-white py-6  ">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} FutureLabs.ng - Project Genesis.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
