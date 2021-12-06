import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom"
import ReactNotifications from "react-notifications-component";
import Routes from "./Routes";
import {Header , Footer} from "./component/header-footer";
// import LandingPage from './view/LandingPage'
import LandingPage from "./view/LandingPage";
import Black from "./view/Black";
import Admin from "./view/Admin";
import Owner from "./view/Owner";

function App() {
  return (
    
        <Router>
          {/* <Header/> */}
          {/* <Routes/> */}
          <ReactNotifications />
          <Switch>
            <Route exact path = "/develop" component = {Black}/>
            <Route exact path = "/" component = {LandingPage}/>
            <Route exact path = "/admin/owner" component = {Admin}/>
            <Route exact path = "/owner" component = {Owner}/>
          </Switch>
          {/* <Footer/> */}
        </Router>
         
    
  );
}

export default App;
