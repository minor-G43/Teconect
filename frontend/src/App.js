import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Home from './components/Home';
import Login from './components/Login/Login2';
import Register from './components/Register/Register';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
        {/* <Route path='/' exact component={Home} /> */}
        <Route path='/' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
