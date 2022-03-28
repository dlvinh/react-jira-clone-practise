import React from 'react'
import { Route } from 'react-router-dom';
import ContentMain from '../components/Main/ContentMain';
import Header from '../components/Main/Header';
import InfoContent from '../components/Main/InfoContent';
import InfoModal from '../components/Main/InfoModal';
import SearchModal from '../components/Main/SearchModal';
import JiraMenu from '../components/SiderBar/JiraMenu';
import MenuSideBar from '../components/SiderBar/MenuSideBar';
//import Header from '../components/Home/Header';

/**
 * Jira is a template that contain the generic UI for web
 */
export const JiraCloneTemplate = (propRoute) => {
    const { ComponentTemplate, ...otherProps } = propRoute;
    return <>
        <Route {...otherProps} render={(propRoute) => {
            return <>
                <div className="jira">
                    {/* Sider Bar  */}
                    <MenuSideBar></MenuSideBar>
                    {/* Menu */}
                    <JiraMenu></JiraMenu>
                    {/* Main */}
                   <ComponentTemplate></ComponentTemplate>
                </div>
            </>
        }} ></Route>
    </>
}
