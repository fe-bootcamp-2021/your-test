import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TestingForm from "./components/TestingForm";
import {
  homePageRoute,
  loginPageRoute,
  registerPageRoute,
  userPageRoute,
  errorPageRoute,
  solveTestPageRoute,
} from "./constants/routes";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={homePageRoute}>
            <HomePage />
          </Route>
          <Route exact path={loginPageRoute}>
            <LoginPage />
          </Route>
          <Route exact path={registerPageRoute}>
            <RegisterPage />
          </Route>
          <Route exact path={userPageRoute}>
            <UserPage />
          </Route>
          <Route exact path={solveTestPageRoute}>
            <TestingForm />
          </Route>
          <Route exact path={errorPageRoute}>
            <ErrorPage />
          </Route>
          <Route exact>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
