import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TestingForm from "./components/TestingForm";
import {
  homePage,
  loginPageRote,
  registerPageRote,
  userPageRote,
  errorPageRote,
  solveTestPageRote,
} from "./constants/routes";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={homePage}>
            <HomePage />
          </Route>
          <Route exact path={loginPageRote}>
            <LoginPage />
          </Route>
          <Route exact path={registerPageRote}>
            <RegisterPage />
          </Route>
          <Route exact path={userPageRote}>
            <UserPage />
          </Route>
          <Route exact path={solveTestPageRote}>
            <TestingForm />
          </Route>
          <Route exact path={errorPageRote}>
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
