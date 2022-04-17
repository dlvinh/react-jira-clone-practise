import logo from './logo.svg';
import { BrowserRouter, Route, Router, Switch, useHistory } from 'react-router-dom'
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './templates/UserLoginTemplate';
import { HomeTemplate } from './templates/HomeTemplate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { JiraCloneTemplate } from './templates/JiraCloneTemplate';
import NewProject from './pages/Project/NewProject';
import HomeJira from './pages/Home/HomeJira';
import ProjectMangement from './pages/Project/ProjectMangement';
import Modal from './HOC/Modal';
import Loading from './utilities/Loading';
import ProjectMain from './pages/Project/ProjectMain';
import DemoDragDrop from './components/PractiseDragDrop/DemoDragDrop';
import DragDropLib from './components/DragDropWithLibrary/DragDropLib';


// http://casestudy.cyberlearn.vn/swagger/index.html
function App() {
  let history = useHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    let action = {
      type: "ADD_HISTORY",
      history: history
    }
    dispatch(action);

    let loadingAction = {
      type: "NO_LOADING",
    }
    dispatch(loadingAction)
  }, [])

  return (
    <div>
      <Loading></Loading>
      <Modal></Modal>

      {/* <Header></Header> */}
      <Switch>
        <HomeTemplate path='/home' ComponentTemplate={Home}></HomeTemplate>
        {/* <Route exact path="/login"> 
            <Login></Login>
          </Route> */}
        <UserLoginTemplate exact path="/login" Component={Login}></UserLoginTemplate>
        {/* //<HomeTemplate exact path="/" ComponentTemplate={Home}></HomeTemplate> */}
        {/* When first open the website, itll go straight to jira */}
        <JiraCloneTemplate exact path="/" ComponentTemplate={HomeJira}></JiraCloneTemplate>
        {/* Route to Home jira */}
        <JiraCloneTemplate exact path="/jiraclone" ComponentTemplate={HomeJira}></JiraCloneTemplate>
        {/* Route to create new Project */}
        <JiraCloneTemplate exact path="/createproject" ComponentTemplate={NewProject}></JiraCloneTemplate>
        {/* Route to Project management page */}
        <JiraCloneTemplate exact path="/projectmanagement" ComponentTemplate={ProjectMangement}></JiraCloneTemplate>
        {/* Route to particular project using parameter of it's id */}

        <JiraCloneTemplate exact path="/jiraclone/:projectId" ComponentTemplate={ProjectMain}></JiraCloneTemplate>
        <HomeTemplate path='/dragdrop' ComponentTemplate={DemoDragDrop}></HomeTemplate>
        <HomeTemplate path='/dragdroplib' ComponentTemplate={DragDropLib}></HomeTemplate>

      </Switch>

      {/* <TestFormik></TestFormik> */}
      {/* <MyForm></MyForm> */}
    </div>
  );
}

export default App;
