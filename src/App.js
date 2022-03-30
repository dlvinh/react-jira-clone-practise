import logo from './logo.svg';
import { BrowserRouter, Route, Router, Switch,useHistory  } from 'react-router-dom'
import './App.css';
import Header from './components/Home/Header';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './templates/UserLoginTemplate';
import { HomeTemplate } from './templates/HomeTemplate';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {connect} from 'react-redux'
import { JiraCloneTemplate } from './templates/JiraCloneTemplate';
import NewProject from './pages/Project/NewProject';
import HomeJira from './pages/Home/HomeJira';
import TestFormik, { MyForm } from './pages/Project/TestFormik';
import MyEnhancedForm from './pages/Project/TestFormik';
import HandleFormWithFormik from './pages/Project/NewProject';

// http://casestudy.cyberlearn.vn/swagger/index.html
function App() {
  let history = useHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    let action ={
      type: "ADD_HISTORY",
      history: history
    }
    dispatch(action)
  }, [])
  
  return (
    <div>
      {/* <Header></Header> */}
        <Switch>
          <HomeTemplate path='/home' ComponentTemplate={Home}></HomeTemplate>
          {/* <Route exact path="/login"> 
            <Login></Login>
          </Route> */}
          <UserLoginTemplate exact path="/login" Component={Login}></UserLoginTemplate>
          <HomeTemplate exact path="/" ComponentTemplate={Home}></HomeTemplate>
          {/* Route to Home jira */}
          <JiraCloneTemplate exact path="/jiraclone" ComponentTemplate={HomeJira}></JiraCloneTemplate>
          {/* Route to create new Project */}
          <JiraCloneTemplate exact path="/createproject" ComponentTemplate={NewProject}></JiraCloneTemplate>
        </Switch>

        {/* <TestFormik></TestFormik> */}
        {/* <MyForm></MyForm> */}
    </div>
  );
}

export default App;
