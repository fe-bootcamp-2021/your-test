import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
  loginPageRote,
  registerPageRote,
  userPageRote,
} from "./constants/routes";

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
      <Router>
        <Switch>
          <Route path={loginPageRote}>
            <LoginPage />
          </Route>
          <Route exact path={registerPageRote}>
            <RegisterPage />
          </Route>
          <Route exact path={userPageRote}>
            <UserPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
