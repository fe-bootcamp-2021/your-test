import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { registerPageRoute } from "../constants/routes";

export default function UserPage() {
  const history = useHistory();
  const { signOut } = useAuth();

  return (
    <>
      <Header>
        <button
          className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
          onClick={async () => {
            await signOut();
            await history.replace(registerPageRoute);
          }}
        >
          Log out
        </button>
      </Header>
      <UserProfile />
    </>
  );
}
