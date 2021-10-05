import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Private from "./components/screens/Private";
import Login from "./components/screens/Login/Login";
import Register from "./components/screens/Register/Register";
import ForgotPassword from "./components/screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword/ResetPassword";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={Private} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/password-reset/:resetToken"
            component={ResetPassword}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;