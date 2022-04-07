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
const { Header, Sider, Content } = Layout;
//import Header from '../components/Home/Header';

/**
 * Jira is a template that contain the generic UI for web
 */
export const JiraCloneTemplate = (propRoute) => {
    const { ComponentTemplate, ...otherProps } = propRoute;
    const [state, setState] = useState({
        collapsed: false,
    });
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
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
                            <Menu.Item key="2" icon={<PlusOutlined style={{ fontSize: "25px" }} />} style={{ fontSize: "25px" }}>
                                Create
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
