import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  // useEffect(() => {
  //   axios.post(
  //     "https://get-forms-5e80d-default-rtdb.europe-west1.firebasedatabase.app/tests/.json",
  //     {
  //       name: "aaa",
  //       age: 99,
  //     }
  //   );

  //   axios
  //     .get(
  //       `https://get-forms-5e80d-default-rtdb.europe-west1.firebasedatabase.app/tests/-MhJNFOsJ_tUHl_4uUXZ.json`
  //     )
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/loginPage">
              <LoginPage />
            </Route>
            <Route exact path="/">
              <RegisterPage />
            </Route>
            <Route exact path="/user">
              <UserPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}
