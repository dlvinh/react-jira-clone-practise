import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/Home/Header';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './templates/UserLoginTemplate';
import { HomeTemplate } from './templates/HomeTemplate';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <Header></Header> */}
        <Switch>
          <HomeTemplate path='/home' ComponentTemplate={Home}></HomeTemplate>
          {/* <Route exact path="/login"> 
            <Login></Login>
          </Route> */}
          <UserLoginTemplate exact path="/login" Component={Login}></UserLoginTemplate>
          <HomeTemplate exact path="/" ComponentTemplate={Home}></HomeTemplate>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
