import './App.css';
import EmployeeDetail from './EmployeeDetail';
import EditEmployee from './EditEmployee';
import { BrowserRouter as Router, Route,Switch,withRouter} from "react-router-dom";
function App() {
  return (

     <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={EmployeeDetail} />
          <Route exact path="/EditEmployee/editID/:id" component={EditEmployee} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
