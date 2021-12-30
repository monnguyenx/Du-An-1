import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import ListDepartmentComponent from './components_1/ListDepartmentComponent';
import CreateDepartmentComponent from './components_1/CreateDepartmentComponent';
import UpdateDepartmentComponent from './components_1/UpdateDepartmentComponent';
import ListPositionComponent from './components_2/ListPositionComponent';
import CreatePositionComponent from './components_2/CreatePositionComponent';
import UpdatePositionComponent from './components_2/UpdatePositionComponent';
import ListLevelComponent from './components_3/ListLevelComponent';
import CreateLevelComponent from './components_3/CreateLevelComponent';
import UpdateLevelComponent from './components_3/UpdateLevelComponent';
import ListDegreeComponent from './components_4/ListDegreeComponent';
import CreateDegreeComponent from './components_4/CreateDegreeComponent';
import UpdateDegreeComponent from './components_4/UpdateDegreeComponent';



function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            {/* Employees */}
            <Route path='/' exact component={ListEmployeeComponent}></Route>
            <Route path='/employees' component={ListEmployeeComponent}></Route>
            <Route path='/add-employees' component={CreateEmployeeComponent}></Route>
            <Route path='/update-employees/:id' component={UpdateEmployeeComponent}></Route>
            <Route path='/view-employees/:id' component={ViewEmployeeComponent}></Route>
            {/* Departments */}
            <Route path='/departments' component={ListDepartmentComponent}></Route>
            <Route path='/add-departments' component={CreateDepartmentComponent}></Route>
            <Route path='/update-departments/:id' component={UpdateDepartmentComponent}></Route>
            {/* Positions */}
            <Route path='/positions' component={ListPositionComponent}></Route>
            <Route path='/add-positions' component={CreatePositionComponent}></Route>
            <Route path='/update-positions/:id' component={UpdatePositionComponent}></Route>
            {/* Levels */}
            <Route path='/levels' component={ListLevelComponent}></Route>
            <Route path='/add-levels' component={CreateLevelComponent}></Route>
            <Route path='/update-levels/:id' component={UpdateLevelComponent}></Route>
            {/* Degrees */}
            <Route path='/degrees' component={ListDegreeComponent}></Route>
            <Route path='/add-degrees' component={CreateDegreeComponent}></Route>
            <Route path='/update-degrees/:id' component={UpdateDegreeComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div >
  );
}

export default App;
