import Header from "@/components/common/Header";
import UserRegistrationForm from "./userform";
// import BootcampRegistrationForm from "./bootcamp-registration-form"

function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
        <div className="text-center my-4 max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Genesis Form Collection
          </h2>
          <p className="text-lg text-gray-600">
            Your oppurtunity to become a software engineer starts here! Why not
            register for our bootcamp and get started on your journey?
          </p>
        </div>
        <div className="w-full">
          <UserRegistrationForm />
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 mt-16">
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
