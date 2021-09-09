import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { registerPageRoute } from "../constants/routes";

export default function LoginPage() {
  return (
    <>
      {/* <Header>
        <a
          href={registerPageRoute}
          className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
          >
          Registration
        </a>
          </Header> */}
      <LoginForm />
    </>
  );
}
