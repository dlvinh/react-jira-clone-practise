import React, { useState } from 'react'
import { Route } from 'react-router-dom';
import JiraMenu from '../components/SiderBar/JiraMenu';
import MenuSideBar from '../components/SiderBar/MenuSideBar';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { OPEN_CREATE_TASK_FORM } from '../Redux/ReduxTypeList/typeList';
import  CreateTaskFrom, { CreateTaskWithFormik } from '../components/Form/CreateTaskFrom';
const { Header, Sider, Content } = Layout;
//import Header from '../components/Home/Header';

/**
 * Jira is a template that contain the generic UI for web
 */
export const JiraCloneTemplate = (propRoute) => {
    const dispatch = useDispatch();
    const { ComponentTemplate, ...otherProps } = propRoute;
    const [state, setState] = useState({
        collapsed: false,
    });
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    // Click on Create Task with open Drawer (modal) 
    const createTaskHandler = ()=>{
        dispatch({
            type: OPEN_CREATE_TASK_FORM,
            title: "Create Task",
            content:<CreateTaskFrom></CreateTaskFrom>
        })
    }
    return <>
        <Route {...otherProps} render={(propRoute) => {
            return <>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={state.collapsed}>
                        <div onClick={toggle}>
                            {state.collapsed ? <MenuUnfoldOutlined style={{ fontSize: "20px", color: "white" }} ></MenuUnfoldOutlined> : <MenuFoldOutlined style={{ fontSize: "20px", color: "white" }} ></MenuFoldOutlined>}
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<SearchOutlined style={{ fontSize: "25px" }} />} style={{ fontSize: "25px" }}>
                                Search
                            </Menu.Item>
                            <Menu.Item onClick={createTaskHandler} key="2" icon={<PlusOutlined style={{ fontSize: "25px" }} />} style={{ fontSize: "25px" }}>
                                Create Task
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <JiraMenu></JiraMenu>
                    <Layout className="site-layout">

                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <ComponentTemplate></ComponentTemplate>
                        </Content>

                    </Layout>
                </Layout>
            </>
        }} ></Route>
    </>
}
