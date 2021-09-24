import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Navbar />
      {/* <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/skills' component={Skills} />

      </Switch> */}
    </Router>
    </div>
  );
}

export default App;
