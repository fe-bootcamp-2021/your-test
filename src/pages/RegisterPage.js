import RegistrationForm from "../components/RegisterForm";
import Header from "../components/Header";

export default function RegisterPage() {
  return (
    <>
      <Header>
        <a
          href="/loginPage"
          className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
        >
          Login
        </a>
      </Header>
      <RegistrationForm />
    </>
  );
}