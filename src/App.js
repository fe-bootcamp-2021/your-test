/* eslint-disable react-hooks/exhaustive-deps */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TestingForm from "./components/TestingForm";
import Loader from "./components/Loader";
import {
  homePageRoute,
  loginPageRoute,
  registerPageRoute,
  userPageRoute,
  errorPageRoute,
  solveTestPageRoute,
} from "./constants/routes";
import { useAuth } from "./contexts/AuthContext";

function AppWrapper() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === homePageRoute ||
      location.pathname === loginPageRoute ||
      location.pathname === registerPageRoute
    ) {
      history.push(userPageRoute);
    }
  }, []);

  if (currentUser === undefined) {
    return <Loader />;
  }

  return (
    <>
      {currentUser ? (
        <Switch>
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
      ) : (
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
      )}
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <AppWrapper />
      </Router>
    </Suspense>
  );
}
