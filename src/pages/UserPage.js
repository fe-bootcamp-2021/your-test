import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { loginPageRoute, resultsPageRoute } from "../constants/routes";

export default function UserPage() {
  const history = useHistory();
  const { signOut, currentUser } = useAuth();
  return (
    <>
      <Header>
        <div className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300">
          {currentUser && currentUser.email}
        </div>
        <button
          className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
          onClick={async () => {
            await history.replace(resultsPageRoute);
          }}
        >
          Results
        </button>
        <button
          className="p-2 lg:px-4 md:mx-2 text-gray-600 font-bold text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300"
          onClick={async () => {
            await signOut();
            await history.replace(loginPageRoute);
          }}
        >
          Log out
        </button>
      </Header>
      <UserProfile />
    </>
  );
}
